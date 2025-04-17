import User from "../models/user.model.js";

export const saveUserToDb = async (user) => {
    try {
        const newUser = new User(user);
        return await newUser.save();
    } catch(err) {
        console.log(err);
        return null;
    }
}

export const findUserByKey = async (key, value) => {
    try {
        return await User.findOne({[key]:value})
    } catch(err) {
        console.log(err);
        return null;
    }
}