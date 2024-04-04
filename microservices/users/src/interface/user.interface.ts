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

export interface IUserNotFound {
    success: boolean;
    message: string;
}

export interface IUserFound {
    success: boolean;
    message: string;
}

export interface UserInput extends Optional<IUser, 'id'> {}

export interface UserOutput extends Required<IUser> {};

export interface UserNotFoundOutput extends Required<IUserNotFound> {};

export interface UserFoundOutput extends Required<IUserFound> {};