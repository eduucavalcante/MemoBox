import database from '../config/database.js';
import User from './User.js';
import { Sequelize } from 'sequelize';

const Folder = database.define('Pastas', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
        onDelete: 'CASCADE'
    }
});

Folder.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});
User.hasMany(Folder, {
    foreignKey: 'userId',
    as: 'folders'
});

Folder.sync({ force: false });

export default Folder;
