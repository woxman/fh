"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.Promise = global.Promise;
const config_1 = __importDefault(require("../utils/config"));
mongoose_1.default.connect(config_1.default.dbUrl);
const db = mongoose_1.default.connection;
db.on('error', error => {
    console.log(`There was an error connecting to the database: ${error}`);
});
db.once('open', () => {
    console.log(`You have successfully connected to your mongo database: ${config_1.default.dbUrl}`);
});
// When the connection is disconnected
db.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});
// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function () {
    mongoose_1.default.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});
exports.default = db;
