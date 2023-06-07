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
const page_1 = __importDefault(require("./page"));
const image_service_1 = __importDefault(require("../image/image.service"));
const constants_1 = require("../../../utils/constants");
const addPage = (newPage) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, summary, author, content, show, tags, categorys, cover } = newPage;
        // checking title availability
        const existingPage = yield page_1.default.findOne({ title }).exec();
        if (existingPage) {
            return {
                success: false,
                error: {
                    message: constants_1.errorMessages.pageService.titleAlreadyTaken,
                    statusCode: constants_1.statusCodes.badRequest
                }
            };
        }
        // Storing image in the database
        let coverUrl = null;
        if (cover) {
            const result = yield image_service_1.default.storeImage(cover.format, cover.data);
            if (!result.success) {
                return {
                    success: false,
                    error: {
                        message: constants_1.errorMessages.siteInfo.imageProblem,
                        statusCode: constants_1.statusCodes.ise
                    }
                };
            }
            coverUrl = result.imageUrl;
        }
        let createdPage = yield page_1.default.create({
            title,
            summary,
            author,
            content,
            show,
            tags,
            categorys,
            cover: coverUrl
        });
        return {
            success: true,
            outputs: {
                page: createdPage
            }
        };
    }
    catch (error) {
        console.log('Error while creating a new page: ', error);
        return {
            success: false,
            error: {
                message: constants_1.errorMessages.shared.ise,
                statusCode: constants_1.statusCodes.ise
            }
        };
    }
});
//-------------------------------------------------
const getPage = (pageId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = {
            $inc: {
                view: 1
            }
        };
        const page = yield page_1.default.findByIdAndUpdate(pageId, update, { new: true }).exec();
        if (!page) {
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
                page
            }
        };
    }
    catch (error) {
        console.log('Error while getting page: ', error);
        return {
            success: false,
            error: {
                message: constants_1.errorMessages.shared.ise,
                statusCode: constants_1.statusCodes.ise
            }
        };
    }
});
//-------------------------------------------------
const getPages = (options) => __awaiter(void 0, void 0, void 0, function* () {
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
            filter.title = { $regex: search };
        }
        // Fetch the pages
        const count = yield page_1.default.countDocuments(filter);
        let pages = yield page_1.default.find(filter, {}, queryOptions).exec();
        return {
            success: true,
            outputs: {
                pages,
                count
            }
        };
    }
    catch (error) {
        console.log('Error while getting pages: ', error);
        return {
            success: false,
            error: {
                message: constants_1.errorMessages.shared.ise,
                statusCode: constants_1.statusCodes.ise
            }
        };
    }
});
//-------------------------------------------------
const getPagesByCategory = (categoryValue, options) => __awaiter(void 0, void 0, void 0, function* () {
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
        const filter = { categorys: categoryValue };
        if (search) {
            filter.title = { $regex: search };
        }
        // Fetch the pages
        const count = yield page_1.default.countDocuments(filter);
        let pages = yield page_1.default.find(filter, {}, queryOptions).exec();
        return {
            success: true,
            outputs: {
                pages,
                count
            }
        };
    }
    catch (error) {
        console.log('Error while getting pages: ', error);
        return {
            success: false,
            error: {
                message: constants_1.errorMessages.shared.ise,
                statusCode: constants_1.statusCodes.ise
            }
        };
    }
});
//-------------------------------------------------
const getPagesByTag = (tagValue, options) => __awaiter(void 0, void 0, void 0, function* () {
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
        const filter = { tags: tagValue };
        if (search) {
            filter.title = { $regex: search };
        }
        // Fetch the pages
        const count = yield page_1.default.countDocuments(filter);
        let pages = yield page_1.default.find(filter, {}, queryOptions).exec();
        return {
            success: true,
            outputs: {
                pages,
                count
            }
        };
    }
    catch (error) {
        console.log('Error while getting pages: ', error);
        return {
            success: false,
            error: {
                message: constants_1.errorMessages.shared.ise,
                statusCode: constants_1.statusCodes.ise
            }
        };
    }
});
//-------------------------------------------------
const editPage = (pageId, updates) => __awaiter(void 0, void 0, void 0, function* () {
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
        const page = yield page_1.default.findById(pageId).exec();
        if (!page) {
            return {
                success: false,
                error: {
                    message: constants_1.errorMessages.shared.notFound,
                    statusCode: constants_1.statusCodes.notFound
                }
            };
        }
        // checking title availability
        if (updates.title) {
            const existingPage = yield page_1.default.findOne({ title: updates.title }).exec();
            if (existingPage) {
                return {
                    success: false,
                    error: {
                        message: constants_1.errorMessages.pageService.titleAlreadyTaken,
                        statusCode: constants_1.statusCodes.badRequest
                    }
                };
            }
        }
        // Store new image in database
        if (updates.cover) {
            yield image_service_1.default.updateImage(page.cover, updates.cover.format, updates.cover.data);
            delete updates.cover;
        }
        const updatedPage = yield page_1.default.findByIdAndUpdate(pageId, updates, { new: true }).exec();
        /*console.log(updatedPage)*/
        return {
            success: true,
            outputs: {
                page: updatedPage
            }
        };
    }
    catch (error) {
        console.log('Error while editing a page: ', error);
        return {
            success: false,
            error: {
                message: constants_1.errorMessages.shared.ise,
                statusCode: constants_1.statusCodes.ise
            }
        };
    }
});
//-------------------------------------------------
const deletePages = (idList) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // deleting pages and their cover image
        for (const id of idList) {
            const page = yield page_1.default.findByIdAndDelete(id);
            if (page) {
                yield image_service_1.default.deleteImage(page.cover);
            }
        }
        return {
            success: true
        };
    }
    catch (error) {
        console.log('Error while deleting pages: ', error);
        return {
            success: false,
            error: {
                message: constants_1.errorMessages.shared.ise,
                statusCode: constants_1.statusCodes.ise
            }
        };
    }
});
//-------------------------------------------------
const getTags = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch the pages
        const pages = yield page_1.default.find({}).exec();
        const tags = [];
        pages.forEach((page) => {
            page.tags.forEach((tag) => {
                if (!tags.includes(tag)) {
                    tags.push(tag);
                }
            });
        });
        return {
            success: true,
            outputs: {
                tags
            }
        };
    }
    catch (error) {
        console.log('Error while getting tags: ', error);
        return {
            success: false,
            error: {
                message: constants_1.errorMessages.shared.ise,
                statusCode: constants_1.statusCodes.ise
            }
        };
    }
});
//-------------------------------------------------
const getCategorys = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch the pages
        const pages = yield page_1.default.find({}).exec();
        const categorys = [];
        pages.forEach((page) => {
            page.categorys.forEach((category) => {
                if (!categorys.includes(category)) {
                    categorys.push(category);
                }
            });
        });
        return {
            success: true,
            outputs: {
                categorys
            }
        };
    }
    catch (error) {
        console.log('Error while getting tags: ', error);
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
    addPage,
    getPage,
    getPages,
    getPagesByCategory,
    getPagesByTag,
    editPage,
    deletePages,
    getTags,
    getCategorys
};
