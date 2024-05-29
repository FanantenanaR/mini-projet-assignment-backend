const {getAllStudentAssignment} = require("../service/assignmentStudent.service");

const getAllStudentAssignmentEndPoint = async (request, response) => {
    const subject = await getAllStudentAssignment();
            if (!subject) {
                response.status(404).json({ message: 'Prof assignments not found' });
            } else {
                response.status(200).json({
                    status: 200,
                    message: "Success",
                    data: subject
                });
            } 
}

module.exports = {
    getAllStudentAssignmentEndPoint
}