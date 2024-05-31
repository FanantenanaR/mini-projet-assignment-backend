const {generateProf, generateStudent, generateSubject, generateAssignmentProf, generateAssignmentStudent} = require("../service/generateData.service");
const generateDataEndPoint = async (request, response) => {
    try {
        const nombreProf = await generateProf();
        const nombreStudent = await generateStudent();
        const nombreSubject = await generateSubject();
        const nombreAssigmentProf = await generateAssignmentProf();
        // const nombreAssignmentStudent = await generateAssignmentStudent();
        const nombreAssignmentStudent = 0;
        // const nombreAssigmentProf = 1000;
        response.status(201).send({
            status: 201,
            message: "generated",
            data: {
                numberProf: nombreProf,
                numberStudent: nombreStudent,
                numberSubject: nombreSubject,
                numberAssignmentProf: nombreAssigmentProf,
                numberAssignmentStudent: nombreAssignmentStudent
            }
        })
    } catch (e) {
        response.status(500).json({ message: e.message });
    }
}

module.exports = {
    generateDataEndPoint
}