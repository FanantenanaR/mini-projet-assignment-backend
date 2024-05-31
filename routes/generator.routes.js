const express = require('express');
const router = express.Router();

const {generateDataEndPoint} = require("../controller/generator.controller");


router.get('/', generateDataEndPoint);

module.exports = router;