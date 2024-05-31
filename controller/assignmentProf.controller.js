const {getAllProfAssignment, insertProfAssignment} = require("../service/assignmentProf.service");
const {getProfById} = require("../service/prof.service");
const {getSubjectById} = require("../service/subject.service");
const {evaluateStudentAssignment} = require("../service/assignmentStudent.service");
const AssignmentProf = require("../model/assignmentProf.model");

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

const evaluateAssignmentStudentEndPoint = async (request, response) => {
    const { assignementStudentId, note, remark = "" } = request.body;
    console.log(request.body);

    if (!assignementStudentId) {
        response.status(400).json({ message: `Assignment should be given`});
    }

    if (!note) {
        response.status(400).json({ message: `Note should be given`});
    }

    const resultat = await evaluateStudentAssignment(assignementStudentId, parseFloat(note), remark, Date.now());

    response.status(201).json({
        status: 201,
        message: "Success",
        data: resultat
    })
}

const getAssignmentProfPaginate = (req, res) => {
    let aggregateQuery = AssignmentProf.aggregate();
    AssignmentProf.aggregatePaginate(
        aggregateQuery,
        {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10
        },
        (err, data) => {
            if(err) {
                res.send(err)
            }
            res.send(data);
        }
    )
}

module.exports = {
    getAllProfAssignmentEndPoint,
    insertAssignmentProfEndPoint,
    evaluateAssignmentStudentEndPoint,
    getAssignmentProfPaginate
}