const mongoose=require('mongoose');
const DB_URI=process.env.MONODB_URI;


/**
 * The function `dbConnection` uses async/await to connect to a database using mongoose and logs a
 * success message if the connection is successful, or an error message if the connection fails.
 */

const dbConnection =async ()=>{
        try {
            await mongoose.connect(DB_URI);
            console.log("DB connected Successful!");
        } catch (error) {
            console.log("Failed to Connect DB " +error.message);
        }
}

module.exports={dbConnection};