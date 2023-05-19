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
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../utils/constants");
const access = (permissions) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const admin = res.locals.admin;
            console.log(admin);
            const hasAccess = admin.isGodAdmin || permissions.every((permission) => {
                return admin.permissions.includes(permission);
            });
            if (!hasAccess) {
                res.status(constants_1.statusCodes.unauthorized).send({ message: constants_1.errorMessages.shared.permissionsRequired });
                return;
            }
            next();
        }
        catch (error) {
            res.status(constants_1.statusCodes.ise).send({ message: constants_1.errorMessages.shared.ise });
        }
    });
};
exports.default = access;
