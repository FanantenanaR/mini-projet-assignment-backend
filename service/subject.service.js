const Subject = require('../model/subject.model')
const {ObjectId} = require("mongodb");

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
        let filter = {
            ...(prof && { prof: new ObjectId(prof) })
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
            return await Subject.aggregate(aggregateQuery).exec();
        }
    } catch (err) {
        throw new Error('Error retrieving subjects: ' + err.message);
    }
}

const getSubjectById = async (id) => {
    try {
        const subject = await Subject.findById(id).populate('prof');
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
        const updatedSubject = await Subject.findByIdAndUpdate(id, subject, {new: true});
        if (!updatedSubject) {
            throw new Error(`id ${id} not found `);
        }
        return updatedSubject.populate('prof');
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
