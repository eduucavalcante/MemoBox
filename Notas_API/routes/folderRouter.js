import express from 'express';
import Note from '../models/Note.js';
import Folder from '../models/Folder.js';

const router = express.Router();

// Listar pastas
router.get('/',async  (req, res) => {
    try {
        const folders = await Folder.findAll({ order: [["id", "DESC"]]});
        res.status(200).json(folders);
    } catch(error) {
        res.status(500).json({"message": `Erro ao carregar pastas: ${error}`});
    } 
});

// Criar uma pasta
router.post('/', async (req, res) => {
    try {
        await Folder.create({
            name: req.body.name
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
router.delete("/:name", async (req, res) => {
    try {
        await Folder.destroy({
            where: {
                name: req.params.name
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