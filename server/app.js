const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mqtt = require('mqtt');
const cors = require('cors');
const ConnectDB = require('./Db/Db');
const dotenv = require('dotenv').config();
const userRouter = require('./Router/userRouter');
const chatRouter = require('./Router/chatRouter');
const Message = require('./Models/message'); // Import the Message model

const app = express();
ConnectDB();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Connect to the MQTT broker
const mqttClient = mqtt.connect('mqtt://broker.hivemq.com');

mqttClient.on('connect', () => {
  console.log('Connected to MQTT broker');
});

mqttClient.on('connect', () => {
  console.log('Connected to MQTT broker');
  mqttClient.subscribe('chat/+/messages', (err) => {
    if (err) {
      console.error('Subscription error:', err);
    }
  });
});

mqttClient.on('message', async (topic, message) => {
  const userId = topic.split('/')[1];
  const msg = JSON.parse(message.toString());

  // Save the message to the database
  const newMessage = new Message({
    sender: msg.sender,
    content: msg.content,
    timestamp: msg.timestamp,
    isRead: msg.isRead,
    chatId: userId
  });

  await newMessage.save();

  io.to(`chat:${userId}`).emit('chat message', msg);
});

io.on('connection', (socket) => {
  console.log('A user connected');
  const userId = socket.handshake.query.userId;
  socket.join(`chat:${userId}`);

  // Send existing messages to the user
  Message.find({ chatId: userId }).sort('timestamp').then(messages => {
    socket.emit('load messages', messages);
  });

  socket.on('chat message', async (msg) => {
    const targetUserId = msg.targetUserId;
    const message = JSON.stringify(msg);

    // Save the message to the database
    const newMessage = new Message({
      sender: msg.sender,
      content: msg.content,
      timestamp: msg.timestamp,
      isRead: msg.isRead,
      chatId: targetUserId
    });

    await newMessage.save();

    mqttClient.publish(`chat/${targetUserId}/messages`, message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

app.use(express.static('public'));

app.use("/user", userRouter);
// app.use('/chat', chatRouter);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
