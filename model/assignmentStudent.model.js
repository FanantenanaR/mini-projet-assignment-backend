let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-aggregate-paginate-v2');

const AssignmentStudentSchema = new Schema({
    assignment: { 
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true 
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
            default: null
        },
        dateCreated: { 
            type: Date, 
            default: null
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
    },
    student: {
        _id: mongoose.Schema.Types.ObjectId,
        name: { 
            type: String, 
            required: true 
        },
        email: { 
            type: String, 
            required: true 
        },
        profilePicture: {
            type: String,
            default: ""
        }
    },
    remarkFromStudent: { 
        type: String 
    },
    dateSubmit: { 
        type: Date, 
        required: true 
    },
    note: { 
        type: Number 
    },
    dateEvaluation: { 
        type: Date,
        default: null
    },
    remark: { 
        type: String,
        default: ''
    }
}, {
    collection: 'assignmentStudent'
});

AssignmentStudentSchema.plugin(mongoosePaginate);

const AssignmentStudent = mongoose.model('AssignmentStudent', AssignmentStudentSchema, 'assignmentStudent');

module.exports = AssignmentStudent;
