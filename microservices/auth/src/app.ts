import express, {Express, Router, Request, Response} from 'express';

import AuthRoutes from './routes/auth.routes';
import passport from 'passport';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import { setupPassport } from './strategies/auth';

class App {
    public express!:Express;
    authRoutes = new AuthRoutes();

    constructor() {
        this.express = express();
        this.initializeMiddlewares(this.express)
        this.initializeRouters(this.express)
    }

    private initializeRouters (app:Express) {
        app.use('/api/auth-ms/', this.authRoutes.router)
    }

    private setUpPassport () {
        setupPassport(passport)
    }

    private initializeMiddlewares (app:Express) {
        app.use(helmet())
        app.use(cors());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended:true}))
        app.use(passport.initialize())
        this.setUpPassport()
    }

    
    
}

export default new App().express