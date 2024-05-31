const { getStudents, getStudentById, insertStudent, updateStudent, deleteStudent } = require("../service/student.service");

const getAllStudentsEndPoint = async (request, response) => {
    try {
        const preLimit = request.query.limit;
        const limit = preLimit && !isNaN(preLimit) && parseInt(preLimit) > 0 ? parseInt(preLimit) : 10;

        const prePage = request.query.page;
        const page = prePage && !isNaN(prePage) && parseInt(prePage) > 0 ? parseInt(prePage) : 1;

        // Vérifier si la variable 'doPagination' est donnée dans la requête et si elle est définie comme 'false'
        let doPagination = true
        const preDoPagination = request.query.doPagination
        if (preDoPagination && preDoPagination.toLowerCase() === 'false') {
            doPagination = false;
        }

        // ajout d'un tri  si c'est donnée dans le parameter GET
        let orderBy = {}
        const preOrderBy = request.query.orderBy;
        if (preOrderBy && preOrderBy.split(".").length === 2) {
            const orderMe = preOrderBy.split(".");
            orderBy[orderMe[0]] = orderMe[1];
        } else {
            orderBy = {
                firstname: "asc"
            }
        }

        const { name } = request.query;
        console.log("name value", name, typeof name);
        const searchInput =
            !name || name.trim() === "null" || name.trim() === ""
                ? null
                : name.toLowerCase();
        const subjects = await getStudents(searchInput, orderBy, doPagination, page, limit);
        response.status(200).json(subjects);
    } catch (err) {
        response.status(500).json({ message: err.message });
    }
}

const getStudentByIdEndPoint = async (request, response) => {
    try {
        const id = request.params.id;

        if (!id) {
            response.status(400).json({ message: 'Missing parameter id' });
        } else {
            const student = await getStudentById(id);
            if (!student) {
                response.status(404).json({ message: 'student not found' });
            } else {
                response.status(200).json({
                    status: 200,
                    message: "A student",
                    data: student
                });
            }
        }
    } catch (err) {
        response.status(500).json({ message: err.message });
    }
}

const insertStudentEndPoint = async (request, response) => {
    try {
        const { firstname, lastname, email, password, profilPicture = ""} = request.body;
        if (!firstname || !lastname || !email || !password) {
            let missing = (!firstname ? "firstname" : "");
            missing += (missing !== "" && !lastname ? missing + ", " : "") + (!lastname ? "lastname" : "");
            missing += (missing !== "" && !email ? missing + ", " : "") + (!email ? "email" : "");
            missing += (missing !== "" && !password ? missing + ", " : "") + (!password ? "password" : "");
            response.status(400).json({ message: `Missing parameter: ${missing}`});
        } else {
            const newSubject = await insertStudent(firstname, lastname, email, password, profilPicture ?? "");
            response.status(201).json({
                status: 201,
                message: "student inserted",
                data: newSubject
            });
        }
    } catch (err) {
        response.status(500).json({ message: err.message });
    }
}

const updateStudentEndPoint = async (request, response) => {
    try {
        const { firstname, lastname, profilPicture } = request.body;
        const id = request.params.id;
        if (!id) {
            response.status(400).json({ message: `Missing parameter: id`});
        } else {
            const update = {
                ...(firstname && { firstname }),
                ...(lastname && { lastname }),
                ...(profilPicture && { profilPicture })
            };
            const newStudent = await updateStudent(id, update);
            response.status(201).json({
                status: 201,
                message: "Student updated",
                data: newStudent
            });
        }
    } catch (err) {
        response.status(500).json({ message: err.message });
    }
}

const deleteStudentEndPoint = async (request, response) => {
    try {
        const { id} = request.body;
        if (!id) {
            response.status(400).json({ message: `Missing parameter: id`});
        } else {
            const isDeleted = await deleteStudent(id);
            if (isDeleted) {
                response.status(201).json({
                    status: 201,
                    message: 'Student deleted'
                });
            } else {
                response.status(422).json({
                    status: 422,
                    message: 'The deletion failed'
                });
            }

        }
    } catch (err) {
        response.status(500).json({ message: err.message });
    }
}

module.exports = {
    getAllStudentsEndPoint,
    getStudentByIdEndPoint,
    insertStudentEndPoint,
    updateStudentEndPoint,
    deleteStudentEndPoint
}
