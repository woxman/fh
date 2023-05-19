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
const property_1 = __importDefault(require("./property"));
const constants_1 = require("../../../utils/constants");
const subcategory_1 = __importDefault(require("../subcategory/subcategory"));
const product_1 = __importDefault(require("../product/product"));
const addProperty = (newProperty) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, values } = newProperty;
        // Checking for availability
        const existingProperty = yield property_1.default.findOne({ name }).exec();
        if (existingProperty) {
            return {
                success: false,
                error: {
                    statusCode: constants_1.statusCodes.badRequest,
                    message: constants_1.errorMessages.shared.nameMustBeUnique
                }
            };
        }
        // Creating the new property
        const addedProperty = yield property_1.default.create({ name, values });
        return {
            success: true,
            outputs: {
                property: addedProperty
            }
        };
    }
    catch (error) {
        console.log('Error while creating the new property: ', error);
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
const getProperty = (propertyId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find and return the property
        const property = yield property_1.default.findById(propertyId).exec();
        if (!property) {
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
                property
            }
        };
    }
    catch (error) {
        console.log('Error while getting the property: ', error);
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
const getProperties = (options) => __awaiter(void 0, void 0, void 0, function* () {
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
        // Fetch the properties
        const count = yield property_1.default.countDocuments(filter);
        let properties = yield property_1.default.find(filter, {}, queryOptions).exec();
        return {
            success: true,
            outputs: {
                count,
                properties
            }
        };
    }
    catch (error) {
        console.log('Error while getting the properties: ', error);
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
const editProperty = (propertyId, updates) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Make sure the record exists
        const property = yield property_1.default.findById(propertyId).exec();
        if (!property) {
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
            const existingProperty = yield property_1.default.findOne({ name }).exec();
            if (existingProperty) {
                return {
                    success: false,
                    error: {
                        statusCode: constants_1.statusCodes.badRequest,
                        message: constants_1.errorMessages.shared.nameMustBeUnique
                    }
                };
            }
        }
        // Update the property
        const updatedProperty = yield property_1.default.findByIdAndUpdate(propertyId, updates, { new: true }).exec();
        if (updates.name) {
            // Updating property name in products that have this property
            const filter = {
                'properties.name': property.name
            };
            const products = yield product_1.default.find(filter, { _id: 1 }).exec();
            for (const product of products) {
                const update = {
                    'properties.$[i].name': updates.name
                };
                const arrayFilters = [{ 'i.name': property.name }];
                yield product_1.default.findByIdAndUpdate(product._id, update, { arrayFilters }).exec();
            }
        }
        return {
            success: true,
            outputs: {
                property: updatedProperty
            }
        };
    }
    catch (error) {
        console.log('Error while updating the property: ', error);
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
const deleteProperties = (idList) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        for (const id of idList) {
            // Find and delete the property
            const deletedProperty = yield property_1.default.findByIdAndDelete(id).exec();
            if (deletedProperty) {
                // Find subcategories that have deleted property
                const filter = {
                    'properties.property': deletedProperty._id
                };
                const subcategories = yield subcategory_1.default.find(filter)
                    .populate('products', '_id').exec();
                for (const subcategory of subcategories) {
                    // Deleting the deleted property from subcategories
                    const subcategoryUpdate = {
                        $pull: {
                            properties: {
                                property: deletedProperty._id
                            }
                        }
                    };
                    yield subcategory_1.default.findByIdAndUpdate(subcategory._id, subcategoryUpdate);
                    for (const product of subcategory.products) {
                        // Deleting the deleted property from products
                        const productUpdate = {
                            $pull: {
                                properties: {
                                    name: deletedProperty.name
                                }
                            }
                        };
                        yield product_1.default.findByIdAndUpdate(product._id, productUpdate);
                    }
                }
            }
        }
        return {
            success: true
        };
    }
    catch (error) {
        console.log('Error while deleting the properties: ', error);
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
    addProperty,
    getProperties,
    getProperty,
    editProperty,
    deleteProperties
};
