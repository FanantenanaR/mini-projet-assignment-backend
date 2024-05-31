const {getAllSubject, getSubjectById, insertSubject, updateSubject, deleteSubject} = require("../service/subject.service");

const getAllSubjectsEndPoint = async (request, response) => {
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
                title: "asc"
            }
        }

        const { title, prof } = request.query;
        console.log("prof value", prof, typeof prof);
        console.log("title value", title);
        const searchInput =
            !title || title.trim() === "null" || title.trim() === ""
                ? null
                : title.toLowerCase();
        const searchProf = !prof || prof.trim() === "null" || prof.trim() === "" ? null : prof;
        const subjects = await getAllSubject(searchInput, searchProf, orderBy, doPagination, page, limit);
        response.status(200).json(subjects);
    } catch (err) {
        response.status(500).json({ message: err.message });
    }
}

const getSubjectByIdEndPoint = async (request, response) => {
    try {
        const id = request.params.id;

        if (!id) {
            response.status(400).json({ message: 'Missing parameter id' });
        } else {
            const subject = await getSubjectById(id);
            if (!subject) {
                response.status(404).json({ message: 'Subject not found' });
            } else {
                response.status(200).json({
                    status: 200,
                    message: "A Subject",
                    data: subject
                });
            }
        }
    } catch (err) {
        response.status(500).json({ message: err.message });
    }
}

const insertSubjectEndPoint = async (request, response) => {
    try {
        const { title, prof, illustration = ""} = request.body;
        if (!title || !prof) {
            const missing = (!title ? "title" : "") + (!title && !prof ? ", " : "") + (!prof ? "prof" : "");
            response.status(400).json({ message: `Missing parameter: ${missing}`});
        } else {
            const newSubject = await insertSubject(title, prof, illustration);
            response.status(201).json({
                status: 201,
                message: "Subject inserted",
                data: newSubject
            });
        }
    } catch (err) {
        response.status(500).json({ message: err.message });
    }
}

const updateSubjectEndPoint = async (request, response) => {
    try {
        const { title, prof, illustration} = request.body;
        const id = request.params.id;
        if (!id) {
            response.status(400).json({ message: `Missing parameter: id`});
        } else {
            const update = {
                id,
                ...(title && { title }),
                ...(prof && { prof }),
                ...(illustration && { illustration })
            };
            const newSubject = await updateSubject(update);
            response.status(201).json({
                status: 201,
                message: "Subject inserted",
                data: newSubject
            });
        }
    } catch (err) {
        response.status(500).json({ message: err.message });
    }
}

const deleteSubjectEndPoint = async (request, response) => {
    try {
        const { id} = request.body;
        if (!id) {
            response.status(400).json({ message: `Missing parameter: id`});
        } else {
            const newSubject = await deleteSubject(id);
            if (newSubject) {
                response.status(201).json({
                    status: 201,
                    message: 'Subject deleted'
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
    getAllSubjectsEndPoint,
    getSubjectByIdEndPoint,
    insertSubjectEndPoint,
    updateSubjectEndPoint,
    deleteSubjectEndPoint,
}