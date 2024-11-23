const mongoClient = require("mongodb").MongoClient;
require("dotenv").config();

let db;

const initDb = (callback) => {
    if (db) {
        console.log("Database is already initialized");
        return callback(null, db);
    }
    mongoClient.connect(process.env.CONNECTION_STRING).then(
        (client) => {
            db = client;
            callback(null, db);
        }
    ).catch(
        (error) => {
            callback(error);
        }
    );
}


const getDb = () => {
    if (!db) {
        throw Error("Database not initialized");
    }
    return db;
}

module.exports = { initDb, getDb };
