const AssignmentStudent = require("../model/assignmentStudent.model");

const getAllStudentAssignment = async () => {
    return await AssignmentStudent.find();
}

module.exports = {
    getAllStudentAssignment
}