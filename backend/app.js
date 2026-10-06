import express, { json } from "express";

const app = express();

app.use(json());

const users = [];

app.get("/", (req, res) => {
    res.send("Server is running. Here");
});

app.post("/register", (req, res) => {
    console.log(`Regiuster Is Running`)
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        return res.status(409).json({
            message: "User already exists"
        });
    }

    const user = {
        id: users.length + 1,
        name,
        email,
        password
    };

    users.push(user);

    res.status(201).json({
        message: "User registered",
        user
    });
});

app.get("/users", (req, res) => {
    res.json(users);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});