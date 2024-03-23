import User from "../models/user.model";

const dbInit = () => {
    User.sync()
}

export default dbInit