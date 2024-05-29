const AssignmentStudent = require("../model/assignmentStudent.model");

const getAllStudentAssignment = async (id) => {
    if (id) {
        return await AssignmentStudent.findById(id);
    } else {
        return await AssignmentStudent.find();
    }
}

module.exports = {
    getAllStudentAssignment
}