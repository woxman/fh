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
const helper_1 = require("../helper");
const admin_service_1 = __importDefault(require("../../db/models/admin/admin.service"));
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const handle = () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
        let ip = 'unknown';
        if (req.ips.length) {
            ip = req.ips[0];
        }
        const reportDetails = {
            adminId: res.locals.admin._id,
            ip
        };
        return yield admin_service_1.default.logout(token, reportDetails);
    });
    return (0, helper_1.handleRequest)({ req, res, handle });
});
exports.default = logout;
