let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-aggregate-paginate-v2');

const AssignmentStudentSchema = new Schema({
    id: { 
        type: String, 
        required: true, 
        unique: true 
    },
    assignment: { 
        id: { 
            type: String, 
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
            required: true 
        },
        dateCreated: { 
            type: Date, 
            default: Date.now 
        }
    },
    student: {
        name: { 
            type: String, 
            required: true 
        },
        email: { 
            type: String, 
            required: true 
        }
    },
    filename: { 
        type: String, 
        required: true 
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
        type: Date 
    },
    remark: { 
        type: String 
    }
});

AssignmentStudentSchema.plugin(mongoosePaginate);

const AssignmentStudent = mongoose.model('AssignmentStudent', AssignmentStudentSchema, 'assignmentStudent');

module.exports = AssignmentStudent;
