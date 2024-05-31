let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-aggregate-paginate-v2');

let studentSchema = Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true // Assure que chaque email est unique
    },
    password: {
        type: String,
        required: true
    },
    profilPicture: {
        type: String,
        default: '' // Définit la valeur par défaut à false
    }
}, {
    collection: "student"
});

studentSchema.plugin(mongoosePaginate);

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
