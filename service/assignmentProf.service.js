const AssignmentProf = require("../model/assignmentProf.model");

const getAllProfAssignment = async (id) => {
    if (id) {
        return await AssignmentProf.findById(id);
    } else {
        return await AssignmentProf.find();
    }
}

module.exports = {
    getAllProfAssignment
}