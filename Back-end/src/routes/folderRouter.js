import express from 'express';
import Note from '../models/Note.js';
import Folder from '../models/Folder.js';

const router = express.Router();

// Listar pastas
router.get('/', async  (req, res) => {
    try {
        const userId = req.user.id;
        const count = await Folder.count({
            where: {
                userId: userId
            }
        });

        // Verifica se existem pastas
        if(count === 0) {
            return res.json({ isEmpty: true });
        }

        const folders = await Folder.findAll({ 
            where: {
                userId: userId
            },
            order: [["id", "DESC"]]
        });

        res.status(200).json(folders);
    } catch(error) {
        res.status(500).json({"message": `Erro ao carregar pastas: ${error}`});
    } 
});

// Criar uma pasta
router.post('/', async (req, res) => {
    try {
        const userId = req.user.id;
    
        await Folder.create({
            name: req.body.name,
            userId: userId
        });

        res.status(201).json({
            "message": "Pasta criada com sucesso!",
        });
    } catch(error) {
        res.status(500).json({
            "message": `Erro ao criar pasta: ${error}`
        });
    }
});

// Excluir uma pasta
router.delete("/:id", async (req, res) => {
    try {
        const userId = req.user.id;

        await Folder.destroy({
            where: {
                id: req.params.id,
                userId: userId
            }
        });

        res.status(200).json({
            "message": "Pasta excluída com sucesso!"
        });
    } catch(error) {
        res.status(500).json({
            "message": `Erro ao deletar pasta: ${error}`
        });
    }
});

export default router;