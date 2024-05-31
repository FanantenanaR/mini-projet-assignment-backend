const Subject = require('../model/subject.model')

const getAllSubject = async (title = null, prof = null, orderBy= {}, doPagination = true, page = 1, limit = 10) => {
    try {
        // Convertir les valeurs de `orderBy` en valeurs numériques
        let sortStage = {};
        for (const key in orderBy) {
            if (orderBy[key].toLowerCase() === 'asc') {
                sortStage[key] = 1;
            } else if (orderBy[key].toLowerCase() === 'desc') {
                sortStage[key] = -1;
            }
        }

        // enlever les colonnes password, email et isAdmin du join
        const projectStage = {
            $project: {
                "profData.password": 0,
                "profData.email": 0,
                "profData.isAdmin": 0
            }
        };

        // Ajout du choix du prof si donnée en argument
        let filter = {}
        if (prof !== null) {
            filter = {
                ...filter,
                prof: prof
            }
        }

        // Utilisation du input
        if (title) {
            const searchRegex = title instanceof RegExp ? title : new RegExp(title.toLowerCase(), 'i');
            if (searchRegex) {
                filter = {
                    ...filter,
                    title: {
                        $regex: searchRegex
                    }
                }
            }
        }

        // Condition créé avec mongo Compass
        const aggregateQuery = [
            { $match: filter },
            { $lookup: { from: 'prof', localField: 'prof', foreignField: '_id', as: 'profData' } },
            { $unwind: '$profData' },
            projectStage,
            { $sort: sortStage }
        ];

        console.log(aggregateQuery)

        if (doPagination) {
            const options = {
                page,
                limit
            };
            return await Subject.aggregatePaginate(Subject.aggregate(aggregateQuery), options);
        } else {
            const results = await Subject.aggregate(aggregateQuery).exec();
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

const getSubjectById = async (id) => {
    try {
        const subject = await Subject.findById(id).populate({
            path: 'prof',
            select: '-email -password -isAdmin'
        });
        if (subject) {
            const subjectWithProfData = subject.toObject();
            subjectWithProfData.profData = subjectWithProfData.prof;
            subjectWithProfData.prof = subjectWithProfData.prof._id;

            return subjectWithProfData;
        }
        return subject;
    } catch (err) {
        throw new Error('Error retrieving subject by ID: ' + err.message);
    }
}

const insertSubject = async (title, prof, illustration = "") => {
    try {
        const newSubject = new Subject({illustration, prof, title});
        return await newSubject.save();
    } catch (err) {
        throw new Error('Error inserting subject: ' + err.message);
    }
}

const updateSubject = async (subject) => {
    try {
        const id = subject.id || subject._id;
        if (!id) {
            throw new Error(`id required`);
        }
        const result = await Subject.findByIdAndUpdate(id, subject, {new: true});
        if (!result) {
            throw new Error(`id ${id} not found `);
        }
        const updatedSubject =  result.populate({
            path: 'prof',
            select: '-email -password -isAdmin'
        });
        const subjectWithProfData = updatedSubject.toObject();
        subjectWithProfData.profData = subjectWithProfData.prof;
        subjectWithProfData.prof = subjectWithProfData.prof._id;

        return subjectWithProfData;
    } catch (err) {
        throw new Error('Error updating subject: ' + err.message);
    }
}

const deleteSubject = async (id) => {
    try {
        await Subject.findByIdAndDelete(id);
    } catch (err) {
        throw new Error('Error deleting subject: ' + err.message);
    }
    return true;
}

module.exports = {
    getAllSubject,
    getSubjectById,
    insertSubject,
    updateSubject,
    deleteSubject
}
