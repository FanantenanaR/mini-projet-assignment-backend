const express = require('express');
const router = express.Router();

const { getAssignments, postAssignment, updateAssignment, getAssignment, deleteAssignment } = require('../controller/assignment.controller');


router.get('/', getAssignments);
router.post('/', postAssignment);
router.put('/', updateAssignment);

router.get('/:id', getAssignment);
router.delete('/:id', deleteAssignment);

module.exports = router;