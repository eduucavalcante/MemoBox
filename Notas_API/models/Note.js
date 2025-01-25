import database from '../config/database.js';
import Folder from './Folder.js';
import { Sequelize } from 'sequelize';

const Note = database.define('Notas', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    folderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Folder,
            key: 'id'
        }
    }
});

Note.belongsTo(Folder, {
    foreignKey: 'folderId', as: 'folder'
});
Folder.hasMany(Note, {
    foreignKey: 'folderId', as: 'notes'
});

Note.sync({ force: false });

export default Note;