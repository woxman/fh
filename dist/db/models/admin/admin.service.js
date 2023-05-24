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
const admin_1 = __importDefault(require("./admin"));
const siteInfo_1 = __importDefault(require("../siteInfo/siteInfo"));
const constants_1 = require("../../../utils/constants");
const encryption_1 = require("../../../utils/helpers/encryption");
const token_1 = require("../../../utils/helpers/token");
const mongoose_1 = __importDefault(require("mongoose"));
const report_1 = __importDefault(require("../report/report"));
const ObjectId = mongoose_1.default.Types.ObjectId;
const addAdmin = (currentAdminIsGodAdmin, newAdmin, reportDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { isSuperAdmin, email, password, phone, code, name, permissions } = newAdmin;
        const { adminId, ip } = reportDetails;
        // checking godAdmin permissions
        if (!currentAdminIsGodAdmin && isSuperAdmin) {
            return {
                success: false,
                error: {
                    message: constants_1.errorMessages.adminService.godAdminRoleRequired,
                    statusCode: constants_1.statusCodes.badRequest
                }
            };
        }
        // checking email availability
        const existingAdminWithThisEmail = yield admin_1.default.findOne({ email }).exec();
        if (existingAdminWithThisEmail) {
            return {
                success: false,
                error: {
                    message: constants_1.errorMessages.adminService.emailAlreadyTaken,
                    statusCode: constants_1.statusCodes.badRequest
                }
            };
        }
        // checking phone availability
        const existingAdminWithThisPhone = yield admin_1.default.findOne({ phone }).exec();
        if (existingAdminWithThisPhone) {
            return {
                success: false,
                error: {
                    message: constants_1.errorMessages.adminService.phoneAlreadyTaken,
                    statusCode: constants_1.statusCodes.badRequest
                }
            };
        }
        const createdAdmin = yield admin_1.default.create({
            isSuperAdmin,
            email,
            password: (0, encryption_1.encrypt)(password),
            phone,
            code,
            name,
            permissions
        });
        yield report_1.default.create({
            admin: adminId,
            ip,
            event: 'createAdmin',
            createdAdmin
        });
        return {
            success: true,
            outputs: {
                admin: createdAdmin
            }
        };
    }
    catch (error) {
        console.log('Error while creating new admin: ', error);
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
const createGodAdmin = (godAdmin) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // checking godAdmin existence
        const existingGodAdmin = yield admin_1.default.findOne({ isGodAdmin: true }).exec();
        if (existingGodAdmin) {
            return {
                success: false,
                error: {
                    message: constants_1.errorMessages.adminService.godAdminAlreadyExists,
                    statusCode: constants_1.statusCodes.badRequest
                }
            };
        }
        godAdmin.password = (0, encryption_1.encrypt)(godAdmin.password);
        const createdGodAdmin = yield admin_1.default.create(godAdmin);
        yield siteInfo_1.default.create({ websiteName: constants_1.websiteName });
        return {
            success: true,
            outputs: {
                godAdmin: createdGodAdmin
            }
        };
    }
    catch (error) {
        console.log('Error while creating new admin: ', error);
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
const login = (email, password, reportDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ip } = reportDetails;
        const admin = yield admin_1.default.findOne({ email }).exec();
        if (!admin || password !== (0, encryption_1.decrypt)(admin.password)) {
            return {
                success: false,
                error: {
                    message: constants_1.errorMessages.adminService.incorrectCredentials,
                    statusCode: constants_1.statusCodes.badRequest
                }
            };
        }
        const token = (0, token_1.generateToken)(admin._id, "admin");
        yield admin_1.default.findByIdAndUpdate(admin._id, { $push: { tokens: token } }).exec();
        yield report_1.default.create({
            admin: admin._id,
            ip,
            event: 'login'
        });
        return {
            success: true,
            outputs: {
                admin,
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
const logout = (token, reportDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // popping old token from tokens list
        const { adminId, ip } = reportDetails;
        yield admin_1.default.findOneAndUpdate({ tokens: token }, { $pull: { tokens: token } }).exec();
        yield report_1.default.create({
            admin: adminId,
            ip,
            event: 'logout'
        });
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
//---------------------------------------------
const forgetPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield admin_1.default.findOne({ email }).exec();
        if (!admin) {
            return {
                success: false,
                error: {
                    message: constants_1.errorMessages.adminService.emailNotFound,
                    statusCode: constants_1.statusCodes.notFound
                }
            };
        }
        // TODO: send an email
        return {
            success: true
        };
    }
    catch (error) {
        console.log('Error while loging out: ', error);
        return {
            success: false,
            error: {
                message: constants_1.errorMessages.shared.ise,
                statusCode: constants_1.statusCodes.ise
            }
        };
    }
});
//---------------------------------------------
const changePassword = (adminId, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield admin_1.default.findByIdAndUpdate(adminId, { $set: { password: (0, encryption_1.encrypt)(newPassword) } }).exec();
        return {
            success: true
        };
    }
    catch (error) {
        console.log('Error while changing password: ', error);
        return {
            success: false,
            error: {
                message: constants_1.errorMessages.shared.ise,
                statusCode: constants_1.statusCodes.ise
            }
        };
    }
});
//---------------------------------------------
const getAdmin = (adminId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield admin_1.default.findById(adminId);
        if (!admin) {
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
                admin
            }
        };
    }
    catch (error) {
        console.log('Error while getting admin: ', error);
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
const editAdmin = (adminId, adminUpdates, currentAdminIsGodAdmin) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // checking adminUpdates object to not be empty
        if (Object.keys(adminUpdates).length == 0) {
            return {
                success: false,
                error: {
                    message: constants_1.errorMessages.shared.noChanges,
                    statusCode: constants_1.statusCodes.badRequest
                }
            };
        }
        // checking godAdmin permissions
        if ('isSuperAdmin' in adminUpdates && !currentAdminIsGodAdmin) {
            return {
                success: false,
                error: {
                    message: constants_1.errorMessages.adminService.godAdminRoleRequired,
                    statusCode: constants_1.statusCodes.badRequest
                }
            };
        }
        // checking email availability
        if (adminUpdates.email) {
            const existingAdminWithThisEmail = yield admin_1.default.findOne({ email: adminUpdates.email }).exec();
            if (existingAdminWithThisEmail) {
                return {
                    success: false,
                    error: {
                        message: constants_1.errorMessages.adminService.emailAlreadyTaken,
                        statusCode: constants_1.statusCodes.badRequest
                    }
                };
            }
        }
        // checking phone availability
        if (adminUpdates.phone) {
            const existingAdminWithThisPhone = yield admin_1.default.findOne({ phone: adminUpdates.phone }).exec();
            if (existingAdminWithThisPhone) {
                return {
                    success: false,
                    error: {
                        message: constants_1.errorMessages.adminService.phoneAlreadyTaken,
                        statusCode: constants_1.statusCodes.badRequest
                    }
                };
            }
        }
        // checking code availability
        if (adminUpdates.code) {
            const existingAdminWithThisCode = yield admin_1.default.findOne({ code: adminUpdates.code }).exec();
            if (existingAdminWithThisCode) {
                return {
                    success: false,
                    error: {
                        message: constants_1.errorMessages.adminService.codeAlreadyTaken,
                        statusCode: constants_1.statusCodes.badRequest
                    }
                };
            }
        }
        const updatedAdmin = yield admin_1.default.findByIdAndUpdate(adminId, adminUpdates, { new: true }).exec();
        if (!updatedAdmin) {
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
                admin: updatedAdmin
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
const editCurrentAdmin = (adminId, adminUpdates) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // checking adminUpdates object to not be empty
        if (Object.keys(adminUpdates).length == 0) {
            return {
                success: false,
                error: {
                    message: constants_1.errorMessages.shared.noChanges,
                    statusCode: constants_1.statusCodes.badRequest
                }
            };
        }
        // checking email availability
        if (adminUpdates.email) {
            const existingAdminWithThisEmail = yield admin_1.default.findOne({ email: adminUpdates.email }).exec();
            if (existingAdminWithThisEmail) {
                return {
                    success: false,
                    error: {
                        message: constants_1.errorMessages.adminService.emailAlreadyTaken,
                        statusCode: constants_1.statusCodes.badRequest
                    }
                };
            }
        }
        // checking phone availability
        if (adminUpdates.phone) {
            const existingAdminWithThisPhone = yield admin_1.default.findOne({ phone: adminUpdates.phone }).exec();
            if (existingAdminWithThisPhone) {
                return {
                    success: false,
                    error: {
                        message: constants_1.errorMessages.adminService.phoneAlreadyTaken,
                        statusCode: constants_1.statusCodes.badRequest
                    }
                };
            }
        }
        // checking code availability
        if (adminUpdates.code) {
            const existingAdminWithThisCode = yield admin_1.default.findOne({ code: adminUpdates.code }).exec();
            if (existingAdminWithThisCode) {
                return {
                    success: false,
                    error: {
                        message: constants_1.errorMessages.adminService.codeAlreadyTaken,
                        statusCode: constants_1.statusCodes.badRequest
                    }
                };
            }
        }
        const updatedAdmin = yield admin_1.default.findByIdAndUpdate(adminId, adminUpdates, { new: true }).exec();
        if (!updatedAdmin) {
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
                admin: updatedAdmin
            }
        };
    }
    catch (error) {
        console.log('Error while updating current admin: ', error);
        return {
            success: false,
            error: {
                message: constants_1.errorMessages.shared.ise,
                statusCode: constants_1.statusCodes.ise
            }
        };
    }
});
//----------------------------------------------------------------
const deleteAdmins = (currentAdminIsGodAdmin, idList, reportDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = {
            _id: { $in: idList },
            isGodAdmin: false
        };
        const { adminId, ip } = reportDetails;
        const admins = yield admin_1.default.find(filter);
        const isSuperAdminInAdmins = !admins.every((admin) => {
            return admin.isSuperAdmin === false;
        });
        // checking godAdmin permissions
        if (!currentAdminIsGodAdmin && isSuperAdminInAdmins) {
            return {
                success: false,
                error: {
                    message: constants_1.errorMessages.adminService.godAdminRoleRequired,
                    statusCode: constants_1.statusCodes.badRequest
                }
            };
        }
        // deleting admins
        for (const admin of admins) {
            const deletedAdmin = yield admin_1.default.findByIdAndDelete(admin._id).exec();
            if (deletedAdmin) {
                yield report_1.default.create({
                    admin: adminId,
                    ip,
                    event: 'deleteAdmin',
                    deletedAdmin: deletedAdmin.name
                });
            }
        }
        return {
            success: true
        };
    }
    catch (error) {
        console.log('Error while deleting admins: ', error);
        return {
            success: false,
            error: {
                message: constants_1.errorMessages.shared.ise,
                statusCode: constants_1.statusCodes.ise
            }
        };
    }
});
//---------------------------------------------
const getAdmins = (options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit, skip, sortBy, sortOrder, search } = options;
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
        if (search) {
            filter.name = { $regex: search };
        }
        // Fetch the admins
        const count = yield admin_1.default.countDocuments(filter);
        const admins = yield admin_1.default.find(filter, {}, queryOptions).exec();
        return {
            success: true,
            outputs: {
                count,
                admins
            }
        };
    }
    catch (error) {
        console.log('Error while getting admins: ', error);
        return {
            success: false,
            error: {
                message: constants_1.errorMessages.shared.ise,
                statusCode: constants_1.statusCodes.ise
            }
        };
    }
});
//----------------------------------------------------------
exports.default = {
    addAdmin,
    createGodAdmin,
    login,
    logout,
    getAdmins,
    getAdmin,
    editAdmin,
    editCurrentAdmin,
    deleteAdmins,
    forgetPassword,
    changePassword
};
