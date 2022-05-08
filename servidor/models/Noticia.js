const mongoose = require('mongoose');

const Noticia = mongoose.model('Noticia', {
    _id: {
        type: String, 
        required: true
    },
    titulo: {
        type: String, 
        required: true
    },
    conteudo: {
        type: String, 
        required: true
    },
    data: Date,
    id_autor: {
        type: String, 
        required: true
    },
    data_edicao: {
        type: Date,
        default: ""
    },
    conteudo_antigo: {
        type: String,
        default: ""
    },
    data_exclusao: {
        type: Date,
        default: ""
    }
})

module.exports = Noticia;