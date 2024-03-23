import {Application} from 'express';
import App from './app';
import dotenv from 'dotenv'

dotenv.config();

const app: Application = new App().express;

const port: number = parseInt(process.env.USER_MS_PORT || '3001');

app.listen(port, () => {
    console.log(`[server]: User microservice is running at http://localhost:${port}`);
})