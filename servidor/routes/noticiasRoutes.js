const router = require('express').Router();
const Usuario = require("../models/Usuario");
const Noticia = require("../models/Noticia");
const { verifyJWT, generateJWT } = require('./Authorization');

router.get('/', async (req, res) => {
    try{
        const list = await Noticia.find();
        res.status(200).json(list);
        // console.log("length: " + list.length)
    } catch(error) {
        res.status(500).json({error: error});
    }
});

//get Noticias por autor
router.get('/user/:id_autor', async (req, res) => {
    try
    {
        const{id_autor} = req.params;
        const noticia = await Noticia.find({id_autor : id_autor});
        if(noticia)
        {

            res.status(200).json(noticia);
        } else
            res.status(404).json({message: "Não encontrada."});
    } catch (error){
        res.status(500).json({error: error});
    }
});

router.post('/', verifyJWT, async (req, res) => {
    
    const{ titulo, conteudo} = req.body;
    const{ authenticatedEmail } = req

    const cliente = await Usuario.findOne({email: authenticatedEmail}, {email: true})
    if (!cliente)
        return res.status(401).json({message: "Cliente não identificado!"})

    const _id = new mongoose.Types.ObjectId().toHexString();
    const data = Date();
    const id_autor = cliente._id
    const noticia = { _id, titulo, conteudo, data, id_autor};
    try{
        await Noticia.create(noticia);
        res.status(201).json({message: "Noticia criada com suceso!"});

    } catch (error) {
        res.status(500).json({error: error})
    }
});

router.delete('/:id', async( req, res ) => {
    try{

        const{ authenticatedEmail } = req

        const cliente = await Usuario.findOne({email: authenticatedEmail}, {email: true})
        if (!cliente)
            return res.status(401).json({message: "Cliente não identificado!"})

        const{id} = req.params;

        const noticia = await Noticia.findById(id);
        if( !noticia )
            return res.status(401).json({message: "Not found noticia"});

        if( cliente.nivel >= 2 | noticia.id_autor == cliente._id )
        {
            const ret = await Noticia.deleteOne({_id: id});

            if( ret.deletedCount > 0)
            {
                res.status(200).json({message: "Notícia removida com sucesso."})
            } else {
                res.status(404).json({message: "Notícia Não encontrada"});
            }
        }
    } catch(error) {
        res.status(500).json({error: error});
    }
});


router.patch('/', verifyJWT, async (req, res) => {
    const{ _id, titulo, conteudo } = req.body

    const{authenticatedEmail} = req

    const cliente = await Usuario.findOne({email: authenticatedEmail}, {email: true})
    if (!cliente | cliente.nivel <= 1)
        return res.status(401).json({message: "Não é possível!"})

    const noticia = await Noticia.findOne({_id : _id})
    if (!noticia )
        return res.status(404).json({message: "Notícia not found"})

    if ( noticia.id_autor != cliente._id )
        return res.status(203).json({message: "Undetifyed author."})

    noticia.conteudo_antigo = noticia.conteudo
    noticia.data_edicao = Date();
    noticia.conteudo = conteudo;
    noticia.titulo = titulo;

    try {
        const ret = await Noticia.updateOne(
                 {_id: +_id}, noticia)
        if (ret.matchedCount>0)
           res.status(200).json({message: 
             "Produto alterado com sucesso!", alterado: ret.modifiedCount>0})
         else
            res.status(404).json({message:
             "Não encontrado"})
    } catch (error) {
        res.status(500).json({error: error})
    }

});

module.exports = router