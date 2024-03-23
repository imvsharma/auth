import { UserInput, UserOutput } from './../../interface/user.interface';
import User from "../../models/user.model";


export const create = async (payload: UserInput): Promise<UserOutput> => {
    try{
        const user = await User.create(payload)
        return user;
    } catch(err) {
        console.log("Throwing error in create user")
        console.log(err)
        throw new Error(String(err))
    }
    
}

export const getById = async (id: number): Promise<UserOutput> => {
    const user = await User.findByPk(id)
    if(!user){
        throw new Error("User not found")
    }

    return user
}

export const getByEmail = async (email: string): Promise<UserOutput> => {
    const user = await User.findOne({where: {email}});
    if(!user){
        throw new Error("User not found")
    }

    return user
}

export const getByUsername = async (username: string): Promise<UserOutput> => {
    const user = await User.findOne({where: {username}});
    if(!user){
        throw new Error("User not found")
    }

    return user
}

export const update = async (id: number, payload: Partial<UserInput>): Promise<UserOutput> => {
    const user = await User.findByPk(id)
    if (!user) {
        throw new Error("User not found")
    }
    const updatedUser = await (user as User).update(payload);
    return updatedUser
}

export const deleteById = async (id: number): Promise<boolean> => {
    const deleteUserCount = await User.destroy({
        where: {id}
    })

    return !!deleteUserCount
}

export const getAllUsers = async (): Promise<UserOutput[]> => {
    return User.findAll()
}