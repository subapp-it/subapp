const moongose = require('mongoose')

const { Schema } = moongose

const contractSchema = new Schema({
    entity: {
        type: String,
        required: true
    },
    typology: {
        type: String,
        required: true
    },
    procedure: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    region: {
        type: String
    },
    place: {
        type: String
    },
    link: {
        type: String
    }
},
{ timestamps: true })
module.exports = moongose.model('Contract', contractSchema)