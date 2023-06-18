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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const admin_1 = __importDefault(require("../db/models/admin/admin"));
const user_1 = __importDefault(require("../db/models/user/user"));
const constants_1 = require("../utils/constants");
const config_1 = __importDefault(require("../utils/config"));
const auth = (role) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
        try {
            const decodedToken = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
            if (decodedToken.role !== role) {
                return res.status(constants_1.statusCodes.unauthorized).send({ message: constants_1.errorMessages.shared.unauthorized });
            }
            if (decodedToken.role === "user") {
                const user = yield user_1.default.findOne({ _id: decodedToken.id, tokens: token }).exec();
                if (!user) {
                    return res.status(constants_1.statusCodes.unauthorized).send({ message: constants_1.errorMessages.shared.unauthorized });
                }
                res.locals.user = {
                    _id: user._id
                };
            }
            else if (decodedToken.role === "admin") {
                const admin = yield admin_1.default.findOne({ _id: decodedToken.id, tokens: token }).exec();
                if (!admin) {
                    return res.status(constants_1.statusCodes.unauthorized).send({ message: constants_1.errorMessages.shared.unauthorized });
                }
                res.locals.admin = {
                    _id: admin._id,
                    isGodAdmin: admin.isGodAdmin,
                    code: admin.code,
                    permissions: admin.permissions
                };
            }
            next();
        }
        catch (error) {
            console.log('Error while verifying token: ', error);
            // delete expired token
            if (error.name === "TokenExpiredError") {
                console.log('Deleting expired token');
                yield admin_1.default.findOneAndUpdate({ tokens: token }, { $pull: { tokens: token } }).exec();
                yield user_1.default.findOneAndUpdate({ tokens: token }, { $pull: { tokens: token } }).exec();
            }
            res.status(constants_1.statusCodes.unauthorized).send({ message: constants_1.errorMessages.shared.unauthorized });
        }
    });
};
// const auth = 
exports.default = auth;
