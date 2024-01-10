import { DataSource, DataSourceOptions } from "typeorm";
import { User, Comment, Post} from './models'
import { ConnectionOptions } from "mysql2";
import * as mysql from 'mysql2/promise'

class DatabaseManager {
    private datasourceOptions: DataSourceOptions = null;
    private dataSource: DataSource = null;

    constructor(private config: DataSourceOptions) {
        this.datasourceOptions = config
    }

    getDataSource() {
        return this.dataSource
    }

    async initializeDataSource() {
        this.dataSource = new DataSource({
            ...this.datasourceOptions,
            entities: [User, Comment, Post],
        })

        await this.dataSource
            .initialize()
            .then(async() => {
                console.log("Data Source has been initialized!");
            })
            .catch(async (error) => {
                if (error.code === "ER_BAD_DB_ERROR") {
                    await this.createDatabaseIfNotExists();
                    await this.initializeDataSource();
                } else {
                    console.error("Error creating database:", error);
                    throw error;
                }
            });
    }

    private async createDatabaseIfNotExists() {
        console.log("DATABASE DOES NOT EXISTS, CREATING DATABASE");
        const access: ConnectionOptions = {
          user: "root",
          password: "root",
          database: "mysql",
        };
    
        const conn = await mysql.createConnection(access);
        await conn.query(
          `CREATE DATABASE IF NOT EXISTS ${this.datasourceOptions.database}`
        ); 
        await conn.end();
    }

    public async dropDatabaseIfExists() {
        const access: ConnectionOptions = {
          user: "root",
          password: "root",
          database: "mysql",
        }

        const conn = await mysql.createConnection(access)
        await conn.query(
            `DROP DATABASE IF EXISTS ${this.datasourceOptions.database}`
        )
        await conn.end()
    }

    public async disconnectDataSource() {
        if (this.dataSource) {
            await this.dataSource.dropDatabase()
            await this.dataSource.destroy()
        }
    }
}

export default DatabaseManager