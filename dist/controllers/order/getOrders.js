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
const order_service_1 = __importDefault(require("../../db/models/order/order.service"));
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const queryValidationSchema = yup.object().shape({
        limit: yup.string(),
        skip: yup.string(),
        sortBy: yup.string().oneOf(['name', 'unit', 'price', 'createdAt', 'updatedAt']),
        sortOrder: yup.string().oneOf(['asc', 'desc'])
    });
    const handle = () => __awaiter(void 0, void 0, void 0, function* () {
        const { limit, skip, sortBy, sortOrder } = req.query;
        const options = {
            limit: limit ? Number(limit) : undefined,
            skip: skip ? Number(skip) : undefined,
            sortBy: sortBy === null || sortBy === void 0 ? void 0 : sortBy.toString(),
            sortOrder: sortOrder === null || sortOrder === void 0 ? void 0 : sortOrder.toString()
        };
        return yield order_service_1.default.getOrders(options);
    });
    const extractOutput = (outputs) => outputs;
    return (0, helper_1.handleRequest)({ req, res, queryValidationSchema, handle, extractOutput });
});
exports.default = getOrders;
