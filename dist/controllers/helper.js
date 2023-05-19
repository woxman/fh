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
exports.handleRequest = void 0;
const constants_1 = require("../utils/constants");
function handleRequest({ req, res, validationSchema, handle, extractOutput, queryValidationSchema }) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        if (validationSchema) {
            try {
                validationSchema.validateSync(req.body);
            }
            catch (error) {
                res.status(constants_1.statusCodes.ue).send({ message: error.message });
                return;
            }
        }
        if (queryValidationSchema) {
            try {
                queryValidationSchema.validateSync(req.query);
            }
            catch (error) {
                res.status(constants_1.statusCodes.ue).send({ message: error.message });
                return;
            }
        }
        try {
            const result = yield handle();
            if (!result.success) {
                res.status(((_a = result.error) === null || _a === void 0 ? void 0 : _a.statusCode) || constants_1.statusCodes.ise).send({ message: (_b = result.error) === null || _b === void 0 ? void 0 : _b.message });
                return;
            }
            else {
                if (extractOutput && result.outputs) {
                    res.status(constants_1.statusCodes.ok).send(extractOutput(result.outputs));
                }
                else {
                    res.sendStatus(constants_1.statusCodes.ok);
                }
            }
        }
        catch (error) {
            console.error('Error in handling controller: ', error);
            res.sendStatus(constants_1.statusCodes.ise);
            return;
        }
    });
}
exports.handleRequest = handleRequest;
