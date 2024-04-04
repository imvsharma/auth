import {Router, Response, Request, NextFunction} from 'express'
import passport from 'passport';


class AuthRoutes {
    public router!: Router;

    constructor() {
        this.router = Router();
        this.initializeRoutes(this.router)
    }

    initializeRoutes (router: Router) {
        console.log(`[AuthRoutes]: User microservice routes are initializing`);

        router.get('/health-check', (req:Request, res:Response, next: NextFunction) => {
            console.log(`[AuthRoutes]: auth health check api calling`);
            res.send({
                "success": true,
                "message": "Auth microservice is up and running"
            })
        })

        router.post('/signup', passport.authenticate('signup', {session: false}), async (req: Request, res: Response, next:NextFunction) => {
            console.log(req.user)
            return res.status(200).send(req.user)
            // return res.status(201).send("Done")
            // const {error} =createUserSchema.validate(req.body);
            // if (error) {
            //     return res.status(400).send({success: false, error: error.details[0].message})
            // }
            // const hashedPassword = await passwordEncryption.hashedPassword(req.body.password)
            // const payload:CreateUserDTO = Object.assign(req.body, {'password': hashedPassword});
            // console.log("payload", payload);
            
            // const result = await controller.create(payload);
            // return res.status(201).send(result)

        })

        

        console.log(`[UserRoutes]: User microservice routes are loaded successfully\n`)
    }
}

export default AuthRoutes