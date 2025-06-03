const userController = require('../controller/user-controller')
const express = require('express');
const router = express.Router();

router.get('/', userController.getAll);
router.post('/', userController.create);

module.exports = router;