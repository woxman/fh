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
const orderSchema = new mongoose_1.Schema({
    owner: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: Number,
        default: 1
    },
    trackingCode: {
        type: String,
        required: true,
        unique: true
    },
    products: [{
            _id: false,
            product: {
                type: ObjectId,
                ref: 'Product'
            },
            count: Number,
            stockStatus: {
                enoughInStock: {
                    type: Boolean,
                    default: true
                },
                numberLeftInStock: {
                    type: Number
                },
                alternativeProduct: {
                    type: ObjectId
                }
            }
        }],
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    fullNameOfReceiverParty: {
        type: String,
        required: true
    },
    accountNumber: {
        type: String,
        required: true
    },
    fullNameOfAccountOwner: {
        type: String,
        required: true
    },
    shabaNumber: {
        type: String,
        required: true
    },
    bill: {
        type: ObjectId,
        ref: 'Bill'
    },
    shippingDates: [{
            type: Number
        }],
    shippingDate: {
        type: Number
    }
}, {
    timestamps: true
});
orderSchema.methods.toJSON = function () {
    const order = this;
    const orderObject = order.toObject();
    // Converting timestamps to unix time
    if (orderObject.createdAt) {
        orderObject.createdAt = Math.floor(new Date(orderObject.createdAt).getTime() / 1000);
    }
    if (orderObject.updatedAt) {
        orderObject.updatedAt = Math.floor(new Date(orderObject.updatedAt).getTime() / 1000);
    }
    return orderObject;
};
orderSchema.virtual('alternativeProducts').get(function () {
    const order = this;
    return (order.products.map(product => {
        return product.stockStatus.alternativeProduct;
    })).filter(item => {
        if (item)
            return true;
    });
});
const Order = mongoose_1.default.model('Order', orderSchema);
exports.default = Order;
