import dotenv from "dotenv";
dotenv.config();
const database: string = process.env.DATABASE as string;
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

interface IUser {
    username: string;
    password: string;
    email?: string;
    name?: string;
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: false,
    } 
}); const User = mongoose.model<IUser>("Users", userSchema);

export async function connectToDatabase(): Promise<void> {
    if (!database) throw new Error(`Database doesn't exists.`);
    await mongoose.connect(database, {
        serverSelectionTimeoutMS: 5000
    });
    console.log("Connected...");
}

export async function findUsers(): Promise<any> {
    const users = await User.find();
    console.log(users);
    return users;
}

export async function findUser(username: string): Promise<any> {
    const user = await User.findOne({ username: username });
    return user;
}

export async function addUser(username: string, password: string, email?: string, name?: string): Promise<void> {
    const existingUser = await User.findOne({ username: username });
    if (existingUser) throw new Error(`User already exists.`);
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await new User({
        username: username,
        password: hashedPassword,
        email: email,
        name: name
    }).save();
    console.log("User created successfully.");
}

export async function updateUser(username: string, newData: object): Promise<void> {
    const result = await User.findOneAndUpdate(
        { username: username },
        newData,
        { new: true }
    );
    if (result) {
        console.log("Updated user:", result);
    } else {
        throw new Error(`User not found.`);
    }
}

export async function deleteUser(username: string): Promise<void> {
    const result = await User.findOneAndDelete({ username: username });
    if (result) {
        console.log("Deleted user:", result);
    } else {
        throw new Error(`User not found.`);
    }
}

// async function login(username: string | null = null, password: string, email: string | null = null): Promise<void> {
//     if(!username && !email) return;
//     const query = username ? { username } : { email };
//     const user = await User.findOne(query);
//         if (!user) return console.log("User doesn't exists.");
//         if (user.password === password) return console.log("LogIn successful.");
//         return console.log("Incorrect password.");
// }