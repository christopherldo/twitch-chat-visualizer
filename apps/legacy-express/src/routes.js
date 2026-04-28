const express = require('express');
const router = express.Router();

const {
  ChatController
} = require('./app/controllers');

router.get('/', ChatController.index);
router.post('/', ChatController.setUsername);

router.get('/:channel', ChatController.visualizeChat);

router.get('/:channel/transparent', ChatController.visualizeTransparentChat);

module.exports = router;