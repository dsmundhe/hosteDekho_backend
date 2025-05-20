const express = require('express');
const router = express.Router();

const { verifyToken } = require('../config/Authentication/varifyToken');
const { getData, registerHostel, hostelByCity } = require('../controllers/hostelControllers');


//getData
router.get('/hostelsList', getData);

//search by city name
router.get('/hostelbycity/:search', hostelByCity);

//register hostel
router.post('/register', verifyToken, registerHostel);

module.exports = router;