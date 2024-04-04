import express, {Express, NextFunction, Router, Request, Response} from 'express';
import UserRoutes from './routes/user.routes';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import dbInit from './db/init';
import MessageBroker from './services/messaging-query.service';
import { HttpStatusCode, errorHandler } from './helpers/error-handler.helper';
import { BaseError } from 'sequelize';


class App {
    public express!: Express;
    userRoutes = new UserRoutes();
    

    constructor () {
        this.express = express();
        dbInit()
        this.initializeMiddlewares(this.express);
        this.initializeRouters(this.express);
        this.initializeMessageBroker()
    }

    private initializeRouters (app:Express) {
        app.use('/api/user-ms/', this.userRoutes.router)
        app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            const error = errorHandler.getError(err);
            const statusCode = error!.statusCode | HttpStatusCode.INTERNAL_SERVER
            res.status(Number(statusCode)).json({error});
          });
    }

    private initializeMiddlewares (app:Express) {
        app.use(helmet())
        app.use(cors());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended:true}))
    }

    private async initializeMessageBroker () {
        const GET_USER_DETAILS_QUEUE = "get-user-details"
        const messageBroker = new MessageBroker(GET_USER_DETAILS_QUEUE);
        await messageBroker.init()
        const userDetails = await messageBroker.recieveMessage()
        
    }
}

export default App