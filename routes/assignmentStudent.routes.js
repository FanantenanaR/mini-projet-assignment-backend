const express = require('express');
const router = express.Router();

const { getAllStudentAssignmentEndPoint, insertAssignmentStudentEndPoint, getAssignmentStudentBySybjectEndPoint} = require('../controller/assignmentStudent.controller');

router.get('/:id?', getAllStudentAssignmentEndPoint);

router.post('/', insertAssignmentStudentEndPoint);

router.get('/subject/:subjectId?', getAssignmentStudentBySybjectEndPoint);

module.exports = router