const express = require('express');
const router = express.Router();

const assignmentRouter = require('./assignment.routes');
const authenticationRouter = require('./authentication.routes');
const profRouter = require('./prof.routes');
const subjectRouter = require('./subject.routes');
const assignmentProfRouter = require('./assignmentProf.routes');
const assignmentStudentRouter = require('./assignmentStudent.routes');
const studentRouter = require('./student.routes');
const generatorRouter = require('./generator.routes');

router.use('/api/assignment', assignmentRouter);
router.use('/api/auth', authenticationRouter);
router.use('/api/prof', profRouter);
router.use('/api/subject', subjectRouter);
router.use('/api/assignmentProf', assignmentProfRouter);
router.use('/api/assignmentStudent', assignmentStudentRouter);
router.use('/api/student', studentRouter);
router.use('/api/generator', generatorRouter);

module.exports = router;


