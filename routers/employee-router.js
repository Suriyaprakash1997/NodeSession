const employeeController = require('../controller/employee-controller')
const express = require('express');
const router = express.Router();

router.get('/', employeeController.getAll);
router.post('/', employeeController.create);


module.exports = router;