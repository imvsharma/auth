
import * as service from '../../services/user.service';
import {CreateUserDTO, UpdateUserDTO} from '../../dto/user.dto';
import {IUser} from '../../interface/user.interface'
import toUser from './user.mapper';


class UserController {
    constructor() {

    }

    async create (payload:CreateUserDTO): Promise<IUser> {
        
        return toUser(await service.create(payload))
    }

    async update (id: number, payload:UpdateUserDTO):Promise<IUser> {
        return toUser(await service.update(id, payload))
    }

    async getAll (): Promise<IUser[]> {
        return (await service.getAll()).map(toUser)
    }

    async getById (id:number): Promise<IUser> {
        return toUser(await service.getById(id))
    }

    async getByEmail (email:string): Promise<IUser> {
        return toUser(await service.getByEmail(email))
    }

    async getByUsername (username:string): Promise<IUser> {
        return toUser(await service.getByUsername(username))
    }

    async deleteById (id:number): Promise<Boolean> {
        return await service.deleteById(id)
    }
}

export default UserController