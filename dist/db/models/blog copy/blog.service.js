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
const blog_1 = __importDefault(require("./blog"));
const category_1 = __importDefault(require("../category/category"));
const image_service_1 = __importDefault(require("../image/image.service"));
const constants_1 = require("../../../utils/constants");
const addBlog = (newBlog) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, summary, author, content, show, tags, category, cover } = newBlog;
        // checking title availability
        const existingBlog = yield blog_1.default.findOne({ title }).exec();
        if (existingBlog) {
            return {
                success: false,
                error: {
                    message: constants_1.errorMessages.blogService.titleAlreadyTaken,
                    statusCode: constants_1.statusCodes.badRequest
                }
            };
        }
        // checking category existence
        const categoryExists = yield category_1.default.findById(category).exec();
        if (!categoryExists) {
            return {
                success: false,
                error: {
                    message: constants_1.errorMessages.categoryService.noSuchCategory,
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
        let createdBlog = yield blog_1.default.create({
            title,
            summary,
            author,
            content,
            show,
            tags,
            category,
            cover: coverUrl
        });
        createdBlog = yield createdBlog.populate('category', '_id name');
        return {
            success: true,
            outputs: {
                blog: createdBlog
            }
        };
    }
    catch (error) {
        console.log('Error while creating a new blog: ', error);
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
const getBlog = (blogId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = {
            $inc: {
                view: 1
            }
        };
        const blog = yield blog_1.default.findByIdAndUpdate(blogId, update, { new: true })
            .populate('category', '_id name').exec();
        if (!blog) {
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
                blog
            }
        };
    }
    catch (error) {
        console.log('Error while getting blog: ', error);
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
const getBlogs = (options) => __awaiter(void 0, void 0, void 0, function* () {
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
        // Fetch the blogs
        const count = yield blog_1.default.countDocuments(filter);
        let blogs = yield blog_1.default.find(filter, {}, queryOptions)
            .populate('category', '_id name').exec();
        return {
            success: true,
            outputs: {
                blogs,
                count
            }
        };
    }
    catch (error) {
        console.log('Error while getting blogs: ', error);
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
const getBlogsByCategoryId = (categoryId, options) => __awaiter(void 0, void 0, void 0, function* () {
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
        const filter = { category: categoryId };
        if (search) {
            filter.title = { $regex: search };
        }
        // Fetch the blogs
        const count = yield blog_1.default.countDocuments(filter);
        let blogs = yield blog_1.default.find(filter, {}, queryOptions)
            .populate('category', '_id name').exec();
        return {
            success: true,
            outputs: {
                blogs,
                count
            }
        };
    }
    catch (error) {
        console.log('Error while getting blogs: ', error);
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
const getBlogsByTag = (tagValue, options) => __awaiter(void 0, void 0, void 0, function* () {
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
        // Fetch the blogs
        const count = yield blog_1.default.countDocuments(filter);
        let blogs = yield blog_1.default.find(filter, {}, queryOptions)
            .populate('category', '_id name').exec();
        return {
            success: true,
            outputs: {
                blogs,
                count
            }
        };
    }
    catch (error) {
        console.log('Error while getting blogs: ', error);
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
const editBlog = (blogId, updates) => __awaiter(void 0, void 0, void 0, function* () {
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
        const blog = yield blog_1.default.findById(blogId).exec();
        if (!blog) {
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
            const existingBlog = yield blog_1.default.findOne({ title: updates.title }).exec();
            if (existingBlog) {
                return {
                    success: false,
                    error: {
                        message: constants_1.errorMessages.blogService.titleAlreadyTaken,
                        statusCode: constants_1.statusCodes.badRequest
                    }
                };
            }
        }
        if (updates.category) {
            // checking category existence
            const categoryExists = yield category_1.default.findById(updates.category).exec();
            if (!categoryExists) {
                return {
                    success: false,
                    error: {
                        message: constants_1.errorMessages.categoryService.noSuchCategory,
                        statusCode: constants_1.statusCodes.badRequest
                    }
                };
            }
        }
        // Store new image in database
        if (updates.cover) {
            yield image_service_1.default.updateImage(blog.cover, updates.cover.format, updates.cover.data);
            delete updates.cover;
        }
        const updatedBlog = yield blog_1.default.findByIdAndUpdate(blogId, updates, { new: true })
            .populate('category', '_id name').exec();
        console.log(updatedBlog);
        return {
            success: true,
            outputs: {
                blog: updatedBlog
            }
        };
    }
    catch (error) {
        console.log('Error while editing a blog: ', error);
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
const deleteBlogs = (idList) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // deleting blogs and their cover image
        for (const id of idList) {
            const blog = yield blog_1.default.findByIdAndDelete(id);
            if (blog) {
                yield image_service_1.default.deleteImage(blog.cover);
            }
        }
        return {
            success: true
        };
    }
    catch (error) {
        console.log('Error while deleting blogs: ', error);
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
        // Fetch the blogs
        const blogs = yield blog_1.default.find({}).exec();
        const tags = [];
        blogs.forEach((blog) => {
            blog.tags.forEach((tag) => {
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
exports.default = {
    addBlog,
    getBlog,
    getBlogs,
    getBlogsByCategoryId,
    getBlogsByTag,
    editBlog,
    deleteBlogs,
    getTags
};
