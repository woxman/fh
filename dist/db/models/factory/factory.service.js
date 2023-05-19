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
const mongoose_1 = __importDefault(require("mongoose"));
const ObjectId = mongoose_1.default.Types.ObjectId;
const factory_1 = __importDefault(require("./factory"));
const constants_1 = require("../../../utils/constants");
const image_service_1 = __importDefault(require("../image/image.service"));
const product_service_1 = __importDefault(require("../product/product.service"));
const subcategory_1 = __importDefault(require("../subcategory/subcategory"));
const product_1 = __importDefault(require("../product/product"));
const addFactory = (newFactory) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, city, description, icon } = newFactory;
        // Checking for availability
        const existingFactory = yield factory_1.default.findOne({ name }).exec();
        if (existingFactory) {
            return {
                success: false,
                error: {
                    statusCode: constants_1.statusCodes.badRequest,
                    message: constants_1.errorMessages.shared.nameMustBeUnique
                }
            };
        }
        // Saving the image in the database
        const result = yield image_service_1.default.storeImage(icon.format, icon.data);
        if (!result.success) {
            return {
                success: false,
                error: {
                    statusCode: constants_1.statusCodes.ise,
                    message: constants_1.errorMessages.shared.ise
                }
            };
        }
        const iconUrl = result.imageUrl;
        // Creating the new factory
        const addedFactory = yield factory_1.default.create({
            name,
            city,
            description,
            icon: iconUrl
        });
        return {
            success: true,
            outputs: {
                factory: addedFactory
            }
        };
    }
    catch (error) {
        console.log('Error while creating the new factory: ', error);
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
const getFactory = (factoryId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find and return the factory
        const factory = yield factory_1.default.findById(factoryId).exec();
        if (!factory) {
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
            outputs: { factory }
        };
    }
    catch (error) {
        console.log('Error while getting the factory: ', error);
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
const getFactories = (options) => __awaiter(void 0, void 0, void 0, function* () {
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
        // Fetch the factories
        const count = yield factory_1.default.countDocuments(filter);
        let factories = yield factory_1.default.find(filter, {}, queryOptions).exec();
        return {
            success: true,
            outputs: {
                count,
                factories
            }
        };
    }
    catch (error) {
        console.log('Error while getting the factories: ', error);
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
const getFactoriesBySubcategoryId = (subcategoryId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Checking if subcategory exists
        const subcategory = yield subcategory_1.default.findById(subcategoryId).exec();
        if (!subcategory) {
            return {
                success: false,
                error: {
                    statusCode: constants_1.statusCodes.notFound,
                    message: constants_1.errorMessages.shared.notFound
                }
            };
        }
        const factories = [];
        const products = yield product_1.default.find({ subcategory: subcategoryId }, { _id: 1, factory: 1 })
            .populate('factory', '_id name').exec();
        products.forEach((product) => {
            const factoryExistsInList = factories.find((factory) => {
                if (!('_id' in product.factory))
                    return; // This is for ts type error
                if (factory._id == product.factory._id.toString()) {
                    return true;
                }
            });
            if (!factoryExistsInList) {
                if (!('_id' in product.factory))
                    return; // This is for ts type error
                factories.push({
                    _id: product.factory._id.toString(),
                    name: product.factory.name
                });
            }
        });
        return {
            success: true,
            outputs: {
                factories
            }
        };
    }
    catch (error) {
        console.log('Error while getting the factories by subcategoryId: ', error);
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
const editFactory = (factoryId, updates) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Make sure the record exists
        const factory = yield factory_1.default.findById(factoryId).exec();
        if (!factory) {
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
        // Checking for availability
        if (updates.name) {
            const { name } = updates;
            const existingFactory = yield factory_1.default.findOne({ name }).exec();
            if (existingFactory) {
                return {
                    success: false,
                    error: {
                        statusCode: constants_1.statusCodes.badRequest,
                        message: constants_1.errorMessages.shared.nameMustBeUnique
                    }
                };
            }
        }
        // Store the new image in database
        if (updates.icon) {
            const result = yield image_service_1.default.updateImage(factory.icon, updates.icon.format, updates.icon.data);
            if (!result.success) {
                return {
                    success: false,
                    error: {
                        statusCode: constants_1.statusCodes.ise,
                        message: constants_1.errorMessages.shared.ise
                    }
                };
            }
            delete updates.icon;
        }
        // Update the factory
        const updatedFactory = yield factory_1.default.findByIdAndUpdate(factoryId, updates, { new: true }).exec();
        return {
            success: true,
            outputs: {
                factory: updatedFactory
            }
        };
    }
    catch (error) {
        console.log('Error while updating the factory: ', error);
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
const deleteFactories = (idList) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        for (const id of idList) {
            // Find and delete the factory
            const deletedFactory = yield factory_1.default.findByIdAndDelete(id).exec();
            if (deletedFactory) {
                // Delete the potential icon
                yield image_service_1.default.deleteImage(deletedFactory.icon);
                // Removing all the products with this factory
                const productIds = deletedFactory.products.map((product) => product._id.toString());
                yield product_service_1.default.deleteProducts(productIds);
            }
        }
        return {
            success: true
        };
    }
    catch (error) {
        console.log('Error while deleting the factories: ', error);
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
    addFactory,
    getFactory,
    getFactories,
    getFactoriesBySubcategoryId,
    editFactory,
    deleteFactories
};
