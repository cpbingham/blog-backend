import { Application } from "express";
import { BaseEntity, DataSourceOptions, DeleteResult, Repository } from "typeorm";
import App from "../../src/app";
import { createAppInstance, getAppInstance } from "../../src/appInstance";
import DatabaseManager from "../../src/dbManager";

export let app: App

export const startApp = async (testName: string) => {
    const datasourceOptions: DataSourceOptions = {
        type: 'mysql',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: (process.env.DB_NAME as string) + testName,
        synchronize: true,
    }

    app = createAppInstance(datasourceOptions)

    await app.initializeApp()

    const port = 3000
    app.startListening(port)
}

export const stopApp = async () => {
    await app.stopListening()
    await getDatabaseManager().disconnectDataSource()
    await getDatabaseManager().dropDatabaseIfExists()
}
  
export const getDatabaseManager = (): DatabaseManager => {
    return getAppInstance().dbManager
}

export const getRepository = <T extends BaseEntity>(
    entity: new () => T
): Repository<T> => {
    return getDatabaseManager().getDataSource().getRepository(entity)
}

export const getApp = (): Application => {
    return app.app
}

export const cleanUpDatabase = async <T extends BaseEntity>(
    entity: new () => T
): Promise<DeleteResult> => {
return getRepository(entity)
    .createQueryBuilder()
    .delete()
    .from(entity)
    .execute();
}