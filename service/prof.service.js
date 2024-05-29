const Prof = require("../model/prof.model");

const getAllProf = async (searchInput, orderBy= {}, doPagination= true, page = 1, limit = 10) => {
    try {
        let filter = {}
        if (searchInput) {
            const searchRegex = searchInput instanceof RegExp ? searchInput : new RegExp(searchInput.toLowerCase(), 'i');
            if (searchRegex) {
                filter = {
                    ...filter,
                    $or: [
                        { firstname: { $regex: searchRegex } },
                        { lastname: { $regex: searchRegex } }
                    ]
                }
            }
        }

        const projectStage = {
            $project: {
                password: 0,
            }
        };

        // Convertir les valeurs de `orderBy` en valeurs numériques
        let sortStage = {};
        for (const key in orderBy) {
            if (orderBy[key].toLowerCase() === 'asc') {
                sortStage[key] = 1;
            } else if (orderBy[key].toLowerCase() === 'desc') {
                sortStage[key] = -1;
            }
        }

        const aggregateQuery = [
            { $match: filter },
            projectStage,
            { $sort: sortStage }
        ];

        if (doPagination) {
            const options = {
                page,
                limit
            };
            return await Prof.aggregatePaginate(Prof.aggregate(aggregateQuery), options);
        } else {
            return await Prof.aggregate(aggregateQuery).exec();
        }
    } catch (err) {
        throw new Error('Error retrieving profs: ' + err.message);
    }
}

const getProfById = async (id) => {
    try {
        return await Prof.findById(id).select('-password');
    } catch (err) {
        throw new Error('Error retrieving prof by ID: ' + err.message);
    }
}

const insertProf = async (firstname, lastname = "", email, password, profilPicture = "", isAdmin = false) => {
    try {
        const newProf = new Prof({
            email,
            password,
            profilPicture,
            firstname,
            lastname,
            isAdmin
        });
        const savedProf = await newProf.save();
        return savedProf;
    } catch (err) {
        throw new Error('Error inserting prof: ' + err.message);
    }
}

const updateProf = async (prof) => {
    try {
        const id = prof.id ?? prof._id;
        if (!id) {
            throw new Error(`id required`);
        }
        const updatedProf = await Prof.findByIdAndUpdate(id, prof, {new: true});
        if (!updatedProf) {
            throw new Error(`id ${id} not found `);
        }
        return updatedProf.populate('prof');
    } catch (err) {
        throw new Error('Error updating Prof: ' + err.message);
    }
}

const deleteProf = async (id) => {
    try {
        await Prof.findByIdAndDelete(id);
        return { message: 'Prof successfully deleted' };
    } catch (err) {
        throw new Error('Error deleting prof: ' + err.message);
    }
}

module.exports = {
    getProfById, getAllProf, insertProf, updateProf, deleteProf
}