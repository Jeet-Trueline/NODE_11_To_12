const mongoose = require('mongoose');

mongoose.set("strictQuery", false);

const db = mongoose.connect('mongodb://127.0.0.1:27017/Ujas', (err) => {
    if (err) {
        console.log("Database not connected...");

    } else {
        console.log("Database connected...");
    }
});

module.exports = { db } 