const mongoose = require('mongoose');

const Midia = mongoose.model('Midia', {
    _id: {
        type: String, 
        required: true
    },
    usuario_id: {
        type: String, 
        required: true
    },
    path: {
        type: String, 
        required: true
    },
    data: {
        type: Date,
        required: true
    },
    data_exclusao: {
        type: Date,
        default: ""
    }
})

module.exports = Midia;