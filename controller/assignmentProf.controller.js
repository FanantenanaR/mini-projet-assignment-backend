const {getAllProfAssignment} = require("../service/assignmentProf.service");

const getAllProfAssignmentEndPoint = async (request, response) => {
    const subject = await getAllProfAssignment();
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
    getAllProfAssignmentEndPoint
}