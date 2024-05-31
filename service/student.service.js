const Student = require("../model/student.model");

const getStudents = async (name = null, orderBy= {}, doPagination = true, page = 1, limit = 10) => {
    try {
        let sortStage = {};
        for (const key in orderBy) {
            if (orderBy[key].toLowerCase() === 'asc') {
                sortStage[key] = 1;
            } else if (orderBy[key].toLowerCase() === 'desc') {
                sortStage[key] = -1;
            }
        }

        const projectStage = {
            $project: {
                password: 0,
            }
        };

        let filter = {}

        if (name) {
            const searchRegex = name instanceof RegExp ? name : new RegExp(name.toLowerCase(), 'i');
            if (searchRegex) {
                filter = {
                    ...filter,
                    $or: [
                        { firstname: { $regex:  searchRegex } },
                        { lastname: { $regex:  searchRegex } }
                    ]
                }
            }
        }

        // Condition créé avec mongo Compass
        const aggregateQuery = [
            { $match: filter },
            projectStage,
            { $sort: sortStage }
        ];

        if(doPagination) {
            const options = {
                page,
                limit
            };
            return await Student.aggregatePaginate(Student.aggregate(aggregateQuery), options);
        } else {
            const results = await Student.aggregate(aggregateQuery).exec();
            const totalDocs = results.length;
            return {
                docs: results,
                totalDocs,
                limit: totalDocs,
                page: 1,
                totalPages: 1,
                pagingCounter: 1,
                hasPrevPage: false,
                hasNextPage: false,
                prevPage: null,
                nextPage: null
            };
        }
    } catch (err) {
        throw new Error('Error retrieving subjects: ' + err.message);
    }
}

const getStudentById = async (id) => {
    return await Student.findById(id).select("-password");
}

const insertStudent = async (firstname, lastname, email, password, profilPicture = "") => {
    try {
        const student = await Student.create({
            email: email,
            password: password,
            profilPicture: profilPicture,
            firstname: firstname,
            lastname: lastname
        });
        if (student) {
            student.password = "";
        }
        return student;
    } catch (err) {
        throw new Error('Error inserting student: ' + err.message);
    }
}

const updateStudent = async (id, change) => {
    try {
        return await Student.findOneAndUpdate({ _id: id }, change, {new: true});
    } catch (e) {
        throw new Error('Error modifying student: ' + err.message);
    }
}

const deleteStudent = async (id) => {
    // TODO delete student
}

module.exports = {
    getStudents,
    getStudentById,
    insertStudent,
    updateStudent,
    deleteStudent
}