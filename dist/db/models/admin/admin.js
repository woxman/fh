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
const adminSchema = new mongoose_1.Schema({
    isGodAdmin: {
        type: Boolean,
        default: false,
        required: true
    },
    isSuperAdmin: {
        type: Boolean,
        default: false,
        require: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: String,
        unique: true,
        required: true
    },
    code: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    permissions: {
        type: [String],
        default: []
    },
    tokens: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
});
adminSchema.methods.toJSON = function () {
    const admin = this;
    const adminObject = admin.toObject();
    // Converting timestamps to unix time
    if (adminObject.createAt) {
        adminObject.createdAt = Math.floor(new Date(adminObject.createdAt).getTime() / 1000);
    }
    if (adminObject.updatedAt) {
        adminObject.updatedAt = Math.floor(new Date(adminObject.updatedAt).getTime() / 1000);
    }
    // Deleting user password and tokens list
    delete adminObject.password;
    delete adminObject.tokens;
    return adminObject;
};
const Admin = mongoose_1.default.model("Admin", adminSchema);
exports.default = Admin;
