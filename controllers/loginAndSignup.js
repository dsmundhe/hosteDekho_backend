const userModel = require('../schema/userSchema');
const bcrypt = require('bcrypt');
const generateToken = require('../config/Authentication/tokenGen')

const signUp = async (req, res) => {
    try {
        const { name, email, password, userType, image } = req.body;
        if (!name || !email || !password || !userType || !image) {
            res.json({ msg: "Please Provide user Data!" })
            return;
        }
        const isUserExist = await userModel.findOne({ email });
        if (isUserExist) {
            res.json({ msg: "User Already exist!" })
            return;
        }

        const saltLen = 10;
        const hashPassword = await bcrypt.hash(password, saltLen);
        await userModel.create({ name, email, hashPassword, userType, image });
        res.json({ msg: "Signup successful!", data: { name, email, image } });

    } catch (error) {
        res.json({ result: false, msg: error.message })
    }
}

const loginFun = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.json({ msg: "Please provide login details!" });
            return;
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            res.json({ msg: "Invalid email or password!" });
            return;
        }
        const isPasswordMatch = await bcrypt.compare(password, user.hashPassword);
        if (!isPasswordMatch) {
            res.json({ msg: "Invalid email or password!" });
            return;
        }

        const token = await generateToken(email);
        res.json({ msg: "Login Successful", token: token, user });


    } catch (error) {
        res.status(404).json({ msg: `Login Failed ${error.message}` })
    }
}

module.exports = { signUp, loginFun };