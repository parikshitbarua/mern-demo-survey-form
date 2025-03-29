import mongodb from "mongodb";

const MongoClient = mongodb.MongoClient;

let _db;

const initDb = async () => {
    if (_db) {
        console.log("Db is already initialized!");
        return _db;
    }
    try {
        _db = await MongoClient.connect('mongodb://127.0.0.1:27017/survey?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.4.2');
        return _db;
    } catch (err) {
        console.log("Error connecting with DB", err);
        return null;
    }
}

const getDb = () => {
    if (!_db) {
        throw new Error("Db connection not established!");
    } else {
        return _db;
    }
}

export {
    initDb,
    getDb as default
}