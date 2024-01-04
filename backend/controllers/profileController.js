const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const createProfile = expressAsyncHandler(async (req, res) => {
    console.log("add user request recieved")
    const { username, email } = req.body    

    if (!username || !email) return res.status(400).json({message: "Please input your name and email"});

    const duplicate = await User.findOne({username});

    if (duplicate) return res.status(409).json({message: "Name already exit, use another name"})

    const user = await User.create({username, email});

    if (user) {
        res.status(201).json({user});
    } else {
        res.status(500).json({message: "Internal server error"})
    }
})

const updateProfile = expressAsyncHandler(async (req, res) => {
    const { _id } = req.params

    if (!_id) return res.status(400).json({message: "Invalid ID"});

    const updatedUser = await User.findByIdAndUpdate(_id, req.body, {new: true});

    if (updatedUser) {
        res.status(201).json({message: "A user updated their profile", updatedUser})
    } else {
        res.status(500).json({message: "Server side error"})
    }
})

module.exports = { createProfile, updateProfile }