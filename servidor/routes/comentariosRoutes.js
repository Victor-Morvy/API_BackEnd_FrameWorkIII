const router = require("express").Router();
// const Curso = require("../models/Curso")
const Usuario = require("../models/Usuario")
const Comentario = require("../models/Comentario")

const { verifyJWT, generateJWT } = require('./Authorization');


//get comentarios by noticia id
router.get('/noticia/:id', async( req, res ) => {
    try
    {
        const{id} = req.params;
        const coments = await Comentario.find({noticia_id : id});
        if(coments)
        {
            res.status(200).json(coments);
        } else
            res.status(404).json({message: "Não encontrada."});
    } catch (error){
        res.status(500).json({error: error});
    }
});

router.post('/', verifyJWT, async ( req, res ) => {

    const{authenticatedEmail} = req
    const cliente = await Usuario.findOne({email: authenticatedEmail}, {email: true})
    if (!cliente)
        return res.status(401).json({message: "Cliente não identificado!"})

    const usuario_id = cliente._id

    const{ noticia_id, comentario} = req.body;
    const _id = new mongoose.Types.ObjectId().toHexString();
    const data = Date();

    const coment = { _id, usuario_id, noticia_id, comentario, data }

    // const noticia = { _id, titulo, conteudo, data, id_autor};
    try{
        await Comentario.create(coment);
        res.status(201).json({message: "Comentário criado com suceso!"});

    } catch (error) {
        res.status(500).json({error: error})
    }
});


//delete comentary by id
router.delete('/:id', verifyJWT, async ( req, res ) => {
    
    const{authenticatedEmail} = req
    const cliente = await Usuario.findOne({email: authenticatedEmail}, {email: true})
    if (!cliente)
        return res.status(401).json({message: "Cliente não identificado!"})

    try {
        const id = req.params;
        const comment = await Comentario.findOne({_id : id });
        
        if ( comment.usuario_id == cliente._id | cliente.nivel >= 2)
        {
            const ret = await Comentario.deleteOne({_id : id});
            if( ret.deletedCount > 0)
                res.status(200).json({message: "Comentário excluído com sucesso!"});
            else
                res.status(404).json({message: "Não encontrado."})
        }


    } catch (error) {

        res.status(500).json({error: error});
        
    }
});

//delete comentaries by noticia_id
// router.delete('/noticia/:id', verifyJWT, async ( req, res ) => {
//     try {
//         const id = req.params;

//         const ret = await Comentario.deleteMany({noticia_id : id});

//         if( ret.deletedCount > 0)
//             res.status(200).json({message: "Comentário excluído com sucesso!"});
//         else
//             res.status(404).json({message: "Não encontrado."})

//     } catch (error) {

//         res.status(500).json({error: error});
        
//     }
// });

//delete comentaries by user_id
// router.delete('/user/:id', async ( req, res ) => {
//     try {
//         const id = req.params;

//         const ret = await Comentario.deleteMany({usuario_id : id});

//         if( ret.deletedCount > 0)
//             res.status(200).json({message: "Comentário excluído com sucesso!"});
//         else
//             res.status(404).json({message: "Não encontrado."})

//     } catch (error) {

//         res.status(500).json({error: error});
        
//     }
// });

module.exports = router;