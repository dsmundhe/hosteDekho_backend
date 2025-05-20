const mongoose = require('mongoose');

const hostelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true,
    },
    college: {
        type: String,
        required: true
    },
    imageLink: {
        type: String,
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.booking.com%2Fhotel%2Fin%2Fganesha-bunk-beds-and-hostel-udaipur.html&psig=AOvVaw1oM9TUR-ZHcBzefQYDW4cH&ust=1747230304616000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJCj7a3KoI0DFQAAAAAdAAAAABAE",
    },
    contact: {
        type: String,
        required: true
    },
    price:{
        type:String,
        required:true
    }
}, {
    timestamps: true,
});

const hostelModel = mongoose.model('hostel', hostelSchema);
module.exports = { hostelModel };