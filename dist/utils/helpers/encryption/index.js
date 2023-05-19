"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const config_1 = __importDefault(require("../../config"));
const encrypt = (password) => {
    const ciphertext = crypto_js_1.default.AES.encrypt(password, config_1.default.passwordEncryptionKey).toString();
    return ciphertext;
};
exports.encrypt = encrypt;
const decrypt = (ciphertext) => {
    var bytes = crypto_js_1.default.AES.decrypt(ciphertext, config_1.default.passwordEncryptionKey);
    var password = bytes.toString(crypto_js_1.default.enc.Utf8);
    return password;
};
exports.decrypt = decrypt;
