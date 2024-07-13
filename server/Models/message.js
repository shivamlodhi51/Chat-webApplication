
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: String,
  content: String,
  timestamp: Date,
  isRead: Boolean,
  chatId: String, // Add chat ID to distinguish different chat sessions
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
