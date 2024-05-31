const express = require('express');
const router = express.Router();

const { loginStudentEndPoint, loginProfEndPoint} = require("../controller/authentication.controller");


router.post('/login/prof', loginProfEndPoint);

router.post('/login/student', loginStudentEndPoint);

module.exports = router;