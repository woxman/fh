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
const user_1 = __importDefault(require("./user"));
const product_1 = __importDefault(require("../product/product"));
const constants_1 = require("../../../utils/constants");
const token_1 = require("../../../utils/helpers/token");
const sms_1 = require("../../../utils/helpers/sms");
const mongoose_1 = __importDefault(require("mongoose"));
const report_1 = __importDefault(require("../report/report"));
const ObjectId = mongoose_1.default.Types.ObjectId;
const addUser = (newUser, reportDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phone, email, name, addresses } = newUser;
        const { adminId, ip } = reportDetails;
        // checking email availability
        const existingUserWithThisEmail = yield user_1.default.findOne({ email }).exec();
        if (existingUserWithThisEmail) {
            return {
                success: false,
                error: {
                    message: constants_1.errorMessages.userService.emailAlreadyTaken,
                    statusCode: constants_1.statusCodes.badRequest
                }
            };
        }
        // checking phone availability
        const existingUserWithThisPhone = yield user_1.default.findOne({ phone }).exec();
        if (existingUserWithThisPhone) {
            return {
                success: false,
                error: {
                    message: constants_1.errorMessages.userService.phoneAlreadyTaken,
                    statusCode: constants_1.statusCodes.badRequest
                }
            };
        }
        const createdUser = yield user_1.default.create({
            phone,
            email,
            name,
            addresses,
        });
        yield report_1.default.create({
            admin: adminId,
            ip,
            event: 'createUser',
            createdUser
        });
        return {
            success: true,
            outputs: {
                user: createdUser
            }
        };
    }
    catch (error) {
        console.log('Error while creating new user: ', error);
        return {
            success: false,
            error: {
                message: constants_1.errorMessages.shared.ise,
                statusCode: constants_1.statusCodes.ise
            }
        };
    }
});
//-------------------------------------------
const sendLoginCode = (phone) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findOne({ phone }).exec();
        const loginCode = {
            code: Math.floor(1000 + Math.random() * 9000),
            expiresAt: new Date().getTime() + 300000
        };
        if (!user) {
            // Creating new user
            const newUser = {
                phone,
                loginCode
            };
            yield user_1.default.create(newUser);
        }
        else {
            // Updating login code of existing user
            yield user_1.default.findByIdAndUpdate(user._id, { $set: { loginCode } }).exec();
        }
        yield (0, sms_1.sendCode)(phone, loginCode.code);
        return {
            success: true
        };
    }
    catch (error) {
        console.log('Error while sending login code: ', error);
        return {
            success: false,
            error: {
                message: constants_1.errorMessages.shared.ise,
                statusCode: constants_1.statusCodes.ise
            }
        };
    }
});
//------------------------------------------------
const login = (phone, code) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findOne({ phone }).exec();
        if (!user) {
            return {
                success: false,
                error: {
                    message: constants_1.errorMessages.userService.phoneNotFound,
                    statusCode: constants_1.statusCodes.badRequest
                }
            };
        }
        if (code !== user.loginCode.code) {
            return {
                success: false,
                error: {
                    message: constants_1.errorMessages.userService.incorrectLoginCode,
                    statusCode: constants_1.statusCodes.badRequest
                }
            };
        }
        const isTokenExpired = new Date().getTime() > user.loginCode.expiresAt;
        if (isTokenExpired) {
            return {
                success: false,
                error: {
                    message: constants_1.errorMessages.userService.loginCodeExpired,
                    statusCode: constants_1.statusCodes.badRequest
                }
            };
        }
        const token = (0, token_1.generateToken)(user._id, "user");
        yield user_1.default.findByIdAndUpdate(user._id, { $push: { tokens: token } })
            .populate({
            path: 'favoriteProducts',
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
        }).exec();
        return {
            success: true,
            outputs: {
                user,
                token
            }
        };
    }
    catch (error) {
        console.log('Error while logging in: ', error);
        return {
            success: false,
            error: {
                message: constants_1.errorMessages.shared.ise,
                statusCode: constants_1.statusCodes.ise
            }
        };
    }
});
//-----------------------------------------------------------
const logout = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // popping old token from tokens list
        yield user_1.default.findOneAndUpdate({ tokens: token }, { $pull: { tokens: token } }).exec();
        return {
            success: true
        };
    }
    catch (error) {
        console.log('Error while logging out: ', error);
        return {
            success: false,
            error: {
                message: constants_1.errorMessages.shared.ise,
                statusCode: constants_1.statusCodes.ise
            }
        };
    }
});
//--------------------------------------------------
const getUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findById(userId)
            .populate({
            path: 'favoriteProducts',
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
        }).exec();
        if (!user) {
            return {
                success: false,
                error: {
                    message: constants_1.errorMessages.shared.notFound,
                    statusCode: constants_1.statusCodes.notFound
                }
            };
        }
        return {
            success: true,
            outputs: {
                user
            }
        };
    }
    catch (error) {
        console.log('Error while getting user: ', error);
        return {
            success: false,
            error: {
                message: constants_1.errorMessages.shared.ise,
                statusCode: constants_1.statusCodes.ise
            }
        };
    }
});
//---------------------------
const toggleFavoriteProduct = (userId, productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Make sure the user exists
        const user = yield user_1.default.findById(userId).exec();
        if (!user) {
            return {
                success: false,
                error: {
                    message: constants_1.errorMessages.shared.notFound,
                    statusCode: constants_1.statusCodes.notFound
                }
            };
        }
        // Make sure the product exists
        const product = yield product_1.default.findById(productId).exec();
        if (!product) {
            return {
                success: false,
                error: {
                    message: constants_1.errorMessages.shared.notFound,
                    statusCode: constants_1.statusCodes.notFound
                }
            };
        }
        if (!user.favoriteProducts.includes(product._id)) {
            yield user_1.default.findByIdAndUpdate(userId, {
                $push: {
                    favoriteProducts: product._id
                }
            }).exec();
        }
        else {
            yield user_1.default.findByIdAndUpdate(userId, {
                $pull: {
                    favoriteProducts: product._id
                }
            }).exec();
        }
        return {
            success: true
        };
    }
    catch (error) {
        console.log('Error while adding the favorite product: ', error);
        return {
            success: false,
            error: {
                message: constants_1.errorMessages.shared.ise,
                statusCode: constants_1.statusCodes.ise
            }
        };
    }
});
//----------------------------------------
const editUser = (userId, updates) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // checking adminUpdates object to not be empty
        if (Object.keys(updates).length == 0) {
            return {
                success: false,
                error: {
                    message: constants_1.errorMessages.shared.noChanges,
                    statusCode: constants_1.statusCodes.badRequest
                }
            };
        }
        // checking email availability
        if (updates.email) {
            const existingUserWithThisEmail = yield user_1.default.findOne({ email: updates.email }).exec();
            if (existingUserWithThisEmail) {
                return {
                    success: false,
                    error: {
                        message: constants_1.errorMessages.userService.emailAlreadyTaken,
                        statusCode: constants_1.statusCodes.badRequest
                    }
                };
            }
        }
        const updatedUser = yield user_1.default.findByIdAndUpdate(userId, updates, { new: true })
            .populate({
            path: 'favoriteProducts',
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
        }).exec();
        if (!updatedUser) {
            return {
                success: false,
                error: {
                    message: constants_1.errorMessages.shared.notFound,
                    statusCode: constants_1.statusCodes.badRequest
                }
            };
        }
        return {
            success: true,
            outputs: {
                user: updatedUser
            }
        };
    }
    catch (error) {
        console.log('Error while updating an admin: ', error);
        return {
            success: false,
            error: {
                message: constants_1.errorMessages.shared.ise,
                statusCode: constants_1.statusCodes.ise
            }
        };
    }
});
//----------------------------------------
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // TODO: delete user orders
        yield user_1.default.findByIdAndDelete(userId);
        return {
            success: true
        };
    }
    catch (error) {
        console.log('Error while deleting user: ', error);
        return {
            success: false,
            error: {
                message: constants_1.errorMessages.shared.ise,
                statusCode: constants_1.statusCodes.ise
            }
        };
    }
});
exports.default = {
    addUser,
    sendLoginCode,
    login,
    logout,
    getUser,
    editUser,
    toggleFavoriteProduct,
    deleteUser
};
