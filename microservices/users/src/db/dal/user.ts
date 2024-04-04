import { UserFoundOutput, UserInput, UserNotFoundOutput, UserOutput } from './../../interface/user.interface';
import User from "../../models/user.model";
import { Op } from 'sequelize';


class UserAccessLayer {
    constructor() {

    }

    public async create (payload: UserInput): Promise<UserOutput| UserFoundOutput > {
        const fetchedUser = await User.findOne({
            where: {
                [Op.or]: [
                    {
                        username: {
                            [Op.eq]: payload.username
                        }
                    },
                    {
                        email: {
                            [Op.eq]: payload.email
                        }
                    }
                ]
            }
        })

        
        if(!fetchedUser) {
            const user = await User.create(payload);
            return user;
            
        }

        return {
            success: false,
            message: "User already registered"
        }
        
    }

    public async getAll (): Promise<UserOutput[]> {
        return await User.findAll()
    }

    public async getById (id: number): Promise<UserOutput | null> {
        return await User.findByPk(id)
    }


    public async getByEmail (email: string): Promise<UserOutput | null> {
        return await User.findOne({where: {email}});
    }

    public async getByUsername (username: string): Promise<UserOutput | null> {
        return await User.findOne({where: {username}});
    }

    public async update (id: number, payload: Partial<UserInput>): Promise<UserOutput | null> {
        const user = await User.findByPk(id)
        if (!user) return null;
        return await (user as User).update(payload);   
    }

    public async deleteById (id: number): Promise<boolean | null> {
        const user = await User.findByPk(id)
        if (!user) return null;
        
        const deleteUserCount = await User.destroy({where: {id}})
        return !!deleteUserCount
    }

    
}

export default UserAccessLayer;