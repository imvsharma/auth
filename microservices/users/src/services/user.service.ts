import { UserInput, UserOutput } from './../interface/user.interface';
import * as userDal from '../db/dal/user';

export const create = (payload: UserInput): Promise<UserOutput> => {
    return userDal.create(payload);
}

export const update = (id:number, payload: Partial<UserInput>): Promise<UserOutput> => {
    return userDal.update(id, payload);
}

export const getById = (id: number): Promise<UserOutput> => {
    return userDal.getById(id);
}

export const getByUsername = (username: string): Promise<UserOutput> => {
    return userDal.getByUsername(username);
}

export const getByEmail =(email: string): Promise<UserOutput> => {
    return userDal.getByEmail(email);
}

export const deleteById = (id: number): Promise<boolean> => {
    return userDal.deleteById(id)
}

export const getAll = (): Promise<UserOutput[]> => {
    return userDal.getAllUsers()
}