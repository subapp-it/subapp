const moongose = require('mongoose')

const { Schema } = moongose

const availmentSchema = new Schema({
    business: {
        type: String,
        required: true
    },
    user: {
        type: Object,
        ref: 'user'
    },
    totalAvailment: {
        type: Boolean,
        default: false
    },
    splittedAvailment: {
        type: Boolean,
        default: false
    },
    rti: {
        type: Boolean,
        default: false
    },
    category: {
        type: Object
    },
    classification: {
        type: String
    },
    participationFee: {
        type: String
    },
    awardFee: {
        type: String
    },
    contact: {
        type: String
    },
    soaFile: {
        type: Object
    }
},
{ timestamps: true })
module.exports = moongose.model('availments', availmentSchema)