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
const subcategorySchema = new mongoose_1.Schema({
    category: {
        type: ObjectId,
        ref: 'Category',
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    urlSlug: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    code: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    properties: [{
            _id: false,
            property: {
                type: ObjectId,
                ref: 'Property'
            },
            order: {
                type: Number
            }
        }]
}, {
    timestamps: true
});
subcategorySchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'subcategory'
});
subcategorySchema.methods.toJSON = function () {
    const subcategory = this;
    const subcategoryObject = subcategory.toObject();
    // Converting timestamps to unix time
    if (subcategoryObject.createAt) {
        subcategoryObject.createdAt = Math.floor(new Date(subcategoryObject.createdAt).getTime() / 1000);
    }
    if (subcategoryObject.updatedAt) {
        subcategoryObject.updatedAt = Math.floor(new Date(subcategoryObject.updatedAt).getTime() / 1000);
    }
    return subcategoryObject;
};
const Subcategory = mongoose_1.default.model('Subcategory', subcategorySchema);
exports.default = Subcategory;
