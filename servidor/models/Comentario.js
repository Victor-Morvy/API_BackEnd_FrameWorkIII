const mongoose = require('mongoose');

const Comentario = mongoose.model('Comentario', {
    _id: {
        type: String, 
        required: true
    },
    usuario_id: {
        type: String, 
        required: true
    },
    noticia_id: {
        type: String, 
        required: true
    },
    comentario: {
        type: String, 
        required: true
    },
    data: {
        type: Date,
        require: true
    },
    data_exclusao: {
        type: Date, 
        default: ""
    }
})

module.exports = Comentario;