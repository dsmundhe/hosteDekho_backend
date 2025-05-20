const express = require('express');
const router = express.Router();

const { verifyToken } = require('../config/Authentication/varifyToken');

const { signUp, loginFun } = require('../controllers/loginAndSignup');

const { deleteUser, editName, editEmail, editPassword,addBooking ,getBookings} = require('../controllers/editUserDetails');

//login signup
router.post('/signup', signUp);
router.post('/login', loginFun);


//edit user details
router.delete('/delete', verifyToken, deleteUser);
router.patch('/editname', verifyToken, editName);
router.patch('/editemail', verifyToken, editEmail);
router.patch('/editpassword', verifyToken, editPassword);
router.post('/booking',verifyToken,addBooking);
router.post('/getbooking', verifyToken, getBookings);




module.exports = router;



