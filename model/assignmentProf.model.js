let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-aggregate-paginate-v2');

const AssignmentProfSchema = new Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    deadline: { 
        type: Date,
        default: null
    },
    dateCreated: { 
        type: Date, 
        default: Date.now 
    },
    prof: {
        _id: mongoose.Schema.Types.ObjectId,
        name: {
            type: String,
            required: true
        },
        profilePicture: {
            type: String,
            required: true,
            default: ""
        }
    },
    subject: {
        _id: mongoose.Schema.Types.ObjectId,
        title: {
            type: String,
            required: true
        },
        illustration: {
            type: String,
            default: ""
        },
    }
}, {
    collection: 'assignmentProf'
});
AssignmentProfSchema.plugin(mongoosePaginate);

const AssignmentProf = mongoose.model('AssignmentProf', AssignmentProfSchema, 'assignmentProf');

module.exports = AssignmentProf;
