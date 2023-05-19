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
const productSchema = new mongoose_1.Schema({
    subcategory: {
        type: ObjectId,
        ref: 'Subcategory',
        required: true
    },
    factory: {
        type: ObjectId,
        ref: 'Factory',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    urlSlug: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    properties: [{
            _id: false,
            name: {
                type: String,
                trim: true
            },
            value: {
                type: String
            },
            order: {
                type: Number
            }
        }],
    unit: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    priceHistory: [{
            _id: false,
            price: {
                type: Number,
                required: true
            },
            date: {
                type: Number,
                required: true
            }
        }],
    tags: [{
            _id: false,
            type: String,
            trim: true
        }],
    images: [{
            _id: false,
            type: String,
        }],
    averageRating: {
        type: Number,
        default: 0
    },
    ratingsCount: {
        type: Number,
        default: 0
    },
    ratings: [{
            user: {
                type: ObjectId,
                ref: "User"
            },
            rating: {
                type: Number,
                required: true
            }
        }]
}, {
    timestamps: true
});
productSchema.methods.toJSON = function () {
    const product = this;
    const productObject = product.toObject();
    // Converting timestamps to unix time
    if (productObject.createAt) {
        productObject.createdAt = Math.floor(new Date(productObject.createdAt).getTime() / 1000);
    }
    if (productObject.updatedAt) {
        productObject.updatedAt = Math.floor(new Date(productObject.updatedAt).getTime() / 1000);
    }
    return productObject;
};
const Product = mongoose_1.default.model('Product', productSchema);
exports.default = Product;
