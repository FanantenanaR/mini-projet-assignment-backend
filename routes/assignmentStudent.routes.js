const express = require('express');
const router = express.Router();

const { 
    getAllStudentAssignmentEndPoint, 
    insertAssignmentStudentEndPoint, 
    getAssignmentStudentBySybjectEndPoint, 
    getAssignmentStudentPaginate
} = require('../controller/assignmentStudent.controller');

router.get('/paginate/', getAssignmentStudentPaginate);

router.get('/:id?', getAllStudentAssignmentEndPoint);

router.post('/', insertAssignmentStudentEndPoint);

router.get('/subject/:subjectId?', getAssignmentStudentBySybjectEndPoint);

module.exports = router