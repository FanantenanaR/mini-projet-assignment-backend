const express = require('express');
const router = express.Router();

const { getAllStudentAssignmentEndPoint } = require('../controller/assignmentStudent.controller');

router.get('/:id?', getAllStudentAssignmentEndPoint);

module.exports = router