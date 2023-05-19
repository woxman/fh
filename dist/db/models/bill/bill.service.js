"use strict";
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
const bill_1 = __importDefault(require("./bill"));
const order_1 = __importDefault(require("../order/order"));
const constants_1 = require("../../../utils/constants");
const image_service_1 = __importDefault(require("../image/image.service"));
const addBill = (orderId, newBill) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { validUntil, products, shippingCost, valueAddedPercentage, totalDiscount } = newBill;
        // Checking for order availability
        const filter = {
            _id: orderId,
            status: {
                $in: [1, 2]
            }
        };
        const order = yield order_1.default.findOne(filter).exec();
        if (!order) {
            return {
                success: false,
                error: {
                    statusCode: constants_1.statusCodes.notFound,
                    message: constants_1.errorMessages.billService.orderNotFound
                }
            };
        }
        if (order.bill) {
            // Deleting existing bill
            yield bill_1.default.findByIdAndDelete(order.bill).exec();
        }
        // Checking all order products exist in bill
        const existingProducts = [];
        const allProductsExist = order.products.every(({ product: productId }) => {
            const existingProduct = products.find((product) => {
                return product.product == productId.toString();
            });
            if (existingProduct) {
                existingProducts.push(Object.assign(Object.assign({}, existingProduct), { totalPrice: existingProduct.count * existingProduct.price }));
                return true;
            }
        });
        if (!allProductsExist) {
            return {
                success: false,
                error: {
                    statusCode: constants_1.statusCodes.badRequest,
                    message: constants_1.errorMessages.orderService.notAllProductsExist
                }
            };
        }
        let totalPrice = 0;
        existingProducts.forEach((product) => {
            totalPrice += product.price * product.count;
        });
        let totalSum = totalPrice + totalPrice * valueAddedPercentage - totalDiscount;
        // Creating the new bill for order
        const addedBill = yield bill_1.default.create({
            validUntil,
            products: existingProducts,
            shippingCost,
            valueAddedPercentage,
            totalDiscount,
            totalPrice,
            totalSum
        });
        // Update order status
        const update = {
            status: 2,
            bill: addedBill._id
        };
        const updatedOrder = yield order_1.default.findByIdAndUpdate(orderId, update, { new: true })
            .populate('owner', '_id name')
            .populate({
            path: 'products.product',
            select: '_id name subcategory factory unit price',
            populate: [
                {
                    path: 'subcategory',
                    select: '_id name'
                },
                {
                    path: 'factory',
                    select: '_id name'
                }
            ]
        })
            .populate({
            path: 'bill',
            populate: {
                path: 'products.product',
                select: '_id name'
            }
        })
            .exec();
        return {
            success: true,
            outputs: {
                order: updatedOrder
            }
        };
    }
    catch (error) {
        console.log('Error while creating the bill: ', error);
        return {
            success: false,
            error: {
                statusCode: constants_1.statusCodes.ise,
                message: constants_1.errorMessages.shared.ise
            }
        };
    }
});
// ----------------------------------------------------------------------------
const editBill = (orderId, updates) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Make sure the record exists
        const filter = {
            _id: orderId,
            bill: {
                $exists: true
            }
        };
        const order = yield order_1.default.findOne(filter).exec();
        if (!order) {
            return {
                success: false,
                error: {
                    statusCode: constants_1.statusCodes.notFound,
                    message: constants_1.errorMessages.billService.orderNotFound
                }
            };
        }
        // Make sure there are changes in updates
        if ((Object.keys(updates)).length === 0) {
            return {
                success: false,
                error: {
                    statusCode: constants_1.statusCodes.badRequest,
                    message: constants_1.errorMessages.shared.noChanges
                }
            };
        }
        const bill = yield bill_1.default.findById(order.bill).exec();
        let totalPrice = 0;
        if (updates.products) {
            // Checking all order products exist in bill
            const existingProducts = [];
            const allProductsExist = order.products.every(({ product: productId }) => {
                var _a;
                const existingProduct = (_a = updates.products) === null || _a === void 0 ? void 0 : _a.find((product) => {
                    product.product == productId.toString();
                });
                if (existingProduct) {
                    existingProducts.push(existingProduct);
                    return true;
                }
            });
            if (!allProductsExist) {
                return {
                    success: false,
                    error: {
                        statusCode: constants_1.statusCodes.badRequest,
                        message: constants_1.errorMessages.orderService.notAllProductsExist
                    }
                };
            }
            existingProducts.forEach((product) => {
                totalPrice += product.price * product.count;
            });
        }
        else {
            bill === null || bill === void 0 ? void 0 : bill.products.forEach((product) => {
                totalPrice += product.price * product.count;
            });
        }
        let totalSum = totalPrice + totalPrice * (updates.valueAddedPercentage || (bill === null || bill === void 0 ? void 0 : bill.valueAddedPercentage) || 0) - (updates.totalDiscount || (bill === null || bill === void 0 ? void 0 : bill.totalDiscount) || 0);
        // Update the bill
        yield bill_1.default.findByIdAndUpdate(order.bill, Object.assign(Object.assign({}, updates), { totalPrice,
            totalSum }), { new: true }).exec();
        const updatedOrder = yield order_1.default.findById(orderId)
            .populate('owner', '_id name')
            .populate({
            path: 'products.product',
            select: '_id name subcategory factory unit price',
            populate: [
                {
                    path: 'subcategory',
                    select: '_id name'
                },
                {
                    path: 'factory',
                    select: '_id name'
                }
            ]
        })
            .populate({
            path: 'bill',
            populate: {
                path: 'products.product',
                select: '_id name'
            }
        })
            .exec();
        return {
            success: true,
            outputs: {
                order: updatedOrder
            }
        };
    }
    catch (error) {
        console.log('Error while updating the bill: ', error);
        return {
            success: false,
            error: {
                statusCode: constants_1.statusCodes.ise,
                message: constants_1.errorMessages.shared.ise
            }
        };
    }
});
// ----------------------------------------------------------------------------
const choosePaymentMethod = (userId, orderId, paymentMethod) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Checking for bill availability
        const filter = {
            _id: orderId,
            owner: userId,
            status: {
                $in: [2, 3, 5]
            },
            bill: {
                $exists: true
            }
        };
        const order = yield order_1.default.findOne(filter).exec();
        if (!order) {
            return {
                success: false,
                error: {
                    statusCode: constants_1.statusCodes.notFound,
                    message: constants_1.errorMessages.billService.orderNotFound
                }
            };
        }
        // Update payment method
        const update = {
            'payment.method': paymentMethod
        };
        yield bill_1.default.findByIdAndUpdate(order.bill, update).exec();
        const orderUpdate = {
            status: paymentMethod === 'online' ? 3 : 5
        };
        const updatedOrder = yield order_1.default.findByIdAndUpdate(orderId, orderUpdate, { new: true })
            .populate('owner', '_id name')
            .populate({
            path: 'products.product',
            select: '_id name subcategory factory unit price',
            populate: [
                {
                    path: 'subcategory',
                    select: '_id name'
                },
                {
                    path: 'factory',
                    select: '_id name'
                }
            ]
        })
            .populate({
            path: 'bill',
            populate: {
                path: 'products.product',
                select: '_id name'
            }
        })
            .exec();
        return {
            success: true,
            outputs: {
                order: updatedOrder
            }
        };
    }
    catch (error) {
        console.log('Error while choosing payment method: ', error);
        return {
            success: false,
            error: {
                statusCode: constants_1.statusCodes.ise,
                message: constants_1.errorMessages.shared.ise
            }
        };
    }
});
// ----------------------------------------------------------------------------
const updateBankPayment = (userId, orderId, bankPayment) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { paidAmount, originAccount, trackingNumber, images } = bankPayment;
        // Checking for order availability
        const filter = {
            _id: orderId,
            owner: userId,
            status: {
                $in: [5, 7]
            },
            bill: {
                $exists: true
            }
        };
        const order = yield order_1.default.findOne(filter).exec();
        if (!order) {
            return {
                success: false,
                error: {
                    statusCode: constants_1.statusCodes.badRequest,
                    message: constants_1.errorMessages.billService.orderNotFound
                }
            };
        }
        // Checking for bill availability
        const billFilter = {
            _id: order.bill,
            'payment.method': 'bank'
        };
        const bill = yield bill_1.default.findOne(billFilter).exec();
        if (!bill) {
            return {
                success: false,
                error: {
                    statusCode: constants_1.statusCodes.badRequest,
                    message: constants_1.errorMessages.billService.billNotFound
                }
            };
        }
        const imagesToSave = [];
        // storing images
        for (let image of images) {
            const result = yield image_service_1.default.storeImage(image.format, image.data);
            if (result.success && result.imageUrl) {
                imagesToSave.push(result.imageUrl);
            }
            else {
                return {
                    success: false,
                    error: {
                        message: constants_1.errorMessages.shared.ise,
                        statusCode: constants_1.statusCodes.ise
                    }
                };
            }
        }
        // Update bank payment
        const update = {
            'payment.bankPayment': {
                paidAmount,
                originAccount,
                trackingNumber,
                images: imagesToSave
            }
        };
        yield bill_1.default.findByIdAndUpdate(order.bill, update).exec();
        const orderUpdate = {
            status: 6
        };
        const updatedOrder = yield order_1.default.findByIdAndUpdate(orderId, orderUpdate, { new: true })
            .populate('owner', '_id name')
            .populate({
            path: 'products.product',
            select: '_id name subcategory factory unit price',
            populate: [
                {
                    path: 'subcategory',
                    select: '_id name'
                },
                {
                    path: 'factory',
                    select: '_id name'
                }
            ]
        })
            .populate({
            path: 'bill',
            populate: {
                path: 'products.product',
                select: '_id name'
            }
        })
            .exec();
        return {
            success: true,
            outputs: {
                order: updatedOrder
            }
        };
    }
    catch (error) {
        console.log('Error while updating bank payment: ', error);
        return {
            success: false,
            error: {
                statusCode: constants_1.statusCodes.ise,
                message: constants_1.errorMessages.shared.ise
            }
        };
    }
});
// ----------------------------------------------------------------------------
const disapproveBankPayment = (orderId, disapprovalMessage) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Checking for order availability
        const filter = {
            _id: orderId,
            status: {
                $in: [6]
            },
            bill: {
                $exists: true
            }
        };
        const order = yield order_1.default.findOne(filter).exec();
        if (!order) {
            return {
                success: false,
                error: {
                    statusCode: constants_1.statusCodes.badRequest,
                    message: constants_1.errorMessages.billService.orderNotFound
                }
            };
        }
        // Checking for bill availability
        const billFilter = {
            _id: order.bill,
            'payment.method': 'bank'
        };
        const bill = yield bill_1.default.findOne(billFilter).exec();
        if (!bill) {
            return {
                success: false,
                error: {
                    statusCode: constants_1.statusCodes.badRequest,
                    message: constants_1.errorMessages.billService.billNotFound
                }
            };
        }
        // Update bank payment
        const update = {
            'payment.bankPayment.disapprovalMessage': disapprovalMessage
        };
        yield bill_1.default.findByIdAndUpdate(order.bill, update).exec();
        const orderUpdate = {
            status: 7
        };
        const updatedOrder = yield order_1.default.findByIdAndUpdate(orderId, orderUpdate, { new: true })
            .populate('owner', '_id name')
            .populate({
            path: 'products.product',
            select: '_id name subcategory factory unit price',
            populate: [
                {
                    path: 'subcategory',
                    select: '_id name'
                },
                {
                    path: 'factory',
                    select: '_id name'
                }
            ]
        })
            .populate({
            path: 'bill',
            populate: {
                path: 'products.product',
                select: '_id name'
            }
        })
            .exec();
        return {
            success: true,
            outputs: {
                order: updatedOrder
            }
        };
    }
    catch (error) {
        console.log('Error while updating setting bank payment disapproval message: ', error);
        return {
            success: false,
            error: {
                statusCode: constants_1.statusCodes.ise,
                message: constants_1.errorMessages.shared.ise
            }
        };
    }
});
// ----------------------------------------------------------------------------
const deleteBill = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Checking order existence
        const filter = {
            _id: orderId,
            bill: {
                $exists: true
            }
        };
        const update = {
            bill: null
        };
        const order = yield order_1.default.findOneAndUpdate(filter, update).exec();
        if (!order) {
            return {
                success: false,
                error: {
                    statusCode: constants_1.statusCodes.badRequest,
                    message: constants_1.errorMessages.billService.orderNotFound
                }
            };
        }
        // Delete the bill
        const deletedBill = yield bill_1.default.findByIdAndDelete(order.bill).exec();
        // Deleting images of the deleted bill
        if (deletedBill && deletedBill.payment && deletedBill.payment.bankPayment) {
            for (const image in deletedBill.payment.bankPayment.images) {
                yield image_service_1.default.deleteImage(image);
            }
        }
        return {
            success: true
        };
    }
    catch (error) {
        console.log('Error while deleting the bill: ', error);
        return {
            success: false,
            error: {
                statusCode: constants_1.statusCodes.ise,
                message: constants_1.errorMessages.shared.ise
            }
        };
    }
});
exports.default = {
    addBill,
    editBill,
    choosePaymentMethod,
    updateBankPayment,
    disapproveBankPayment,
    deleteBill
};
