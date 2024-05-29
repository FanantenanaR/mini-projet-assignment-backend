const {getAllProfAssignment, insertProfAssignment} = require("../service/assignmentProf.service");
const {getProfById} = require("../service/prof.service");
const {getSubjectById} = require("../service/subject.service");

const getAllProfAssignmentEndPoint = async (request, response) => {
    const {id} = request.params;
    try {
        const assignments = await getAllProfAssignment(id);
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

const insertAssignmentProfEndPoint = async (request, response) => {
    const { title, description, deadline, subjectId, profId} = request.body;
    const subject = await getSubjectById(subjectId);
    if (!subject) {
        response.status(404).json({ message: `Subject not found`});
    }
    const prof = await getProfById(profId);
    if (!prof) {
        response.status(404).json({ message: `Prof not found`});
    }

    const result = await insertProfAssignment(
        {
            title: title,
            description: description,
            deadline: deadline ?? null
        }, {
            _id: profId,
            name: `${prof.firstname} ${prof.lastname}`,
            profilePicture: prof.profilPicture
        },{
            _id: subjectId,
            title: subject.title,
            illustration: subject.illustration,
        }, Date.now()
    );
    response.status(201).json({
        status: 201,
        message: "Success",
        data: result
    });
}

module.exports = {
    getAllProfAssignmentEndPoint,
    insertAssignmentProfEndPoint
}