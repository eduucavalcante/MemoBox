import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/login', async (req, res) => {
    try {
        const userInfo = req.body;

        const user = await User.findOne({
            where: {
                email: userInfo.email
            }
        });

        if(!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        const isMatch = await bcrypt.compare(userInfo.password, user.password);

        if(!isMatch) {
            return res.status(400).json({ message: "Senha inválida" });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '30d' });

        res.status(200).json({ message: "Login efetuado com sucesso!", auth: token });
    } catch(error) {
        console.log(`Erro no servidor: ${error.message}`);
        res.status(500).json({ message: "Erro no servidor" });
    }
});

router.post('/signup', async (req, res) => {
    try {
        const user = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.password, salt);

        await User.create({
            username: user.username,
            email: user.email,
            password: hashPassword
        });

        res.status(201).json({ message: "Usuário criado com sucesso!" });
    } catch(error) {
        console.log(`Erro ao criar usuário: ${error.message}`);
        res.status(500).json({ message: "Erro ao criar usuário" });
    }
});

export default router;