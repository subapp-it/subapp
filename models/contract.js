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
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    expirationDate: {
        type: Date,
        required: true
    }
},
{ timestamps: true })
module.exports = moongose.model('Contract', contractSchema)