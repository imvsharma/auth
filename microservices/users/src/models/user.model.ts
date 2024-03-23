
import { IUser, UserInput } from './../interface/user.interface';
import { DataTypes, Model, Optional } from "sequelize";
import userConnection from "../helper/db";

class User extends Model<IUser, UserInput> implements IUser {
    public id!: number
    public username!: string
    public email!: string
    public password!: string

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    timestamps: true,
    sequelize: userConnection.sequelize,
    paranoid:true
})

export default User;
