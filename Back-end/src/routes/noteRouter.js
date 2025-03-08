import express from 'express';
import Note from '../models/Note.js';
import Folder from '../models/Folder.js';

const router = express.Router();

// Listar notas dentro de uma pasta
router.get('/:folderId', async  (req, res) => {
    try {
        const folder = await Folder.findOne({
            where: {
                id: req.params.folderId
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

        const noteCount = await Note.count({
            where: {
                folderId: folder.id
            }
        });

        if(noteCount === 0) {
            return res.json({ isEmpty: true });
        }
        res.status(200).json(folder.notes);
    } catch(error) {
        res.status(500).json({"message": `Erro ao carregar notas: ${error}`});
    } 
});

// Abrir uma nota
router.get('/:folderId/:id', async (req, res) => {
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
router.post('/:folderId', async (req, res) => {
    try {
        const folder = await Folder.findOne({
            where: {
                id: req.params.folderId
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
router.delete("/:folderId/:id", async (req, res) => {
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