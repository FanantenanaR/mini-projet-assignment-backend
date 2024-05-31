const express = require('express');
const router = express.Router();

const {
    getAllProfAssignmentEndPoint,
    insertAssignmentProfEndPoint,
    evaluateAssignmentStudentEndPoint,
    getAssignmentProfPaginate
} = require('../controller/assignmentProf.controller');

router.get('/paginate/', getAssignmentProfPaginate);

router.get('/:id?', getAllProfAssignmentEndPoint);

router.post('/', insertAssignmentProfEndPoint);

router.post('/evaluate', evaluateAssignmentStudentEndPoint);

module.exports = router;