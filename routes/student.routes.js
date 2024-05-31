const express = require('express');
const router = express.Router();

const {
    getAllStudentsEndPoint,
    insertStudentEndPoint,
    updateStudentEndPoint,
    getStudentByIdEndPoint,
    deleteStudentEndPoint
} = require("../controller/student.controller");


router.get('/', getAllStudentsEndPoint);
router.post('/', insertStudentEndPoint);
router.put('/:id', updateStudentEndPoint);

router.get('/:id', getStudentByIdEndPoint);
router.delete('/:id', deleteStudentEndPoint);

module.exports = router;