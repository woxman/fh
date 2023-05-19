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
const order_1 = __importDefault(require("./order"));
const constants_1 = require("../../../utils/constants");
const user_1 = __importDefault(require("../user/user"));
const product_1 = __importDefault(require("../product/product"));
const bill_service_1 = __importDefault(require("../bill/bill.service"));
const addOrder = (userId, newOrder) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { products, phoneNumber, address, fullNameOfReceiverParty, accountNumber, fullNameOfAccountOwner, shabaNumber } = newOrder;
        // Check if the user exists
        const user = yield user_1.default.findById(userId);
        if (!user) {
            return {
                success: false,
                error: {
                    statusCode: constants_1.statusCodes.notFound,
                    message: constants_1.errorMessages.userService.noSuchUser
                }
            };
        }
        // Check if all the products exist
        let allProductsExist = true;
        for (const product of products) {
            const existingProduct = yield product_1.default.findById(product.product);
            if (!existingProduct) {
                allProductsExist = false;
                break;
            }
        }
        if (!allProductsExist) {
            return {
                success: false,
                error: {
                    statusCode: constants_1.statusCodes.badRequest,
                    message: constants_1.errorMessages.orderService.invalidProduct
                }
            };
        }
        // Generating a random hex string to be used as tracking code
        const trackingCode = [...Array(12)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
        // Creating the new order
        let addedOrder = yield order_1.default.create({
            owner: user._id,
            status: 1,
            trackingCode,
            products,
            phoneNumber,
            address,
            fullNameOfReceiverParty,
            accountNumber,
            fullNameOfAccountOwner,
            shabaNumber,
        });
        addedOrder = yield addedOrder.populate('owner', '_id name');
        addedOrder = yield addedOrder.populate({
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
        });
        return {
            success: true,
            outputs: {
                order: addedOrder
            }
        };
    }
    catch (error) {
        console.log('Error while creating the new order: ', error);
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
const getOrder = (orderId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find and return the order
        const filter = { _id: orderId };
        if (userId) {
            filter.owner = userId;
        }
        let order = yield order_1.default.findOne(filter)
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
        if (!order) {
            return {
                success: false,
                error: {
                    statusCode: constants_1.statusCodes.notFound,
                    message: constants_1.errorMessages.shared.notFound
                }
            };
        }
        return {
            success: true,
            outputs: {
                order
            }
        };
    }
    catch (error) {
        console.log('Error while getting the order: ', error);
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
const getOrderByTrackingCode = (trackingCode, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find and return the order
        const filter = { trackingCode };
        if (userId) {
            filter.owner = userId;
        }
        const order = yield order_1.default.findOne(filter)
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
        if (!order) {
            return {
                success: false,
                error: {
                    statusCode: constants_1.statusCodes.notFound,
                    message: constants_1.errorMessages.shared.notFound
                }
            };
        }
        return {
            success: true,
            outputs: {
                order
            }
        };
    }
    catch (error) {
        console.log('Error while getting the order by tracking code: ', error);
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
const getOrders = (options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit, skip, sortBy, sortOrder } = options;
        // Create and fill the query options object
        const queryOptions = {};
        if (limit) {
            queryOptions['limit'] = limit;
        }
        if (skip) {
            queryOptions['skip'] = skip;
        }
        if (sortBy) {
            queryOptions['sort'] = {};
            queryOptions['sort'][`${sortBy}`] = sortOrder || 'asc';
        }
        const filter = {};
        // Fetch the orders
        const count = yield order_1.default.countDocuments(filter);
        const orders = yield order_1.default.find(filter, {}, queryOptions)
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
                count,
                orders
            }
        };
    }
    catch (error) {
        console.log('Error while getting the orders: ', error);
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
const getOrdersByUserId = (userId, options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit, skip, sortBy, sortOrder } = options;
        // Create and fill the query options object
        const queryOptions = {};
        if (limit) {
            queryOptions['limit'] = limit;
        }
        if (skip) {
            queryOptions['skip'] = skip;
        }
        if (sortBy) {
            queryOptions['sort'] = {};
            queryOptions['sort'][`${sortBy}`] = sortOrder || 'asc';
        }
        const filter = { owner: userId };
        // Fetch the orders
        const count = yield order_1.default.countDocuments(filter);
        let orders = yield order_1.default.find(filter, {}, queryOptions)
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
                count,
                orders
            }
        };
    }
    catch (error) {
        console.log('Error while getting the orders by user id: ', error);
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
const editOrder = (orderId, updates, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Make sure the record exists
        const filter = { _id: orderId };
        if (userId) {
            filter.owner = userId;
        }
        const order = yield order_1.default.findOne(filter).exec();
        if (!order) {
            return {
                success: false,
                error: {
                    statusCode: constants_1.statusCodes.notFound,
                    message: constants_1.errorMessages.shared.notFound
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
        // Trying to avoid invalid updates
        const validUpdates = {
            1: ['status', 'products', 'phoneNumber', 'address', 'fullNameOfReceiverParty', 'accountNumber', 'fullNameOfAccountOwner', 'shabaNumber'],
            2: ['status', 'phoneNumber', 'address', 'fullNameOfReceiverParty', 'accountNumber', 'fullNameOfAccountOwner', 'shabaNumber'],
            3: ['status', 'phoneNumber', 'address', 'fullNameOfReceiverParty', 'accountNumber', 'fullNameOfAccountOwner', 'shabaNumber'],
            4: ['status', 'phoneNumber', 'address'],
            5: ['status', 'phoneNumber', 'address', 'fullNameOfReceiverParty', 'accountNumber', 'fullNameOfAccountOwner', 'shabaNumber'],
            6: ['status', 'phoneNumber', 'address', 'shippingDates'],
            7: ['status', 'phoneNumber', 'address', 'fullNameOfReceiverParty', 'accountNumber', 'fullNameOfAccountOwner', 'shabaNumber'],
            8: ['status', 'phoneNumber', 'address', 'shippingDates', 'shippingDate'],
            9: ['status'],
            10: ['status'],
            11: ['status'],
            12: ['status'],
            13: []
        };
        const currentStatus = order.status;
        const areUpdatesValid = Object.keys(updates).every((update) => {
            if (!validUpdates[currentStatus].includes(update)) {
                return false;
            }
            else {
                return true;
            }
        });
        if (!areUpdatesValid) {
            return {
                success: false,
                error: {
                    statusCode: constants_1.statusCodes.badRequest,
                    message: constants_1.errorMessages.orderService.invalidUpdates
                }
            };
        }
        if (updates.status) {
            // Check if the status update is valid
            const validStatuses = {
                1: [2, 13],
                2: [3, 5, 13],
                3: [2, 4, 13],
                4: [6, 13],
                5: [6, 13],
                6: [7, 8, 11, 13],
                7: [6, 13],
                8: [9, 11, 13],
                9: [10, 11, 13],
                10: [12, 13],
                11: [12, 13],
                12: [13],
                13: []
            };
            const currentStatus = order.status;
            const newStatus = updates.status;
            if (!validStatuses[currentStatus].includes(newStatus)) {
                return {
                    success: false,
                    error: {
                        statusCode: constants_1.statusCodes.badRequest,
                        message: constants_1.errorMessages.orderService.invalidStatusUpdate
                    }
                };
            }
        }
        if (updates.products) {
            // First checking to see the product id and count match and if they do, update their stock status
            const allNewProductsExistInOrder = updates.products.every((product) => {
                const match = order.products.find((orderProduct) => {
                    return (orderProduct.product === product.product && orderProduct.count === product.count);
                });
                if (!match) {
                    return false;
                }
                else {
                    return true;
                }
            });
            if (!allNewProductsExistInOrder) {
                return {
                    success: false,
                    error: {
                        statusCode: constants_1.statusCodes.badRequest,
                        message: constants_1.errorMessages.orderService.notAllProductsExist
                    }
                };
            }
            const allOrderProductsExistInUpdates = order.products.every((orderProduct) => {
                var _a;
                const match = (_a = updates.products) === null || _a === void 0 ? void 0 : _a.find((product) => {
                    return (orderProduct.product === product.product && orderProduct.count === product.count);
                });
                if (!match) {
                    return false;
                }
                else {
                    return true;
                }
            });
            if (!allOrderProductsExistInUpdates) {
                return {
                    success: false,
                    error: {
                        statusCode: constants_1.statusCodes.badRequest,
                        message: constants_1.errorMessages.orderService.productsMismatch
                    }
                };
            }
        }
        if (updates.shippingDate) {
            if (!order.shippingDates.includes(updates.shippingDate)) {
                return {
                    success: false,
                    error: {
                        statusCode: constants_1.statusCodes.badRequest,
                        message: constants_1.errorMessages.orderService.invalidShippingDate
                    }
                };
            }
        }
        // Update the order
        const updatedOrder = yield order_1.default
            .findOneAndUpdate(filter, updates, { new: true })
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
                updatedOrder
            }
        };
    }
    catch (error) {
        console.log('Error while updating the order: ', error);
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
const deleteOrders = (idList) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        for (const id of idList) {
            // Deleting the potential bill of the deleted order
            yield bill_service_1.default.deleteBill(id);
            // Find and delete the order
            yield order_1.default.findOneAndDelete({ _id: id }).exec();
        }
        return {
            success: true
        };
    }
    catch (error) {
        console.log('Error while deleting the orders: ', error);
        return {
            success: false,
            error: {
                statusCode: constants_1.statusCodes.ise,
                message: constants_1.errorMessages.shared.ise
            }
        };
    }
});
//----------------------------------------------------------------------------
const getSiteStatistics = (startOfTheYear) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productsCount = yield product_1.default.countDocuments();
        const ordersCount = yield order_1.default.countDocuments({
            status: 12
        });
        const thisWeekFilter = {
            status: 12,
            updatedAt: {
                $gt: new Date(new Date().getTime() - 604800000),
                $lt: new Date()
            }
        };
        const thisWeekOrders = yield order_1.default.find(thisWeekFilter)
            .populate('bill', 'totalSum').exec();
        const thisWeekIncome = [];
        thisWeekOrders.map((order) => {
            if ('totalSum' in order.bill) {
                thisWeekIncome.push({
                    totalSum: order.bill.totalSum,
                    date: Math.floor(order.updatedAt.getTime() / 1000)
                });
            }
        });
        // Get income in the specified year
        const yearFilter = {
            status: 12,
            updatedAt: {
                $gt: new Date(startOfTheYear * 1000),
                $lt: (new Date().getTime() < (startOfTheYear * 1000 + 31536000000)) ? new Date() : new Date(startOfTheYear * 1000 + 31536000000)
            }
        };
        const yearOrders = yield order_1.default.find(yearFilter)
            .populate('bill', 'totalSum').exec();
        const yearIncome = [];
        yearOrders.map((order) => {
            if ('totalSum' in order.bill) {
                yearIncome.push({
                    totalSum: order.bill.totalSum,
                    date: Math.floor(order.updatedAt.getTime() / 1000)
                });
            }
        });
        return {
            success: true,
            outputs: {
                productsCount,
                ordersCount,
                thisWeekIncome,
                yearIncome
            }
        };
    }
    catch (error) {
        console.log('Error while getting the site statistics: ', error);
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
    addOrder,
    getOrder,
    getOrderByTrackingCode,
    getOrders,
    getOrdersByUserId,
    editOrder,
    deleteOrders,
    getSiteStatistics
};
