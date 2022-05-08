const express = require('express')
const app = express()
const mongoose = require('mongoose')
var cors = require('cors');

const noticiasRoutes = require("./routes/noticiasRoutes")
const usuariosRoutes = require("./routes/usuariosRoutes")
const cursosRoutes = require("./routes/cursosRoutes")


// const Noticia = require('./models/Noticia')
// const Usuario = require('./models/Usuario')
// const Comentario = require('./models/Comentario')
// const Midia = require('./models/Midia')
// const Curso = require('./models/Cursos')

app.use(cors())

app.use(
    express.urlencoded({ extended: true }),
    express.json()
);

app.use('/noticias', noticiasRoutes )
app.use('/usuarios', usuariosRoutes )
app.use("/cursos", cursosRoutes)

mongoose.connect('mongodb+srv://admin:naruto666@Cluster0.26yxz.mongodb.net/Cluster0?retryWrites=true&w=majority')
.then(()=>{
    console.log("Conectado ao MongoDB")
})
.catch((e)=>{
    console.log("Erro ao acessar o MongoDB")
    console.log(e)
})

app.listen(3100);