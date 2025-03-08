import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {
    const token = req.headers.authorization;

    if(!token) {
        return res.status(401).json({ message: 'Acesso negado: o usuário precisa estar logado!' });
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
        req.user = {
            id: decoded.id,
            username: decoded.username,
            email: decoded.email
        };
        next();
    } catch(error) {
        res.status(401).json({ message: 'Token inválido' });
    }
}

export default auth;