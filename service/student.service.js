const Student = require("../model/student.model");

const getStudentById = async (id) => {
    return await Student.findById(id).select("-password");
}

module.exports = {
    getStudentById
}