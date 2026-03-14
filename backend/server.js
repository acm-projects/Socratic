// imports
const express = require("express");

const app = express();
app.use(express.json());

const PORT = 5000;

//-----------------------------------------------------------------------API ROUTES FOR USERS

// GET all users
app.get("/users", (req, res) => {
    res.send("Returning all users");
});

// GET single user
app.get("/users/:id", (req, res) => {
    const id = req.params.id;

    res.json({
        message: "Returning user",
        userId: id
    });
});

// CREATE user
app.post("/users", (req, res) => {
    const newUser = req.body;

    res.json({
        message: "User created",
        user: newUser
    });
});

// UPDATE user
app.put("/users/:id", (req, res) => {
    const id = req.params.id;

    res.json({
        message: "User updated",
        userId: id,
        data: req.body
    });
});

// DELETE user
app.delete("/users/:id", (req, res) => {
    res.json({
        message: "User deleted",
        id: req.params.id
    });
});

//-----------------------------------------------------------API Routes for classes

//get all classes
app.get("/classes", (req, res) => {
    res.send("Returning all classes");
});

//get one class
app.get("/classes/:code", (req, res) => {
    res.json({
        message: "Returning class",
        classCode: req.params.code
    });
});

//create class
app.post("/classes", (req,res) => {
    res.json({
        message: "Class created",
        data: req.body
    });
});

//--------------------------------------------------------------------------Topics API

// GET topic for class
app.get("/classes/:code/topics", (req,res) => {
    res.json({
        message: "Returning topics",
        classCode: req.params.code
    });
});

//get topic
app.get("/topics/:id" , (req,res) => {
    res.json({
        message: "Returning topic" ,
        topicID: req.params.id
    });
});

//create topic
app.post("/topics", (req,res) => {
    res.json({
        message: "Topic created",
        topic: req.body
    });
});

//-----------------------------------------------------------------------------Apis for chat session

//Get user chat sessions
app.get("/users/:id/sessions", (req,res) => {
    res.json({
        message: "Returning chat sessions",
        userID: req.params.id
    });
});

//Start chat session
app.post("/sessions", (req,res) => {
    res.json ({
        message: "Chat session started",
        session: req.body
    });
});

//GET session
app.get("/sessions/:id", (req,res) => {
    res.json({
        message:"Returning session",
        sessionID: req.params.id
    });
});

app.post("/sessions/complete", (req,res) => {
    const { user_id, topic_id, correct, attempted } = req.body
    res.json({
        message: "Session completed",
        user_id,
        topic_id,
        correct,
        attempted
    });
});

//--------------------------------------------------------------------------------Achievements APIS

//Get achievements 
app.get("/achievements", (req,res) => {
    res.json ({
        message: "Returing user achievements",
        userID: req.params.id
    });
});

//Get user achievements
app.get("/users/:id/achievements", (req, res) => {
    res.json ({
        message: "Returning user achievements",
        userID: req.params.id
    });
});

// -----------------------------------------------------------------------------------XP / METRICS ROUTE 

// get user stats
app.get("/users/:id/stats", (req,res) => {
    res.json ({
        message: "Returning user stats",
        userID: req.params.id
    });
});

//GET topic metrics
app.get("/topics/:id/metrics", (req,res) => {
    res.json({
        message: "Returning topic metrics",
        topicID: req.params.id
    });
});

//----------------------------------------------------------- API Routes for OAuth Accounts

// Get all OAuth accounts for a user
app.get("/users/:id/accounts", (req, res) => {
    res.json({
        message: "Returning OAuth accounts for user",
        userId: req.params.id
    });
});

// Link OAuth account to user
app.post("/accounts", (req, res) => {
    const account = req.body;

    res.json({
        message: "OAuth account linked",
        account
    });
});

// Get single OAuth account
app.get("/accounts/:id", (req, res) => {
    res.json({
        message: "Returning OAuth account",
        accountId: req.params.id
    });
});

// Remove OAuth account
app.delete("/accounts/:id", (req, res) => {
    res.json({
        message: "OAuth account removed",
        accountId: req.params.id
    });
});


// SERVER STARTS HERE
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

