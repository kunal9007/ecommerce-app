'use strict';
//user login module

const userModel = require('../models/user_model');
const jwt = require('jsonwebtoken');

const signUp = async (req, res, next) => {
    try {
        const { name, mobileNumber, password, address } = req.body;

        const user = await userModel.findOne({ mobileNumber: mobileNumber });
        if (user) {
            return res.status(404).json({ message: 'User Already Created' });
        }

        const newUser = await new userModel({ name, mobileNumber, password, address });
        await newUser.save();

        //create jwt token
        const token = jwt.sign(
            { mobileNumber }, process.env.JWT_SECRET
        );
        await userModel.updateOne({ mobileNumber: mobileNumber }, { token: token })
        res.status(201).json({ message: 'User created successfully', token });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const signIn = async (req, res) => {
    try {
        const { mobileNumber, password } = req.body;
        const user = await userModel.findOne({ mobileNumber });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // user = await User.findOne({ mobileNumber, password });
        if (user.password != password) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign(
            { mobileNumber }, process.env.JWT_SECRET
        );
        await userModel.updateOne({ mobileNumber: mobileNumber }, { token: token })

        res.status(200).json({ user, token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    signUp,
    signIn
};