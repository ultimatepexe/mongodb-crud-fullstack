import { connectToDatabase, findUsers, findUser, addUser, updateUser, deleteUser } from "./crud.ts";

import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from 'url';
import dotenv from "dotenv";

dotenv.config();

const PORT: number = Number(process.env.PORT) || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req: express.Request, res: express.Response): void => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/add", async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const data = req.body.data;
        await addUser(data.username, data.password, data.email, data.name);
        res.status(200).json({ message: "User added successfully" });
    } catch (error) {
        console.error(`Error adding user: ${error}`);
        res.status(500).json({ message: `Error adding user: ${error.message}` });
    }
});

app.post("/edit", async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const user: string = req.body.username;
        const newData: object = req.body.newData;
        await updateUser(user, newData);
        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        console.error(`Error updating user: ${error.message}`);
        res.status(500).json({ message: `Error updating user: ${error.message}`} );
    }
});

app.post("/delete", async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const user: string = req.body.user;
        await deleteUser(user);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(`Error deleting user: ${error.message}`);
        res.status(500).json({ message: `Error deleting user: ${error.message}` } );
    }
});

app.post("/find", async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const username: string = req.body.username;
        const user = await findUser(username);
        res.status(200).json({ message: user });
    } catch (error) {
        console.error(`Error finding user: ${error.message}`);
        res.status(500).json({ message: `Error finding user: ${error.message}` });
    }
});

app.post("/users", async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const users = await findUsers();
        res.status(200).json({ message: users });
        console.log(users);
    } catch (error) {
        console.error(`Error finding users: ${error.message}`);
        res.status(500).json({ message: `Error finding users: ${error.message}` });
    }
});

app.listen(PORT, async (): Promise<void> => {
    await connectToDatabase();
    console.log(`Running at ${PORT}`);
});