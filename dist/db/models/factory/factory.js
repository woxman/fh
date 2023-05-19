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
const factorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    },
    // This is going to be the url of a stored image
    icon: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});
factorySchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'factory'
});
factorySchema.methods.toJSON = function () {
    const factory = this;
    const factoryObject = factory.toObject();
    // Converting timestamps to unix time
    if (factoryObject.createAt) {
        factoryObject.createdAt = Math.floor(new Date(factoryObject.createdAt).getTime() / 1000);
    }
    if (factoryObject.updatedAt) {
        factoryObject.updatedAt = Math.floor(new Date(factoryObject.updatedAt).getTime() / 1000);
    }
    return factoryObject;
};
const Factory = mongoose_1.default.model('Factory', factorySchema);
exports.default = Factory;
