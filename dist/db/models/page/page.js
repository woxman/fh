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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const ObjectId = mongoose_1.default.Types.ObjectId;
const pageSchema = new mongoose_1.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    show: {
        type: Boolean,
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    categorys: {
        type: [String],
        default: []
    },
    cover: {
        type: String
    },
    view: {
        type: Number,
        default: 0,
        required: true
    }
}, {
    timestamps: true
});
pageSchema.methods.toJSON = function () {
    const page = this;
    const pageObject = page.toObject();
    // Converting timestamps to unix time
    if (pageObject.createAt) {
        pageObject.createdAt = Math.floor(new Date(pageObject.createdAt).getTime() / 1000);
    }
    if (pageObject.updatedAt) {
        pageObject.updatedAt = Math.floor(new Date(pageObject.updatedAt).getTime() / 1000);
    }
    return pageObject;
};
const Page = mongoose_1.default.model("Page", pageSchema);
exports.default = Page;
