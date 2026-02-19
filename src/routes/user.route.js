const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// User home page - product listing
router.get('/', userController.index);

// Product detail page
router.get('/product/:id', userController.show);

module.exports = router;
