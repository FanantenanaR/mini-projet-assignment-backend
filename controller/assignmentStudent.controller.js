const { getAllStudentAssignment, insertStudentAssignment, getAssignmentStudentBySybject, getAssignmentNoted} = require('../service/assignmentStudent.service');
const {getStudentById} = require("../service/student.service");
const {getAllProfAssignment} = require("../service/assignmentProf.service");
const AssignmentStudent = require('../model/assignmentStudent.model');

const getAllStudentAssignmentEndPoint = async (request, response) => {
    const {id} = request.params;
    try {
        const assignments = await getAllStudentAssignment(id);
        if (!assignments) {
            response.status(404).json({ message: 'Assignments not found' });
        } else {
            const result = {
                status: 200,
                message: "Success"
            }

            if(id) {
                result.data = assignments
            } else {
                result.datas = assignments
            }
            response.status(200).json(result);
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Internal server error' });
    }
};

const insertAssignmentStudentEndPoint = async (request, response) => {
    const { assignmentId, studentId, remarkFromStudent, linkAssignment } = request.body;
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
        },
        linkAssignment
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

const getAssignmentNotedEndPoint = async (request, response) => {
    const {isNoted} = request.params;
    const {subjectId} = request.params;
    try {
        const assignments = await getAssignmentNoted(isNoted, subjectId);
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
}

const getAssignmentStudentPaginate = (req, res) => {
    let aggregateQuery = AssignmentStudent.aggregate();
    AssignmentStudent.aggregatePaginate(
        aggregateQuery,
        {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10
        },
        (err, data) => {
            if(err) {
                res.send(err)
            }

            res.send({datas: data});
        }
    )
}



module.exports = {
    getAllStudentAssignmentEndPoint,
    insertAssignmentStudentEndPoint,
    getAssignmentStudentBySybjectEndPoint,
    getAssignmentStudentPaginate,
    getAssignmentNotedEndPoint
};
