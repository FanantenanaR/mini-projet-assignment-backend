const express = require('express');
const router = express.Router();

const { getAllProfAssignmentEndPoint } = require('../controller/assignmentProf.controller');

router.get('/:id?', getAllProfAssignmentEndPoint);

module.exports = router