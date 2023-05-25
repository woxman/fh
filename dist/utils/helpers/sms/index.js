"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendCode = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../../config"));
const { smsApiKey } = config_1.default;
const sendCode = (phone, code) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //const message = `کد تایید شما: ${code}`
        //const url = `https://api.kavenegar.com/v1/${smsApiKey}/sms/send.json`
        /*const options = {
          params: {
            receptor: phone,
            message,
            sender: '2000044459563'
          }
        }*/
        const message = `${code}`;
        const url = `https://api.kavenegar.com/v1/${smsApiKey}/verify/lookup.json`;
        const options = {
            params: {
                receptor: phone,
                token: message
            }
        };
        yield axios_1.default.post(url, {}, options);
    }
    catch (error) {
        throw error;
    }
});
exports.sendCode = sendCode;
