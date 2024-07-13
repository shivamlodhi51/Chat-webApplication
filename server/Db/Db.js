const mongoose = require('mongoose');

const ConnectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL, {
           
        });

        console.log(`connected to mongoDB database`);
    } catch (error) {
        console.log(` NOT connected to mongoDB database`, error);
    }
};
module.exports = ConnectDB;