const userModel = require('../schema/userSchema');
const bcrypt = require('bcrypt');

//delete user 
const deleteUser = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await userModel.deleteOne({ email });

        if (user.deletedCount === 0) {
            return res.status(404).json({ msg: "User not found or already deleted" });
        }

        res.json({ msg: "User Deleted Successfully", deletedUser: email });
    } catch (error) {
        res.status(500).json({ msg: `Failed: ${error.message}` });
    }
};


//edit name
const editName = async (req, res) => {
    try {
        const { email, newName } = req.body;
        if (!newName || !email) {
            res.json({ msg: "Please Provide data!" });
            return;
        }
        const user = await userModel.findOneAndUpdate({ email }, { $set: { name: newName } }, { new: true });

        res.json({ msg: "Name change Successful!", user });

    } catch (error) {
        res.status(404).json({ msg: `Failed ${error.message}` });
    }
}

//edit Email
const editEmail = async (req, res) => {
    try {
        const { email, newEmail } = req.body;
        if (!email || !newEmail) {
            res.json({ msg: "Please provide data!" });
            return;
        }
        const user = await userModel.findOneAndUpdate({ email }, { $set: { email: newEmail } }, { new: true });
        if (!user) {
            res.json({ msg: "User not found!" });
            return;
        }
        res.json({ msg: "Email changed Successful!", user });

    } catch (error) {
        res.status(404).json({ msg: `Failed ${error.message}` });
    }
}

const editPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        if (!email || !newPassword) {
            res.json({ msg: "Please Provide data!" });
            return;
        }
        const hashPassword = await bcrypt.hash(newPassword, 10);
        const user = await userModel.findOneAndUpdate({ email }, { $set: { hashPassword: hashPassword } });
        if (!user) {
            res.json({ msg: "User not found!" });
            return;
        }
        res.json({ msg: "Password changed successful!", user });

    } catch (error) {
        res.status(404).json({ msg: `Failed ${error.message}` });
    }
}

const addBooking = async (req, res) => {
    try {
        const { price, name, fromDate, toDate, city, email } = req.body;
        if (!name || !price || !fromDate || !toDate || !city || !email) {
            res.json({ msg: "Provide data" });
            return;
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            res.json({ msg: "User not registred" });
            return;
        }
        user.booking.push({ price, name, fromDate, toDate, city, email });
        await user.save();
        res.json({ msg: "Booking added successfully!" });
    } catch (error) {
        res.json({ msg: `Failed ${error.message}` })
    }
}

const getBookings = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            res.json({ msg: "User not found!" })
            return;
        }
        res.json({ booking: user.booking ,msg:"Successful!"})
    } catch (error) {
        res.json({ msg: `Failed ${error.message}` })
    }
}
module.exports = { deleteUser, editName, editEmail, editPassword, addBooking ,getBookings};


