const express = require('express');
const router = express.Router();

const { getAllStudentAssignmentEndPoint } = require('../controller/assignmentStudent.controller');

router.get('/', getAllStudentAssignmentEndPoint);

module.exports = router