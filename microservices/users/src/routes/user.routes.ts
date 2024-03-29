import {Router, Response, Request, NextFunction} from 'express'
import { CreateUserDTO, UpdateUserDTO } from '../dto/user.dto';
import UserController from '../controller/user';
import createUserSchema from '../api/schema/user.schema';
import passwordEncryption from '../utils/bcrypt';


class UserRoutes {
    public router!: Router;
    public userController!: UserController

    constructor() {
        this.router = Router();
        this.userController = new UserController()
        this.initializeRoutes(this.router, this.userController)
    }

    initializeRoutes (router: Router, controller: UserController) {
        console.log(`[UserRoutes]: User microservice routes are initializing`);

        router.get('/health-check', (req:Request, res:Response, next: NextFunction) => {
            console.log(`[UserRoutes]: user health check api calling`);
            res.send({
                "success": true,
                "message": "User microservice is up and running"
            })
        })

        router.post('/', async (req: Request, res: Response, next:NextFunction) => {
            const {error} =createUserSchema.validate(req.body);
            if (error) {
                return res.status(400).send({success: false, error: error.details[0].message})
            }
            const hashedPassword = await passwordEncryption.hashedPassword(req.body.password)
            const payload:CreateUserDTO = Object.assign(req.body, {'password': hashedPassword});
            console.log("payload", payload);
            
            const result = await controller.create(payload);
            return res.status(201).send(result)
        })

        router.get('/', async (req: Request, res: Response, next:NextFunction) => {
            const result = await controller.getAll();
            return res.status(200).send(result)
        })

        router.get('/:id', async (req:Request, res:Response, next:NextFunction) => {
            const id = Number(req.params.id)
            const result = await controller.getById(id);
            return res.status(200).send(result)
        })

        router.delete('/:id', async (req:Request, res:Response, next:NextFunction) => {
            const id = Number(req.params.id)
            const result = await controller.deleteById(id);
            return res.status(204).send({success: result})
        })

        router.put('/:id', async (req:Request, res:Response, next:NextFunction) => {
            const id = Number(req.params.id)
            const payload: UpdateUserDTO = req.body
            const result = await controller.update(id, payload);
            return res.status(201).send(result)
        })

        

        console.log(`[UserRoutes]: User microservice routes are loaded successfully\n`)
    }
}

export default UserRoutes