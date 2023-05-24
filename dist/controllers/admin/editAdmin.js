"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const yup = __importStar(require("yup"));
const helper_1 = require("../helper");
const admin_service_1 = __importDefault(require("../../db/models/admin/admin.service"));
const constants_1 = require("../../utils/constants");
const editAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validationSchema = yup.object().shape({
        updates: yup.object({
            isSuperAdmin: yup.boolean(),
            email: yup.string().email(),
            password: yup.string(),
            phone: yup.string(),
            code: yup.string(),
            name: yup.string(),
            permissions: yup.array().of(yup.string().oneOf(constants_1.permissions))
        })
    });
    const handle = () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const currentAdminIsGodAdmin = (_a = res.locals.admin) === null || _a === void 0 ? void 0 : _a.isGodAdmin;
        const { adminId } = req.params;
        const allowedUpdates = ["isSuperAdmin", "email", "phone", "code", "name", "permissions"];
        const adminUpdates = {};
        Object.keys(req.body.updates || {}).forEach((update) => {
            if (allowedUpdates.includes(update)) {
                if (["name", "phone", "email", "code"].includes(update)) {
                    adminUpdates[update] = req.body.updates[update].trim();
                }
                else {
                    adminUpdates[update] = req.body.updates[update];
                }
            }
        });
        return yield admin_service_1.default.editAdmin(adminId, adminUpdates, currentAdminIsGodAdmin);
    });
    const extractOutput = (outputs) => outputs;
    return (0, helper_1.handleRequest)({ req, res, validationSchema, handle, extractOutput });
});
exports.default = editAdmin;
