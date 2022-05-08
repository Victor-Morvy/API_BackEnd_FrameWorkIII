const mongoose = require('mongoose');

const Curso = mongoose.model('Curso', {
    _id: {
        type: String,
        required: true
    },
    nome: {
        type: String,
        require: true,
        unique: true
    }
})

module.exports = Curso;