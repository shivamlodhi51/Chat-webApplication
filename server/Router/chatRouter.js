const express = require('express');
const router = express.Router();
const chatController = require('../Controllers/chatController');

// Send a message
router.post('/send', chatController.sendMessage);

// Get messages between two users
router.get('/:userId1/:userId2', chatController.getMessages);

module.exports = router;
