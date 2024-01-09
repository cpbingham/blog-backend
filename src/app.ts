import express from 'express';
// import {Request, Response} from 'express';
// import { User } from './entity/user.entity';
import { myDataSource } from './app-data-source';
import { Posts } from './routes/posts'
import {Comments} from './routes/comments'
import {Users} from './routes/users'
import {Auth} from './routes/auth'

myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

const app = express();
app.use(express.json());

const port = 3000;

app.use('/posts', Posts)
app.use('/comments', Comments)
app.use('/users', Users)
app.use('/auth', Auth)

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});