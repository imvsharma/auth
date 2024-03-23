import express, {Express, Router} from 'express';
import UserRoutes from './routes/user.routes';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import dbInit from './db/init';


class App {
    public express!: Express;
    userRoutes = new UserRoutes();
    

    constructor () {
        this.express = express();
        dbInit()
        this.initializeMiddlewares(this.express);
        this.initializeRouters(this.express);
        
    }

    private initializeRouters (app:Express) {
        app.use('/api/user-ms/', this.userRoutes.router)
    }

    private initializeMiddlewares (app:Express) {
        app.use(helmet())
        app.use(cors());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended:true}))
        
    }
}

export default App