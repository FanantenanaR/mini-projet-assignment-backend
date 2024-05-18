const express = require('express');
const router = express.Router();

const assignmentRouter = require('./assignment.routes');
const authenticationRouter = require('./authentication.routes');


router.use('/api/assignment', assignmentRouter);
router.use('/api/auth', authenticationRouter);

module.exports = router;


