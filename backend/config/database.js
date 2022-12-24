const mongoose = require("mongoose");

const connectDatabase = () => {
    mongoose.connect(
        process.env.MONGODB_URL, 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    ).then((conn) => {
        console.log("Successfully connected to DB");
    }).catch((error) => {
        console.log("Failed to connect to the DB\n\n", error, error.message);
        process.exit(1);
    })
};

module.exports = connectDatabase;