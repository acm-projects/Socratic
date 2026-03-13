// imports
const express = require("express");

const app = express();
app.use(express.json());

const PORT = 5000;


// ROUTES HERE
app.get("/", (req, res) => {
    res.send("Socratic API running");
});

app.get("/users", (req, res) => {
    res.send("Returning all users");
});

app.post("/users", (req, res) => {
    const newUser = req.body;

    res.json({
        message: "User created",
        user: newUser
    });
});


// SERVER STARTS HERE
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

