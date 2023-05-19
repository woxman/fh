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
const subcategory_1 = __importDefault(require("./subcategory"));
const constants_1 = require("../../../utils/constants");
const category_1 = __importDefault(require("../category/category"));
const property_1 = __importDefault(require("../property/property"));
const product_1 = __importDefault(require("../product/product"));
const product_service_1 = __importDefault(require("../product/product.service"));
const addSubcategory = (categoryId, newSubcategory) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, urlSlug, description, properties } = newSubcategory;
        // Checking for availability
        const subcategoryWithExistingName = yield subcategory_1.default.findOne({ name }).exec();
        if (subcategoryWithExistingName) {
            return {
                success: false,
                error: {
                    statusCode: constants_1.statusCodes.badRequest,
                    message: constants_1.errorMessages.shared.nameMustBeUnique
                }
            };
        }
        const subcategoryWithExistingSlug = yield subcategory_1.default.findOne({ urlSlug }).exec();
        if (subcategoryWithExistingSlug) {
            return {
                success: false,
                error: {
                    statusCode: constants_1.statusCodes.badRequest,
                    message: constants_1.errorMessages.shared.slugMustBeUnique
                }
            };
        }
        // Check if the category exists
        const category = yield category_1.default.findById(categoryId).exec();
        if (!category) {
            return {
                success: false,
                error: {
                    statusCode: constants_1.statusCodes.notFound,
                    message: constants_1.errorMessages.shared.notFound
                }
            };
        }
        // Check if all the properties exist
        let allPropertiesExist = true;
        for (const item of properties) {
            const propertyExist = yield property_1.default.findById(item.property).exec();
            if (!propertyExist) {
                allPropertiesExist = false;
                break;
            }
        }
        if (!allPropertiesExist) {
            return {
                success: false,
                error: {
                    statusCode: constants_1.statusCodes.badRequest,
                    message: constants_1.errorMessages.subcategoryService.notAllPropertiesExist
                }
            };
        }
        // Creating the new subcategory
        let addedSubcategory = yield subcategory_1.default.create({
            name,
            category: categoryId,
            urlSlug,
            properties,
            description
        });
        // Populate category
        addedSubcategory = yield addedSubcategory
            .populate('category', '_id name');
        // Populate properties
        addedSubcategory = yield addedSubcategory
            .populate('properties.property', '_id name values');
        return {
            success: true,
            outputs: {
                subcategory: addedSubcategory
            }
        };
    }
    catch (error) {
        console.log('Error while creating the new subcategory: ', error);
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
const getSubcategory = (subcategoryId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find and return the subcategory
        const subcategory = yield subcategory_1.default.findById(subcategoryId)
            .populate('category', '_id name')
            .populate('properties.property', '_id name values')
            .exec();
        if (!subcategory) {
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
                subcategory
            }
        };
    }
    catch (error) {
        console.log('Error while getting the subcategory: ', error);
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
const getSubcategories = (options) => __awaiter(void 0, void 0, void 0, function* () {
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
        // Fetch the subcategories
        const count = yield subcategory_1.default.countDocuments(filter);
        let subcategories = yield subcategory_1.default.find(filter, {}, queryOptions)
            .populate('category', '_id name')
            .populate('properties.property', '_id name values')
            .exec();
        return {
            success: true,
            outputs: {
                count,
                subcategories
            }
        };
    }
    catch (error) {
        console.log('Error while getting the subcategories: ', error);
        return {
            success: false,
            error: {
                statusCode: constants_1.statusCodes.ise,
                message: constants_1.errorMessages.shared.ise
            }
        };
    }
});
//---------------------------------------------------------------------------
const getSubcategoriesByCategoryId = (categoryId, options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if the category exists
        const relatedCategory = yield category_1.default.findById(categoryId).exec();
        if (!relatedCategory) {
            return {
                success: false,
                error: {
                    statusCode: constants_1.statusCodes.notFound,
                    message: constants_1.errorMessages.shared.notFound
                }
            };
        }
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
        const filter = { category: categoryId };
        if (search) {
            filter.name = { $regex: search };
        }
        // Fetch the subcategories
        const count = yield subcategory_1.default.countDocuments(filter);
        let subcategories = yield subcategory_1.default.find(filter, {}, queryOptions)
            .populate('category', '_id name description icon')
            .populate('properties.property', '_id name values')
            .exec();
        return {
            success: true,
            outputs: {
                count,
                subcategories
            }
        };
    }
    catch (error) {
        console.log('Error while getting the subcategories by category id: ', error);
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
const editSubcategory = (subcategoryId, updates) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Make sure the record exists
        const subcategory = yield subcategory_1.default.findById(subcategoryId)
            .populate('properties.property', '_id name')
            .populate('products', '_id').exec();
        if (!subcategory) {
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
            const subcategoryWithExistingName = yield subcategory_1.default.findOne({ name }).exec();
            if (subcategoryWithExistingName) {
                return {
                    success: false,
                    error: {
                        statusCode: constants_1.statusCodes.badRequest,
                        message: constants_1.errorMessages.shared.nameMustBeUnique
                    }
                };
            }
        }
        if (updates.urlSlug) {
            const { urlSlug } = updates;
            const subcategoryWithExistingSlug = yield subcategory_1.default.findOne({ urlSlug }).exec();
            if (subcategoryWithExistingSlug) {
                return {
                    success: false,
                    error: {
                        statusCode: constants_1.statusCodes.badRequest,
                        message: constants_1.errorMessages.shared.slugMustBeUnique
                    }
                };
            }
        }
        if (updates.properties) {
            // Check if all the properties exist
            const { properties } = updates;
            let allPropertiesExist = true;
            for (const item of properties) {
                const propertyExist = yield property_1.default.findById(item.property).exec();
                if (!propertyExist) {
                    allPropertiesExist = false;
                    break;
                }
            }
            if (!allPropertiesExist) {
                return {
                    success: false,
                    error: {
                        statusCode: constants_1.statusCodes.badRequest,
                        message: constants_1.errorMessages.subcategoryService.notAllPropertiesExist
                    }
                };
            }
        }
        // Update the subcategory
        const updatedSubcategory = yield subcategory_1.default.findByIdAndUpdate(subcategoryId, updates, { new: true })
            .populate('category', '_id name')
            .populate('properties.property', '_id name values')
            .exec();
        if (updates.properties) {
            const newPropertiesIdList = updates.properties.map((updateProperty) => {
                return updateProperty.property;
            });
            // Listing deleted properties
            const deletedProperties = [];
            subcategory.properties.forEach((property) => {
                // It's for avoiding typescript errors (Logically it's always true)
                if (!('_id' in property.property))
                    return;
                const propertyId = property.property._id.toString();
                if (!newPropertiesIdList.includes(propertyId)) {
                    deletedProperties.push(property.property);
                }
            });
            // Deleting deleted properties from products
            for (const product of subcategory.products) {
                for (const deletedProperty of deletedProperties) {
                    const update = {
                        $pull: {
                            properties: {
                                name: deletedProperty.name
                            }
                        }
                    };
                    yield product_1.default.findByIdAndUpdate(product._id, update).exec();
                }
            }
        }
        return {
            success: true,
            outputs: {
                updatedSubcategory
            }
        };
    }
    catch (error) {
        console.log('Error while updating the subcategory: ', error);
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
const deleteSubcategories = (idList) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        for (const id of idList) {
            // Find and delete the subcategory
            const deletedSubcategory = yield subcategory_1.default.findByIdAndDelete(id)
                .populate('products', '_id').exec();
            if (deletedSubcategory) {
                // Deleting all products of this subcategory
                const productIds = deletedSubcategory.products.map((product) => product._id.toString());
                yield product_service_1.default.deleteProducts(productIds);
            }
        }
        return {
            success: true
        };
    }
    catch (error) {
        console.log('Error while deleting the subcategories: ', error);
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
    addSubcategory,
    getSubcategory,
    getSubcategories,
    getSubcategoriesByCategoryId,
    editSubcategory,
    deleteSubcategories
};
