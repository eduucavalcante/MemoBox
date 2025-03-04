import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import fs from 'fs';
import path from 'path';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    port: process.env.PORT,
    dialect: process.env.DIALECT,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: true,
            ca: fs.readFileSync(process.env.CA_PATH)
        }
    },
    logging: false
});

export default sequelize;