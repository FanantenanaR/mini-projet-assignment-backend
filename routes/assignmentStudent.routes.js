const express = require('express');
const router = express.Router();

const { getAllStudentAssignmentEndPoint, insertAssignmentStudentEndPoint} = require('../controller/assignmentStudent.controller');

router.get('/:id?', getAllStudentAssignmentEndPoint);

router.post('/', insertAssignmentStudentEndPoint);

module.exports = router