import database from '../config/database.js';
import { Sequelize } from 'sequelize';

const Folder = database.define('Pastas', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
});

Folder.sync({ force: false });

export default Folder;
