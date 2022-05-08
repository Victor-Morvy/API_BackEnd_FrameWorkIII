const mongoose = require('mongoose');

const Product = mongoose.model('Product', {
    codigo: Number,
    nome: String,
    imagem: String,
    descricao: String,
    promocao: Boolean,
    idcategoria: Number,
    preco: Number
})

module.exports = Product;