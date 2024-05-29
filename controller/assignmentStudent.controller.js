const { getAllStudentAssignment, insertStudentAssignment, getAssignmentStudentBySybject} = require('../service/assignmentStudent.service');
const {getStudentById} = require("../service/student.service");
const {getAllProfAssignment} = require("../service/assignmentProf.service");

const getAllStudentAssignmentEndPoint = async (request, response) => {
    const {id} = request.params;
    try {
        const assignments = await getAllStudentAssignment(id);
        if (!assignments) {
            response.status(404).json({ message: 'Assignments not found' });
        } else {
            response.status(200).json({
                status: 200,
                message: "Success",
                datas: assignments
            });
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Internal server error' });
    }
};

const insertAssignmentStudentEndPoint = async (request, response) => {
    const { assignmentId, studentId, remarkFromStudent } = request.body;
    const student = await getStudentById(studentId);
    if (!student) {
        response.status(404).json({ message: 'Student not found' });
    }
    const assignment = await getAllProfAssignment(assignmentId);
    if (!assignment) {
        response.status(404).json({ message: 'Assignment not found' });
    }

    const result = await insertStudentAssignment(
        {
            remarkFromStudent: remarkFromStudent,
            dateSubmit: Date.now()
        },
        assignment,
        {
            _id: student._id,
            name: `${student.firstname} ${student.lastname ?? ""}`,
            email: student.email,
            profilePicture: student.profilPicture,
        }
    );

    response.status(200).json({
        status: 200,
        message: "Success",
        data: result
    })
}

const getAssignmentStudentBySybjectEndPoint = async (request, response) => {
    const {subjectId} = request.params;
    try {
        const assignments = await getAssignmentStudentBySybject(subjectId);
        if (!assignments) {
            response.status(404).json({ message: 'Assignments not found' });
        } else {
            response.status(200).json({
                status: 200,
                message: "Success",
                datas: assignments
            });
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getAllStudentAssignmentEndPoint,
    insertAssignmentStudentEndPoint,
    getAssignmentStudentBySybjectEndPoint
};