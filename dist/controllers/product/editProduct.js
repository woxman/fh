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
const product_service_1 = __importDefault(require("../../db/models/product/product.service"));
const editProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validationSchema = yup.object().shape({
        updates: yup.object({
            name: yup.string(),
            factory: yup.string().length(24),
            description: yup.string(),
            properties: yup.array().of(yup.object({
                name: yup.string().required(),
                value: yup.string().required()
            })),
            unit: yup.string(),
            price: yup.number(),
            tags: yup.array().of(yup.string()),
            images: yup.array().of(yup.mixed())
        }).required()
    });
    const handle = () => __awaiter(void 0, void 0, void 0, function* () {
        const { productId } = req.params;
        const allowedUpdates = ['name', 'factory', 'description', 'properties', 'unit', 'price', 'tags', 'images'];
        const updates = {};
        Object.keys(req.body.updates || {}).forEach((update) => {
            if (allowedUpdates.includes(update)) {
                if (['name'].includes(update)) {
                    updates[update] = req.body.updates[update].trim();
                }
                else {
                    updates[update] = req.body.updates[update];
                }
            }
        });
        return yield product_service_1.default.editProduct(productId, updates);
    });
    const extractOutput = (outputs) => outputs;
    return (0, helper_1.handleRequest)({ req, res, validationSchema, handle, extractOutput });
});
exports.default = editProduct;
