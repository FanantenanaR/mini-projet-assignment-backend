const express = require('express');
const router = express.Router();

const assignmentRouter = require('./assignment.routes');
const authenticationRouter = require('./authentication.routes');
const profRouter = require('./prof.routes');
const subjectRouter = require('./subject.routes');


router.use('/api/assignment', assignmentRouter);
router.use('/api/auth', authenticationRouter);
router.use('/api/prof', profRouter);
router.use('/api/subject', subjectRouter);

module.exports = router;


