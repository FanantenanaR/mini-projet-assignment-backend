const Prof = require("../model/prof.model");
const Student = require("../model/student.model");

const loginStudent = async (email, password) => {
    try {
        const resultat = await Student.findOne({
            email: email,
            password: password
        });
        if (!resultat) {
            return null;
        }
        resultat.password = ""
        return resultat;
    } catch (errorLogin) {
        throw new Error(errorLogin);
    }
}

const loginProf = async (email, password) => {
    try {
        const resultat = await Prof.findOne({
            email: email,
            password: password
        });
        if (!resultat) {
            return null;
        }
        resultat.password = ""
        return resultat;
    } catch (errorLogin) {
        throw new Error(errorLogin);
    }
}

module.exports = {
    loginStudent,
    loginProf
}