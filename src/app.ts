import express, {Application} from 'express';
import {default as routes} from './routes'
import { DataSourceOptions } from 'typeorm';
import DatabaseManager from './db';

export let dbManager: DatabaseManager

export const dbConnect = async (dataSourceOptions: DataSourceOptions) => {
    dbManager = new DatabaseManager(dataSourceOptions)
    await dbManager.initializeDataSource()
}

const app: Application = express();

app.use(express.json());

app.use('/', routes)

export default app