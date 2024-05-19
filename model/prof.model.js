let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-aggregate-paginate-v2');

let profSchema = Schema({
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
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    collection: "prof"
});

profSchema.plugin(mongoosePaginate);

const Prof = mongoose.model('Prof', profSchema);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
// assignment est le nom de la collection dans la base de données
// Mongoose tolère certaines erreurs dans le nom (ex: Assignent au lieu de assignments)
module.exports = Prof;
