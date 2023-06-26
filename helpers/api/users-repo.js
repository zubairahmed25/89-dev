
import bcrypt from 'bcryptjs';
import { db } from './../api/db';

const User = db.User;

export const usersRepo = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};


async function getAll() {
    return await User.find();
}

async function getById(id) {
    return await User.findById(id);
}

async function create(params) {
    console.log("params", JSON.parse(params));
    // validate
    if (await User.findOne({ username: params.username })) {
        throw 'Username "' + params.username + '" is already taken';
    }

    const user = new User(JSON.parse(params));

    // hash password
    if (JSON.parse(params).password) {
        console.log("password hashed")
        user.hash = bcrypt.hashSync(JSON.parse(params).password, 10);
    }

    // save user
    await user.save();
}

async function update(id, params) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== params.username && await User.findOne({ username: params.username })) {
        throw 'Username "' + params.username + '" is already taken';
    }

    // hash password if it was entered
    if (params.password) {
        
        params.hash = bcrypt.hashSync(params.password, 10);
    }

    // copy params properties to user
    Object.assign(user, params);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}
