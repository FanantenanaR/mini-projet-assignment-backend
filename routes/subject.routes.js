const express = require('express');
const router = express.Router();

const {getAllSubjectsEndPoint, insertSubjectEndPoint, updateSubjectEndPoint, getSubjectByIdEndPoint,
    deleteSubjectEndPoint
} = require("../controller/subject.controller");


router.get('/', getAllSubjectsEndPoint);
router.post('/', insertSubjectEndPoint);
router.put('/:id', updateSubjectEndPoint);

router.get('/:id', getSubjectByIdEndPoint);
router.delete('/:id', deleteSubjectEndPoint);

module.exports = router;