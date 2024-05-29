let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-aggregate-paginate-v2');

const AssignmentProfSchema = new Schema({
    id: { 
        type: String, 
        required: true, 
        unique: true 
    },
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
        required: true 
    },
    dateCreated: { 
        type: Date, 
        default: Date.now 
    }
});
AssignmentProfSchema.plugin(mongoosePaginate);

const AssignmentProf = mongoose.model('AssignmentProf', AssignmentProfSchema, 'assignmentProf');

module.exports = AssignmentProf;
