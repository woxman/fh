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
const billSchema = new mongoose_1.Schema({
    validUntil: {
        type: Number,
        required: true
    },
    products: [{
            _id: false,
            product: {
                type: ObjectId,
                ref: 'Product',
                required: true
            },
            count: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            totalPrice: {
                type: Number,
                required: true
            }
        }],
    shippingCost: {
        type: Number,
        required: true
    },
    valueAddedPercentage: {
        type: Number,
        required: true
    },
    totalDiscount: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    totalSum: {
        type: Number,
        required: true
    },
    payment: {
        method: {
            type: String
        },
        onlinePaymentSteps: [{
                paidAmount: {
                    type: Number
                },
                trackingNumber: {
                    type: String
                },
                paymentTime: {
                    type: Number
                }
            }],
        bankPayment: {
            paidAmount: {
                type: Number
            },
            originAccount: {
                type: Number
            },
            trackingNumber: {
                type: Number
            },
            images: [{
                    type: String
                }],
            disapprovalMessage: {
                type: Number
            },
        }
    }
}, {
    timestamps: true
});
billSchema.methods.toJSON = function () {
    const bill = this;
    const billObject = bill.toObject();
    // Converting timestamps to unix time
    if (billObject.createdAt) {
        billObject.createdAt = Math.floor(new Date(billObject.createdAt).getTime() / 1000);
    }
    if (billObject.updatedAt) {
        billObject.updatedAt = Math.floor(new Date(billObject.updatedAt).getTime() / 1000);
    }
    return billObject;
};
const Bill = mongoose_1.default.model('Bill', billSchema);
exports.default = Bill;
