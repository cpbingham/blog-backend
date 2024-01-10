import dotenv from 'dotenv'
dotenv.config()
import { DataSourceOptions } from 'typeorm';
import app, {dbConnect} from './app'

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

dbConnect(dataSourceOptions)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})