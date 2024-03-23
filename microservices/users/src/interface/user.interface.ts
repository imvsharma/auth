import { Optional } from "sequelize";

export interface IUser {
    id: number;
    username: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface UserInput extends Optional<IUser, 'id'> {}

export interface UserOutput extends Required<IUser> {};