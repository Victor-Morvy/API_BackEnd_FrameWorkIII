const mongoose = require('mongoose');

// const Usuario = mongoose.model('Usuario', {
//     id: String,
//     nome: String,
//     user: String,
//     ra: Number,
//     nivel: Number,
//     curso: String,
//     email: String,
//     senha: String,
//     data_cadastro: Date,
//     data_banimento: Date
// })

const Usuario = mongoose.model('Usuario', {
    _id: {
        type: String, 
        required: true
    },
    nome: String,
    user: {
        type: String,
        unique: true
    },
    ra: {
        type: Number,
        unique: true
        
    },
    nivel: {
        type: Number,
        default: 0
    },
    curso_id: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    senha: {
        type: String,
        // select: false,
        bcrypt: true
    },
    data_cadastro: Date,
    data_banimento: Date
})

module.exports = Usuario;