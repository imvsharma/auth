import { IUser, UserOutput } from './../../interface/user.interface';

const toUser = (user:UserOutput): IUser => {
    const {id, username, email, password, createdAt, updatedAt, deletedAt} = user
    return {
        id,
        username,
        email,
        password,
        createdAt,
        updatedAt,
        deletedAt
    }
}

export default toUser