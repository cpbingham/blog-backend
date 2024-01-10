import { DataSource, DataSourceOptions } from "typeorm";
import { User, Comment, Post} from './models'
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
        const access = {
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
}

export default DatabaseManager