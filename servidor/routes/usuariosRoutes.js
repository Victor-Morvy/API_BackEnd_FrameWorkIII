const router = require("express").Router();
const Usuario = require("../models/Usuario");
const { verifyJWT, generateJWT } = require('./Authorization');

router.post('/', async (req, res) => {

    const data_banimento = ""
    const{ nome, user, ra, nivel, curso_id, email, senha } = req.body;
    const data_cadastro  = Date();
    const _id = new mongoose.Types.ObjectId().toHexString();
    const nnivel = 0
    const usuario = {_id, nome, user, ra, nnivel, curso_id, email, senha, data_cadastro, data_banimento}

    try {
        await Usuario.create(usuario);
        res.status(201).json({message: "Usuario criado com sucesso!"});
    } catch (error) {
        res.status(500).json({error: error});
    }
});

// router.get('/', async (req, res) => {
//     try {
//         const list = await Usuario.find();
//         res.status(200).json(list);
//     } catch (error) {
//         res.status(500).json({error: error})
//     }
// });

// router.get('/:id', verifyJWT, async (req, res) => {
//     try {
//         const {id} = req.params
//         const usuario = 
//             await Usuario.findOne({_id: id})

//         // usuario.

//         if (usuario)
//             res.status(200).json(usuario)
//         else
//             res.status(404).json({message: "Não encontrado"})

//     } catch (error) {
//         res.status(500).json({error: error})
//     }
// });

router.delete('/:id', verifyJWT, async (req, res) => {
    try{
        const{id} = req.params;
        const{authenticatedEmail} = req

        const cliente = await Usuario.findOne({email: authenticatedEmail}, {email: true})

        if( cliente._id == id | cliente.nivel > 1)
        {
            const ret = await Usuario.deleteOne({_id: id});

            if( ret.deletedCount > 0)
            {
                res.status(200).json({message: "Usuário removido com sucesso."})
            } else {
                res.status(404).json({message: "Não encontrado"});
            }
        }
        else
        {
            res.status(403).json({message: "Ação proíbida."});
            
        }
    } catch(error) {
        res.status(500).json({error: error});
    }
});

router.post('/login', async (req, res)=>{

    const {email, ra, senha} = req.body
    try {

        const Usuario = await Usuario.findOne({email: email})
        const Usuario2 = await Usuario.findOne({ra: ra})

        if(Usuario2)
        {
            if (Usuario2.ra===ra && Usuario2.senha===senha)
            {
                const token = generateJWT({email: Usuario2.email})
                res.status(200).json({sucesso: true, token: token})
            }
            else
                res.status(401).json({sucesso: false, message: 'Não autorizado. ERR: 01'})
        }
        else if (Usuario)
            if (Usuario.email===email && Usuario.senha===senha)
            {
                const token = generateJWT({email: email})
                res.status(200).json({sucesso: true, token: token})
            }
            else
                res.status(401).json({sucesso: false, message: 'Não autorizado. ERR: 01'})
        else
            res.status(401).json({sucesso: false, message: 'Não autorizado. ERR: 02'})

    } catch (error) {
        console.log(error)
        res.status(500).json({error: error})
    }

})

module.exports = router;