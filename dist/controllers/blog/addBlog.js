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
const blog_service_1 = __importDefault(require("../../db/models/blog/blog.service"));
const constants_1 = require("../../utils/constants");
const addBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validationSchema = yup.object().shape({
        title: yup.string().required(),
        summary: yup.string().required(),
        author: yup.string().required(),
        content: yup.string().required(),
        show: yup.boolean().required(),
        tags: yup.array().of(yup.string()),
        category: yup.string().length(24),
        cover: yup.object({
            format: yup.string().oneOf(constants_1.allowedImageFormats),
            data: yup.mixed()
        }),
    });
    const handle = () => __awaiter(void 0, void 0, void 0, function* () {
        const { title, summary, author, content, show, tags, category, cover } = req.body;
        const newBlog = {
            title: title.trim(),
            summary,
            author: author.trim(),
            content,
            show,
            tags,
            category,
            cover
        };
        return yield blog_service_1.default.addBlog(newBlog);
    });
    const extractOutput = (outputs) => outputs;
    return (0, helper_1.handleRequest)({ req, res, validationSchema, handle, extractOutput });
});
exports.default = addBlog;
