"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    port: process.env.PORT,
    dbUrl: process.env.DB_URL || "mongodb://acoexper_amaday:44556970@acoexperts.com:27017/acoexper_amday",
    jwtSecret: process.env.JWT_SECRET || 'somesecret',
    passwordEncryptionKey: process.env.PASSWORD_ENCRYPTION_KEY || "somesecret",
    backendUrl: process.env.BACKEND_URL || "http://localhost:3001",
    smsApiKey: process.env.SMS_API_KEY || "43333348596938714E6278746357625879664F74682B4C794A754132554430686E34366B414473377937773D"
};
exports.default = config;
