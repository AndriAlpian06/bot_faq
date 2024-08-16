import { Client } from "pg";
import dotenv from "dotenv"

dotenv.config();

export const dbClient = new Client ({
    user: process.env.DB_USER,
    port: 5432,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    
})

dbClient.connect().catch((err) => console.error('Connection error', err.stack))