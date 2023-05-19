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
const category_1 = __importDefault(require("./category"));
const constants_1 = require("../../../utils/constants");
const image_service_1 = __importDefault(require("../image/image.service"));
const siteInfo_1 = __importDefault(require("../siteInfo/siteInfo"));
const constants_2 = require("../../../utils/constants");
const subcategory_service_1 = __importDefault(require("../subcategory/subcategory.service"));
const addCategory = (newCategory) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, urlSlug, description, icon } = newCategory;
        // Checking for availability
        const categoryWithExistingName = yield category_1.default.findOne({ name }).exec();
        if (categoryWithExistingName) {
            return {
                success: false,
                error: {
                    statusCode: constants_1.statusCodes.badRequest,
                    message: constants_1.errorMessages.shared.nameMustBeUnique
                }
            };
        }
        const categoryWithExistingSlug = yield category_1.default.findOne({ urlSlug }).exec();
        if (categoryWithExistingSlug) {
            return {
                success: false,
                error: {
                    statusCode: constants_1.statusCodes.badRequest,
                    message: constants_1.errorMessages.shared.slugMustBeUnique
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
        // Creating the new category
        const addedCategory = yield category_1.default.create({
            name,
            urlSlug,
            description,
            icon: iconUrl
        });
        return {
            success: true,
            outputs: {
                category: addedCategory
            }
        };
    }
    catch (error) {
        console.log('Error while creating the new category: ', error);
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
const getCategory = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find and return the category
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
        return {
            success: true,
            outputs: {
                category
            }
        };
    }
    catch (error) {
        console.log('Error while getting the category: ', error);
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
const getCategories = (options) => __awaiter(void 0, void 0, void 0, function* () {
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
        // Fetch the categories
        const count = yield category_1.default.countDocuments(filter);
        let categories = yield category_1.default.find(filter, {}, queryOptions).exec();
        return {
            success: true,
            outputs: {
                count,
                categories
            }
        };
    }
    catch (error) {
        console.log('Error while getting the categories: ', error);
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
const editCategory = (categoryId, updates) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Make sure the record exists
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
            const categoryWithExistingName = yield category_1.default.findOne({ name }).exec();
            if (categoryWithExistingName) {
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
            const categoryWithExistingSlug = yield category_1.default.findOne({ urlSlug }).exec();
            if (categoryWithExistingSlug) {
                return {
                    success: false,
                    error: {
                        statusCode: constants_1.statusCodes.badRequest,
                        message: constants_1.errorMessages.shared.slugMustBeUnique
                    }
                };
            }
        }
        // Store the new image in database
        if (updates.icon) {
            const result = yield image_service_1.default.updateImage(category.icon, updates.icon.format, updates.icon.data);
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
        // Update the category
        const updatedCategory = yield category_1.default.findByIdAndUpdate(categoryId, updates, { new: true }).exec();
        return {
            success: true,
            outputs: {
                category: updatedCategory
            }
        };
    }
    catch (error) {
        console.log('Error while updating the category: ', error);
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
const deleteCategories = (idList) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        for (const id of idList) {
            // Find and delete the category
            const deletedCategory = yield category_1.default.findByIdAndDelete(id)
                .populate('subcategories', '_id').exec();
            if (deletedCategory) {
                // Deleting the icon of the deleted category
                yield image_service_1.default.deleteImage(deletedCategory.icon);
                // Deleting all subcategories of deleted category
                const subcategoryIds = deletedCategory.subcategories.map((subcategory) => subcategory._id.toString());
                yield subcategory_service_1.default.deleteSubcategories(subcategoryIds);
                // set category field of experts that are related to this category
                const siteInfo = yield siteInfo_1.default.findOne({ websiteName: constants_2.websiteName }).exec();
                if (!siteInfo) {
                    return {
                        success: true
                    };
                }
                const experts = siteInfo.contactUs.experts;
                experts.forEach((_, index) => {
                    var _a;
                    if (((_a = experts[index].category) === null || _a === void 0 ? void 0 : _a.toString()) == id) {
                        delete experts[index].category;
                    }
                });
                const update = {
                    'contactUs.experts': experts
                };
                yield siteInfo_1.default.findOneAndUpdate({ websiteName: constants_2.websiteName }, update).exec();
            }
        }
        return {
            success: true
        };
    }
    catch (error) {
        console.log('Error while deleting the categories: ', error);
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
    addCategory,
    getCategory,
    getCategories,
    editCategory,
    deleteCategories
};
