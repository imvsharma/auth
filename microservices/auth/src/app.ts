import express, {Express, Router, Request, Response} from 'express';
import kafkaAdminInit from './utils/kafka/admin';

class App {
    public express!:Express;

    constructor() {
        this.express = express();
        this.mountKafkaAdmin()
        this.mountRoute()
    }

    private mountKafkaAdmin(): void {
        kafkaAdminInit()
    }

    private mountRoute(): void {
        const router = Router();
        router.get('/', (req: Request, res: Response) => {
            res.json({
                message: "Hello NodeJS hotttttt"
            })
        })

        this.express.use(router)
    }
    
}

export default new App().express