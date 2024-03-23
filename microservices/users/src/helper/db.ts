import { Sequelize } from "sequelize";
import { config, dailect } from "../config/db.config";

class UserConnection {
    public sequelize!: Sequelize;

    constructor() {
        this.connectToDB()
    }

    private async connectToDB() {
        this.sequelize = new Sequelize({
            database: config.DB,
            username: config.USER,
            password: config.PASSWORD,
            host: config.HOST,
            dialect: dailect,
            pool: config.pool
        })

        try{
            await this.sequelize.authenticate();
            console.log("Connection has been established successfully");
        } catch (error) {
            console.error("Unable to connect to the database", error)
        }
    }


}

const userConnection = new UserConnection()

export default userConnection