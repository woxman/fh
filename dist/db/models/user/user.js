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
const userSchema = new mongoose_1.Schema({
    phone: {
        type: String,
        unique: true,
        required: true
    },
    loginCode: {
        code: {
            type: String,
            default: ""
        },
        expiresAt: {
            type: Number,
            default: 0
        }
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    favoriteProducts: [{
            _id: false,
            type: ObjectId,
            ref: 'Product'
        }],
    addresses: [{
            type: String
        }],
    code: {
        type: String
    },
    tokens: [{
            type: String,
            default: []
        }]
}, {
    timestamps: true
});
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    // Converting timestamps to unix time
    if (userObject.createAt) {
        userObject.createdAt = Math.floor(new Date(userObject.createdAt).getTime() / 1000);
    }
    if (userObject.updatedAt) {
        userObject.updatedAt = Math.floor(new Date(userObject.updatedAt).getTime() / 1000);
    }
    // Deleting user password and tokens list
    delete userObject.loginCode;
    delete userObject.tokens;
    return userObject;
};
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
