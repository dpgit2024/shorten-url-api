import { model, Schema} from "mongoose"

const userSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        index: true
    },
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
        index: true
    },
    password: String,
    lastLoginAt: Date
}, {timestamps: true})

export const UserModel = model('users', userSchema)
