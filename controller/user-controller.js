const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../model/user');
const { validationResult } = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();

// Sign up controller
exports.postSignUp = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.json({
                msg: 'You already have an account. Please log in and try again.',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            password: hashedPassword,
            email,
        });

        newUser.role = email === process.env.ADMIN_EMAIL && username === process.env.ADMIN_USERNAME
            ? 'Admin'
            : 'User';

        await newUser.save();

        const token = jwt.sign(
            {
                email: newUser.email,
                userId: newUser._id,
                role: newUser.role,
            },
            process.env.JWT_SECRET
        );

        return res.status(201).json({
            token,
            userId: newUser._id,
            msg: `You are now ${newUser.role}`,
        });
    } catch (err) {
        return res.json({ msg: `An error occurred: ${err}` });
    }
};

// Log in controller
exports.postLogIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ msg: 'Your email or password is wrong. Please try again.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            const token = jwt.sign(
                {
                    email: user.email,
                    userId: user._id,
                    username: user.username,
                    role: user.role,
                },
                process.env.JWT_SECRET
            );
            return res.status(201).json({ token, msg: 'Login successful' });
        } else {
            return res.json('The email or password is not valid. Please try again.');
        }
    } catch (err) {
        return res.json({ msg: `An error occurred: ${err}` });
    }
};




