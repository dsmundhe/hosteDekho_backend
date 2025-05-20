const { hostelModel } = require('../schema/hostelsSchema');


//register hostel
const registerHostel = async (req, res) => {

    try {
        const { name, city, college, imageLink, contact ,price} = req.body;
        if (!name || !city || !college || !contact || !price) {
            res.json({ msg: "Please Provide data!" });
            return;
        }
        const isPresent = await hostelModel.findOne({ name, city, contact });
        if (isPresent) {
            res.json({ msg: "Already present!" });
            return;
        }
        const hostel = new hostelModel({ name, city, college, imageLink, contact,price });
        hostel.save();
        res.json({ msg: "Hostel register successful!", hostel });

    } catch (error) {
        res.status(404).json({ msg: `Failed ${error.message}` });
    }
}

//get all hostels
const getData = async (req, res) => {
    try {
        const hostels = await hostelModel.find();
        res.json({ hostel: "Hostels List!", hostels });
    } catch (error) {
        res.json({ msg: `Failed! ${error.message}` });
    }
}

//search hostel by city
const hostelByCity = async (req, res) => {
    try {
        const { search } = req.params;
        const regex = new RegExp(search, 'i');
        let hostels = await hostelModel.find({ city: regex });
        if (hostels.length == 0) {
            hostels = await hostelModel.find({ name: regex });

            if (hostels.length == 0) {
                hostels = hostels = await hostelModel.find({ college: regex });
            }

            if (hostels.length == 0) {
                res.json({ msg: "Not available!" })
                return;
            }
            
        }
        res.json({ msg: "Hostels list", hostels });

    } catch (error) {
        res.json({ msg: `Failed ${error.message}` });
    }
}

module.exports = { getData, registerHostel, hostelByCity };