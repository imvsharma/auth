import express, {Express, Router} from 'express';
import UserRoutes from './routes/user.routes';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import dbInit from './db/init';
import consume from './utils/kafka/consumer';



class App {
    public express!: Express;
    userRoutes = new UserRoutes();
    

    constructor () {
        this.express = express();
        dbInit()
        this.initializeMiddlewares(this.express);
        this.initializeConsumer()
        this.initializeRouters(this.express);
        
    }

    private initializeRouters (app:Express) {
        app.use('/api/user-ms/', this.userRoutes.router)
    }

    private initializeConsumer () {
        consume().catch((err) => {
            console.error("error in consumer: ", err)
        })
    }

    private initializeMiddlewares (app:Express) {
        app.use(helmet())
        app.use(cors());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended:true}))
        
    }
}

export default App