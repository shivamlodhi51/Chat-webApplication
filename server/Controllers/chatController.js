const Chat = require('../Models/chatModel');

// Send a message
exports.sendMessage = async (req, res) => {
  const { sender, receiver, message } = req.body;
  try {
    const newMessage = new Chat({ sender, receiver, message });
    await newMessage.save();
    res.status(200).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while sending the message' });
  }
};

// Get messages between two users
exports.getMessages = async (req, res) => {
  const { userId1, userId2 } = req.params;
  try {
    const messages = await Chat.find({
      $or: [
        { sender: userId1, receiver: userId2 },
        { sender: userId2, receiver: userId1 },
      ],
    }).sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching messages' });
  }
};
