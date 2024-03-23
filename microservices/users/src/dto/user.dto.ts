import { Optional } from 'sequelize';

export interface CreateUserDTO {
    username: string;
    email: string;
    password: string;
}

export interface UpdateUserDTO extends Optional<CreateUserDTO, 'username' | 'email' | 'password'>{}