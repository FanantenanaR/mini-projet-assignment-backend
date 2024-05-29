const express = require('express');
const router = express.Router();

const { getAllProfAssignmentEndPoint, insertAssignmentProfEndPoint} = require('../controller/assignmentProf.controller');

router.get('/:id?', getAllProfAssignmentEndPoint);

router.post('/', insertAssignmentProfEndPoint);

module.exports = router;