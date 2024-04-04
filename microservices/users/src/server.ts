import {Application} from 'express';
import App from './app';
import config from './config/config';


const app: Application = new App().express;

const port: number = parseInt(config.port || '3001');

app.listen(port, () => {
    console.log(`[server]: User microservice is running at ${port}`);
})