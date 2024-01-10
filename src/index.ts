import dotenv from 'dotenv'
dotenv.config()
import app from './app'
import { DataSourceOptions } from 'typeorm';
import DatabaseManager from './db';

const port = process.env.PORT || 3000

const dataSourceOptions: DataSourceOptions = {
    type: "mysql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: false,
    synchronize: true, 
}

const dbManager: DatabaseManager = new DatabaseManager(dataSourceOptions)
dbManager.initializeDataSource();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})