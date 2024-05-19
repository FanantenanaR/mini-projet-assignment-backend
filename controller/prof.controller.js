const {getAllSubject, getSubjectById, insertSubject, updateSubject, deleteSubject} = require("../service/subject.service");
const {getAllProf, getProfById, insertProf, deleteProf} = require("../service/prof.service");
const {isRegExp} = require("../utils/string.util");

const getAllProfEndPoint = async (request, response) => {
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

        // Vérifier si la variable 'searchInput' est donnée dans la requête
        let filter = request.query.searchInput
        if (filter) {
            if (isRegExp(filter)){
                filter = new RegExp(filter)
            } else {
                filter = filter.toLowerCase()
            }
        }

        // ajout d'un tri  si c'est donnée dans le parameter GET
        let orderBy = {}
        const preOrderBy = request.query.orderBy;
        if (preOrderBy && preOrderBy.split(".").length === 2) {
            const orderMe = preOrderBy.split(".");
            orderBy[orderMe[0]] = orderMe[1];
        } else {
            orderBy = {
                firstname: "asc",
                lastname: "asc"
            }
        }

        const subjects = await getAllProf(filter, orderBy, doPagination, page, limit);
        response.status(200).json(subjects);
    } catch (err) {
        response.status(500).json({ message: err.message });
    }
}

const getProfByIdEndPoint = async (request, response) => {
    try {
        const id = request.params.id;

        if (!id) {
            response.status(400).json({ message: 'Missing parameter id' });
        } else {
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
    } catch (err) {
        response.status(500).json({ message: err.message });
    }
}

const insertProfEndPoint = async (request, response) => {
    try {
        const { firstname, lastname = "", email, password, profilPicture = "", isAdmin = false} = request.body;
        if (!firstname || !email || !password) {
            const missing = (!firstname ? "firstname" : "") +
                (!firstname && !email ? ", " : "") +
                (!email ? "email" : "") +
                ((!firstname || !email) && !password ? ", " : "") +
                (!password ? "password" : "");
            response.status(400).json({ message: `Missing parameter(s): ${missing}` });
        } else {
            const newProf = await insertProf(firstname, lastname, email, password, profilPicture, isAdmin);
            response.status(201).json({
                status: 201,
                message: "Prof inserted",
                data: newProf
            });
        }
    } catch (err) {
        response.status(500).json({ message: err.message });
    }
}

const updateProfEndPoint = async (request, response) => {
    try {
        const { firstname, lastname, profilPicture, isAdmin, email, password, id} = request.body;
        if (!id) {
            response.status(400).json({ message: `Missing parameter: id`});
        } else {
            const update = {
                id,
                ...(firstname && { firstname }),
                ...(lastname && { lastname }),
                ...(profilPicture && { profilPicture }),
                ...(isAdmin && { isAdmin }),
                ...(email && { email }),
                ...(password && { password })
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

const deleteProfEndPoint = async (request, response) => {
    try {
        const { id} = request.body;
        if (!id) {
            response.status(400).json({ message: `Missing parameter: id`});
        } else {
            const newSubject = await deleteProf(id);
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
    getAllProfEndPoint,
    getProfByIdEndPoint,
    insertProfEndPoint,
    updateProfEndPoint,
    deleteProfEndPoint,
}