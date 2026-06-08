const users = require('../models/userModel')

//login user
exports.loginController = async (req, res) => {
    console.log("Inside loginController");
    const { email, password } = req.body
    console.log(email, password);
    try {
        const existingUser = await users.findOne({ email }).select("+password")
        if (existingUser) {
            if (existingUser.password === password) {
                res.status(200).json(existingUser)
            } else {
                res.status(401).json("Incorrect Password")
            }
        } else {
            res.status(404).json("User Not Found")
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}
//add user
exports.registerController = async (req, res) => {
    console.log("Inside registerController");
    const { username, email, password, role, providerDetails } = req.body
    console.log(username, email, password, role, providerDetails);
    try {
        //check mail in model
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(409).json("User Already exist!!! Please Login...")
        } else {
            const newUser = new users({
                username, email, password, role, providerDetails
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}
//get user
exports.getUserController = async (req, res) => {
    console.log("inside getUserController");
    try {
        const user = await users.find()
        res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}
//view user
//edit user
//delete user