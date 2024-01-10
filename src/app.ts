import express, {Application} from 'express';
import {default as routes} from './routes'

const app: Application = express();
app.use(express.json());

app.use('/', routes)

export default app