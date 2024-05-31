let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-aggregate-paginate-v2');

let subjectSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    illustration: {
        type: String,
        default: ''
    },
    prof: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Prof',
        required: true,
        select: '-email -password -isAdmin'
    }
}, {
    collection: "subject"
});

subjectSchema.plugin(mongoosePaginate);

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
