const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recruitmentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    position: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    applicantsCount: {
        type: Number
    }
}, {
   timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})
module.exports = mongoose.model('Recruitment', recruitmentSchema)