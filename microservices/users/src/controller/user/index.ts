
import UserService, * as service from '../../services/user.service';
import {CreateUserDTO, UpdateUserDTO} from '../../dto/user.dto';
import {IUser, IUserNotFound, UserNotFoundOutput, UserOutput} from '../../interface/user.interface'
import toUser from './user.mapper';
import { NextFunction } from 'express';
import { APIError, HttpStatusCode, InternalServerError, NotFoundError } from '../../helpers/error-handler.helper';



class UserController {
    userService!: UserService;
    constructor() {
        this.userService = new UserService();
    }

    public async create (payload:CreateUserDTO) {
        try {
            const userDetails = await this.userService.create(payload)
            return userDetails
        } catch (err) {
            console.log(err);
            throw new Error(JSON.stringify(err))
        }
        
    }

    public async getAll (): Promise<IUser[]>{
        try{
            return this.userService.getAll()
        } catch (err) {
            throw new APIError('INTERNAL_SERVER_ERROR', HttpStatusCode.INTERNAL_SERVER, true, JSON.stringify(err))
        }
    }

    public async getById (id:number): Promise<IUser>{
        
            const user = await this.userService.getById(id);
            if (!user) {
                throw new NotFoundError("User not Found")
            }
            return user;
        
    }

    public async getByUsername (username: string): Promise<IUser>{
        try{
            const user = await this.userService.getByUsername(username);
            if (!user) {
                throw new NotFoundError("User not Found")
            }
            return user;
        } catch (err) {
            throw new APIError('INTERNAL_SERVER_ERROR', HttpStatusCode.INTERNAL_SERVER, true, JSON.stringify(err))
        }
    }

    public async getByEmail (email: string): Promise<IUser>{
        try{
            const user = await this.userService.getByEmail(email);
            if (!user) {
                throw new NotFoundError("User not Found")
            }
            return user;
        } catch (err) {
            throw new APIError('INTERNAL_SERVER_ERROR', HttpStatusCode.INTERNAL_SERVER, true, JSON.stringify(err))
        }
    }

    public async update (id: number, payload: UpdateUserDTO): Promise<IUser> {
        try{
            const user = await this.userService.update(id, payload);
            if (!user) {
                throw new NotFoundError("User not Found")
            }
            return user;
        } catch (err) {
            throw new APIError('INTERNAL_SERVER_ERROR', HttpStatusCode.INTERNAL_SERVER, true, JSON.stringify(err))
        }
    }

    public async deleteById (id:number): Promise<Boolean> {
        try {
            const user = await this.userService.deleteById(id)
            if (!user) {
                throw new NotFoundError("User not Found")
            }
            return user
        } catch (err) {
            throw new InternalServerError(JSON.stringify(err))
        }   
    }    
}

export default UserController