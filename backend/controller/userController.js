const User = require("../models/User");
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
require('dotenv').config();


const createToken = (user) => {
    return jwt.sign({
        userId: user.id,
        isAdmin: user.isAdmin
    }, process.env.SECRET, {
        expiresIn: '2d'
    });
}

module.exports.regiserValidations = [
    body('name').not().isEmpty().withMessage('Name is reqired'),
    body('email').not().isEmpty().withMessage('Email is required'),
    body('phone').not().isEmpty().withMessage('Phone number is required'),
    body('phone').isLength({ min: 10 }).withMessage('Phone number is not valid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be 6 character long')
];
module.exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { name, email, password, phone } = req.body;
    try {
        const checkUser = await User.findOne({ email })
        if (checkUser) {
            return res.status(400).json({ errors: [{ msg: "Email is already exit" }] })
        }
        //hash passowrd 
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        try {
            const user = await User.create({
                name,
                email,
                phone,
                password: hash,
            });
            const token = createToken(user);
            return res.status(200)
                .json({ msg: 'Your account has been created', token })
        } catch (error) {
            return res.status(500).json({ errors: error })
        }

    } catch (error) {
        return res.status(500).json({ errors: error })
    }
};

module.exports.loginValidations = [
    body('email').not().isEmpty().withMessage('Email is required'),
    body('password').not().isEmpty().withMessage('Password is required')
];
module.exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email })
        if (user) {
            const matched = await bcrypt.compare(password, user.password)
            if (matched) {
                const token = createToken(user);
                return res.json({ msg: 'Successfully login', token })
            } else {
                return res.status(401).json({ errors: [{ msg: 'Passowrd is incorrect' }] })
            }
        }
        else {
            return res.status(404).json({ errors: [{ msg: 'User does not exit with that email' }] })
        }
    }
    catch (error) {
        return res.status(500).json({ errors: error })
    }
}
exports.list = async (req, res) => {
    try {
        const response = await User.find().sort({ updatedAt: -1 }).select('-passwordHash');
        return res.status(200).json({ response: response })
    } catch (error) {
        console.log(error)
        res.status(500).json({ errors: error, msg: error.message })
    }
}

exports.read = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await User.findOne({ _id: id }).select('-passwordHash');
        return res.status(200).json(response);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error, msg: error.message })
    }
}

