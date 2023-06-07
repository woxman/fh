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
const page_service_1 = __importDefault(require("../../db/models/page/page.service"));
const constants_1 = require("../../utils/constants");
const editPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validationSchema = yup.object().shape({
        updates: yup.object({
            title: yup.string(),
            summary: yup.string(),
            author: yup.string(),
            contetnt: yup.string(),
            show: yup.boolean(),
            tags: yup.array().of(yup.string()),
            categorys: yup.array().of(yup.string()),
            cover: yup.object({
                format: yup.string().oneOf(constants_1.allowedImageFormats),
                data: yup.mixed()
            }),
        }).required()
    });
    const handle = () => __awaiter(void 0, void 0, void 0, function* () {
        const { pageId } = req.params;
        const allowedUpdates = ["title", "summary", "author", "content", "show", "tags", "categorys", "cover"];
        const pdates = {};
        Object.keys(req.body.updates || {}).forEach((update) => {
            if (allowedUpdates.includes(update)) {
                if (["title", "author"].includes(update)) {
                    pdates[update] = req.body.updates[update].trim();
                }
                else {
                    pdates[update] = req.body.updates[update];
                }
            }
        });
        return yield page_service_1.default.editPage(pageId, pdates);
    });
    const extractOutput = (outputs) => outputs;
    return (0, helper_1.handleRequest)({ req, res, validationSchema, handle, extractOutput });
});
exports.default = editPage;
