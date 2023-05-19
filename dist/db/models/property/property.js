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
const propertySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    values: {
        type: [String],
        required: true
    }
}, {
    timestamps: true
});
propertySchema.methods.toJSON = function () {
    const property = this;
    const propertyObject = property.toObject();
    // Converting timestamps to unix time
    if (propertyObject.createAt) {
        propertyObject.createdAt = Math.floor(new Date(propertyObject.createdAt).getTime() / 1000);
    }
    if (propertyObject.updatedAt) {
        propertyObject.updatedAt = Math.floor(new Date(propertyObject.updatedAt).getTime() / 1000);
    }
    return propertyObject;
};
const Property = mongoose_1.default.model('Property', propertySchema);
exports.default = Property;
