import express, {Application} from 'express';
import {default as routes} from './routes'
import { DataSourceOptions } from 'typeorm';
import DatabaseManager from './db';

class App {
    public app: Application
    public dbManager: DatabaseManager

    private server

    constructor(dataSourceOptions: DataSourceOptions) {
        this.app = express()
        this.dbManager = new DatabaseManager(dataSourceOptions)
    }

    public startListening(port: number) {
        this.server = this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        })
    }

    public stopListening() {
        if (this.server) {
            this.server.close(() => {})
        }
    }

    private async dbConnect(): Promise<void> {
        try {
            await this.dbManager.initializeDataSource()
        } catch (error) {
            console.log(error);
        }
    }

    private setupMiddleware() {
        this.app.use(express.json())
    }

    private setupRoutes() {
        this.app.use('/', routes)
    }

    public async initializeApp(): Promise<void> {
        await this.dbConnect()
        this.setupMiddleware()
        this.setupRoutes()
    }
}

export default App