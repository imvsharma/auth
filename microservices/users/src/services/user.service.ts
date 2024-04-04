
import { UserFoundOutput, UserInput, UserNotFoundOutput, UserOutput } from './../interface/user.interface';
import UserAccessLayer, * as userDal from '../db/dal/user';


class UserService {
    private userAccessLayer!: UserAccessLayer;

    constructor () {
        this.userAccessLayer = new UserAccessLayer();
    }

    public async create (payload: UserInput): Promise<UserOutput | UserFoundOutput> {
        return await this.userAccessLayer.create(payload)
    }

    public async getAll (): Promise<UserOutput[]>{
        return await this.userAccessLayer.getAll()
    }

    public async getById (id: number): Promise<UserOutput | null> {
        return this.userAccessLayer.getById(id);
    }

    public async getByUsername (username:string): Promise<UserOutput | null>{
        return await this.userAccessLayer.getByUsername(username)
    }

    public async getByEmail (email: string): Promise<UserOutput | null> {
        return this.userAccessLayer.getByEmail(email);
    }

    public async update (id: number, payload: Partial<UserInput>): Promise<UserOutput | null>{
        return await this.userAccessLayer.update(id, payload)
    }

    public async deleteById (id: number): Promise<boolean | null> {
        return this.userAccessLayer.deleteById(id);
    }
}

export default UserService;

// export const create = (payload: UserInput): Promise<UserOutput> => {
//     return userDal.create(payload);
// }

// export const update = (id:number, payload: Partial<UserInput>): Promise<UserOutput> => {
//     return userDal.update(id, payload);
// }

// export const getById = (id: number): Promise<UserOutput> => {
//     return userDal.getById(id);
// }

// export const getByUsername = async (username: string): Promise<UserOutput | UserNotFoundOutput> => {
//     try{
//         const userDetails = await userDal.getByUsername(username);
//         console.log(userDetails)
//         return userDetails
//     } catch (error:any) {
//         console.log("Error")
//         console.log(error?.message)
//         throw new Error ("User not found")
//     }
        
// }

// export const getByEmail =(email: string): Promise<UserOutput> => {
//     return userDal.getByEmail(email);
// }

// export const deleteById = (id: number): Promise<boolean> => {
//     return userDal.deleteById(id)
// }

// export const getAll = (): Promise<UserOutput[]> => {
//     return userDal.getAllUsers()
// }