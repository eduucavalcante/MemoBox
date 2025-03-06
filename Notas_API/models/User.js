import database from '../config/database.js';
import { Sequelize } from 'sequelize';

const User = database.define('Usuarios', {
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
});

User.sync({ force: false });

export default User;
