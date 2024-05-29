const AssignmentStudent = require("../model/assignmentStudent.model");
const AssignmentProf = require("../model/assignmentProf.model");

const getAllStudentAssignment = async (id) => {
    if (id) {
        return await AssignmentStudent.findById(id);
    } else {
        return await AssignmentStudent.find();
    }
}

const insertStudentAssignment = async (details, assignment, student ) => {
    return await AssignmentStudent.create({
        remarkFromStudent: details.remarkFromStudent,
        dateSubmit: details.dateSubmit,
        assignment: assignment,
        student: student
    });
}

const evaluateStudentAssignment = async (assignemntStudentId, note, remark, dateEvaluation = Date.now()) => {
    return await AssignmentStudent.findByIdAndUpdate(assignemntStudentId, {
        note: note,
        remark: remark,
        dateEvaluation: dateEvaluation
    });
}

const getAssignmentStudentBySybject = async (subjectId) => {
    return await AssignmentStudent.find({ "assignment.subject._id": subjectId });
}

module.exports = {
    getAllStudentAssignment,
    insertStudentAssignment,
    evaluateStudentAssignment,
    getAssignmentStudentBySybject
}