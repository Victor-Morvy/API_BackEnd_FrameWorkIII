const router = require("express").Router();
const Usuario = require("../models/Usuario")
const Midia = require("../models/Midia");

const { verifyJWT, generateJWT } = require('./Authorization');

router.post('/', verifyJWT, async ( req, res ) => {

    const{authenticatedEmail} = req

    const cliente = await Usuario.findOne({email: authenticatedEmail}, {email: true})
    if (!cliente)
        return res.status(401).json({message: "Cliente não identificado!"})

    const path = req.body;
    const usuario_id = cliente._id
    const _id = new mongoose.Types.ObjectId().toHexString();
    const data = Date();

    const mid = { _id, usuario_id, path, data }

    // const noticia = { _id, titulo, conteudo, data, id_autor};
    try{
        await Midia.create(mid);
        res.status(201).json({message: "Mídia criada com suceso!"});

    } catch (error) {
        res.status(500).json({error: error})
    }
});

//get midias by user
router.get('/user/:id', async (req, res) => {
    try {
        const user_id = req.params;
        const midias = await Midia.find({usuario_id: user_id});

        if( midias )
            res.status(200).json(midias);
        else
            res.status(404).json({message: "Não encontrado"});
    } catch (error) {
        res.status(500).json({error: error});
    }
})

router.delete('/:id', async (req, res) => {
    const{authenticatedEmail} = req

    const cliente = await Usuario.findOne({email: authenticatedEmail}, {email: true})
    if (!cliente)
        return res.status(401).json({message: "Cliente não identificado!"})
    
    try {
        const id = req.params;
        const willbeDeleted = await Midia.find({id})

        if(!willbeDeleted)
        {
            return res.status(404).json({message: "Não encontrado."})
        }
        
        if( willbeDeleted.usuario_id == cliente._id | cliente.nivel >= 2 )
        {
            const ret = await Midia.deleteMany({_id : id});

            if( ret.deletedCount > 0)
                res.status(200).json({message: "Mídia excluída com sucesso!"});
            else
                res.status(404).json({message: "Não encontrado."})
        }
        else
        {
            return res.status(404).json({message: "Não encontrado."})
        }
        

    } catch (error) {
        res.status(500).json({error: error});
    }
})

module.exports = router