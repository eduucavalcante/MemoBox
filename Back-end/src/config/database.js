import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import fs from 'fs';
import path from 'path';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: process.env.DATABASE_DIALECT,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: true,
            ca: process.env.CA
        }
    },
    logging: false
});

export default sequelize;