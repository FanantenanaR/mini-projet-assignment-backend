const {getAllProfAssignment} = require("../service/assignmentProf.service");

const getAllProfAssignmentEndPoint = async (request, response) => {
    const subject = await getProfById(id);
            if (!subject) {
                response.status(404).json({ message: 'Prof not found' });
            } else {
                response.status(200).json({
                    status: 200,
                    message: "A Prof",
                    data: subject
                });
            }
}

module.exports = {
    getAllProfAssignmentEndPoint
}