const router = require("express").Router();
const Curso = require("../models/Curso")
const Usuario = require("../models/Usuario")

const { verifyJWT, generateJWT } = require('./Authorization');

router.get('/', async (req, res) => {
    try{
        const list = await Curso.find();
        res.status(200).json(list);
    } catch(error) {
        res.status(500).json({error: error});
    }
});

router.delete('/:id', verifyJWT, async (req, res) => {

    const{authenticatedEmail} = req

    const cliente = await Usuario.findOne({email: authenticatedEmail}, {email: true})
    if (!cliente)
        return res.status(401).json({message: "Cliente não identificado!"})
    else if (cliente.nivel <= 1)
        return res.status(401).json({message: "Cliente não autorizado!"})
    try{
        const{id} = req.params;

        const ret = await Curso.deleteOne({_id: id});

        if( ret.deletedCount > 0)
        {
            res.status(200).json({message: "Usuário removido com sucesso."})
        } else {
            res.status(404).json({message: "Não encontrado"});
        }
    } catch(error) {
        res.status(500).json({error: error});
    }
});

router.get('/:name', async (req, res) => {
    try{
        const {name} = req.params
        const list = await Curso.findOne({nome: name});
        res.status(200).json(list);
    } catch(error) {
        res.status(500).json({error: error});
    }
});

router.get('/:id', async (req, res) => {
    try{
        const {id} = req.params
        const list = await Curso.findOne({_id: id});
        res.status(200).json(list);
    } catch(error) {
        res.status(500).json({error: error});
    }
});

router.post('/', verifyJWT, async (req, res) => {
    const{authenticatedEmail} = req

    const cliente = await Usuario.findOne({email: authenticatedEmail}, {email: true})
    if (!cliente)
        return res.status(401).json({message: "Cliente não identificado!"})
    else if (cliente.nivel <= 1)
        res.status(401).json({message: "Cliente não autorizado!"})


    const {nome} = req.body;
    const _id = new mongoose.Types.ObjectId().toHexString();
    const curso = {_id, nome};

    try{
        await Curso.create(curso);
        res.status(201).json({message: "Curso criado com sucesso!"});
    } catch (error) {
        res.status(500).json({error: error});
    }
});

router.patch('/', verifyJWT, async (req, res) => {
    const{ _id, nome } = req.body

    const curso = {_id, nome}

    const{authenticatedEmail} = req

    const cliente = await Usuario.findOne({email: authenticatedEmail}, {email: true})
    if (!cliente | cliente.nivel <= 1)
        return res.status(401).json({message: "Não é possível!"})

    try {
        const ret = await Curso.updateOne(
                 {_id: +_id}, curso)
        if (ret.matchedCount>0)
           res.status(200).json({message: 
             "Produto alterado com sucesso!", alterado: ret.modifiedCount>0})
         else
            res.status(404).json({message:
             "Não encontrado"})
    } catch (error) {
        res.status(500).json({error: error})
    }
})

module.exports = router