const express = require('express');
const router = express.Router();

const {
    getAllProfAssignmentEndPoint,
    insertAssignmentProfEndPoint,
    evaluateAssignmentStudentEndPoint
} = require('../controller/assignmentProf.controller');

router.get('/:id?', getAllProfAssignmentEndPoint);

router.post('/', insertAssignmentProfEndPoint);

router.post('/evaluate', evaluateAssignmentStudentEndPoint);

module.exports = router;