const AssignmentProf = require("../model/assignmentProf.model");

const getAllProfAssignment = async (id) => {
    if (id) {
        return await AssignmentProf.findById(id);
    } else {
        return await AssignmentProf.find();
    }
}

const insertProfAssignment = async (assignment, prof, subject, dateCreated = Date.now()) => {
    return await AssignmentProf.create({
        title: assignment.title,
        description: assignment.description,
        deadline: assignment.deadline,
        subject: subject,
        prof: prof,
        dateCreated: dateCreated,
    });
}

module.exports = {
    getAllProfAssignment,
    insertProfAssignment,
}