import { DataSourceOptions } from "typeorm";
import App from "./app";

let appInstance: App

export const createAppInstance = (
    datasourceOptions: DataSourceOptions
): App => {
    appInstance = new App(datasourceOptions)
    return appInstance
}

export const getAppInstance = (): App => appInstance