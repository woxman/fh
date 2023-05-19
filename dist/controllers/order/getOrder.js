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
const order_service_1 = __importDefault(require("../../db/models/order/order.service"));
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const handle = () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const userId = (_a = res.locals.user) === null || _a === void 0 ? void 0 : _a._id;
        const { orderId } = req.params;
        if (userId) {
            return yield order_service_1.default.getOrder(orderId, userId);
        }
        else {
            return yield order_service_1.default.getOrder(orderId);
        }
    });
    const extractOutput = (outputs) => outputs;
    return (0, helper_1.handleRequest)({ req, res, handle, extractOutput });
});
exports.default = getOrder;
