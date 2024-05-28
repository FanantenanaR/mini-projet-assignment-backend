const AssignmentProf = require("../model/assignmentProf.model");

const getAllProfAssignment = async () => {
    return await AssignmentProf.find();
}

module.exports = {
    getAllProfAssignment
}