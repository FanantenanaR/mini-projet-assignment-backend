const express = require('express');
const router = express.Router();

const { 
    getAllStudentAssignmentEndPoint, 
    insertAssignmentStudentEndPoint, 
    getAssignmentStudentBySybjectEndPoint, 
    getAssignmentStudentPaginate,
    getAssignmentNotedEndPoint
} = require('../controller/assignmentStudent.controller');

router.get('/paginate/', getAssignmentStudentPaginate);

router.get('/:id?', getAllStudentAssignmentEndPoint);

router.post('/', insertAssignmentStudentEndPoint);

router.get('/subject/:subjectId?', getAssignmentStudentBySybjectEndPoint);

router.get('/noted/:isNoted?/:subjectId?', getAssignmentNotedEndPoint);

module.exports = router