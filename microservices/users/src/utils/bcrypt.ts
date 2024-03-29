import { hash, compare } from 'bcryptjs';

const passwordEncryption = {
    hashedPassword : async (password: string): Promise<string> => {
        const saltRound = 10;
        const hashPassword =  await hash(password, saltRound)
        return hashPassword
    },

    comparePasssword: async(password: string, hashPassword: string): Promise<boolean> => {
        return await compare(password, hashPassword)
     }
}

export default passwordEncryption
