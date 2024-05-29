const { getAllStudentAssignment } = require('../service/assignmentStudent.service');

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
                data: assignments
            });
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getAllStudentAssignmentEndPoint
};
