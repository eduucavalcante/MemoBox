import express from 'express';
import Note from '../models/Note.js';
import Folder from '../models/Folder.js';

const router = express.Router();

// Listar notas dentro de uma pasta
router.get('/:name',async  (req, res) => {
    try {
        const folder = await Folder.findOne({
            where: {
                name: req.params.name
            },
            include: {
                model: Note, as: 'notes'
            }
        });

        if(!folder) {
            return res.status(404).json({
                error: 'Pasta não encontrada.'
            });
        }

        res.status(200).json(folder.notes);
    } catch(error) {
        res.status(500).json({"message": `Erro ao carregar notas: ${error}`});
    } 
});

// Abrir uma nota
router.get('/:name/:id', async (req, res) => {
    try {
        const note = await Note.findOne({
            where: {
                id: req.params.id
            }
        });

        res.status(200).json(note);
    } catch(error) {
        res.status(500).json({ "message": `Erro ao carregar a nota: ${error}`});
    }
});

// Criar uma nota dentro de uma pasta
router.post('/:name', async (req, res) => {
    try {
        const folder = await Folder.findOne({
            where: {
                name: req.params.name
            }
        });

        if(!folder) {
            return res.status(404).json({ error: 'Pasta não encontrada'});
        }

        await Note.create({
            title: req.body.title,
            content: req.body.content,
            folderId: folder.id
        });

        res.status(201).json({
            "message": "Nota criada com sucesso!",
        });
    } catch(error) {
        res.status(500).json({
            "message": `Erro ao criar nota: ${error}`
        });
    }
});

// Excluir uma nota
router.delete("/:name/:id", async (req, res) => {
    try {
        await Note.destroy({
            where: {
                id: req.params.id
            }
        });

        res.status(200).json({
            "message": "Nota excluída com sucesso!"
        });
    } catch(error) {
        res.status(500).json({
            "message": `Erro ao deletar nota: ${error}`
        });
    }
});

export default router;