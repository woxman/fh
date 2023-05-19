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
const siteInfo_1 = __importDefault(require("./siteInfo"));
const image_service_1 = __importDefault(require("../image/image.service"));
const constants_1 = require("../../../utils/constants");
const mongoose_1 = __importDefault(require("mongoose"));
const ObjectId = mongoose_1.default.Types.ObjectId;
const updatePageContent = (newPageContent) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { title, content, quotation, image } = newPageContent;
        const siteInfo = yield siteInfo_1.default.findOne({ websiteName: constants_1.websiteName }).exec();
        const existingImage = siteInfo === null || siteInfo === void 0 ? void 0 : siteInfo.aboutUs.pageContent.image;
        const existingQuotationImage = siteInfo === null || siteInfo === void 0 ? void 0 : siteInfo.aboutUs.pageContent.quotation.image;
        // checking image
        if (typeof (image) !== "string") {
            // storing new image
            const result = yield image_service_1.default.storeImage(image.format, image.data);
            if (result.success && result.imageUrl) {
                // changing value of image to new value
                image = result.imageUrl;
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
            // deleting old image
            if (existingImage) {
                yield image_service_1.default.deleteImage(existingImage);
            }
        }
        else {
            if (existingImage !== image) {
                return {
                    success: false,
                    error: {
                        message: constants_1.errorMessages.siteInfo.imageMismatch,
                        statusCode: constants_1.statusCodes.badRequest
                    }
                };
            }
        }
        // checking quotation image
        if (typeof (quotation.image) !== "string") {
            // storing new quotation image
            const result = yield image_service_1.default.storeImage(quotation.image.format, quotation.image.data);
            if (result.success && result.imageUrl) {
                // changing value of image to new value
                quotation.image = result.imageUrl;
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
            // deleting old quotation image
            if (existingQuotationImage) {
                yield image_service_1.default.deleteImage(existingQuotationImage);
            }
        }
        else {
            if (existingQuotationImage !== quotation.image) {
                return {
                    success: false,
                    error: {
                        message: constants_1.errorMessages.siteInfo.imageMismatch,
                        statusCode: constants_1.statusCodes.badRequest
                    }
                };
            }
        }
        const update = {
            $set: {
                'aboutUs.pageContent': {
                    title,
                    content,
                    quotation,
                    image
                }
            }
        };
        const updatedSiteInfo = yield siteInfo_1.default.findOneAndUpdate({ websiteName: constants_1.websiteName }, update, { new: true });
        const updatedPageContent = updatedSiteInfo === null || updatedSiteInfo === void 0 ? void 0 : updatedSiteInfo.aboutUs.pageContent;
        return {
            success: true,
            outputs: {
                pageContent: updatedPageContent
            }
        };
    }
    catch (error) {
        console.log('Error while updating about us page content: ', error);
        return {
            success: false,
            error: {
                message: constants_1.errorMessages.shared.ise,
                statusCode: constants_1.statusCodes.ise
            }
        };
    }
});
//--------------------------------------------------------------------------------
const getPageContent = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const siteInfo = yield siteInfo_1.default.findOne({ websiteName: constants_1.websiteName }).exec();
        return {
            success: true,
            outputs: {
                pageContent: siteInfo === null || siteInfo === void 0 ? void 0 : siteInfo.aboutUs.pageContent
            }
        };
    }
    catch (error) {
        console.log('Error while getting about us page content: ', error);
        return {
            success: false,
            error: {
                message: constants_1.errorMessages.shared.ise,
                statusCode: constants_1.statusCodes.ise
            }
        };
    }
});
//--------------------------------------------------------------------------------
const addProject = (newProject) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, image } = newProject;
        // checking title availability
        const filter = {
            websiteName: constants_1.websiteName,
            'aboutUs.projects.title': title
        };
        const existingProject = yield siteInfo_1.default.findOne(filter).exec();
        if (existingProject) {
            return {
                success: false,
                error: {
                    message: constants_1.errorMessages.siteInfo.titleIsTaken,
                    statusCode: constants_1.statusCodes.badRequest
                }
            };
        }
        const result = yield image_service_1.default.storeImage(image.format, image.data);
        if (!result.success) {
            return {
                success: false,
                error: {
                    message: constants_1.errorMessages.siteInfo.imageProblem,
                    statusCode: constants_1.statusCodes.ise
                }
            };
        }
        const update = {
            $push: {
                'aboutUs.projects': {
                    title,
                    description,
                    image: result.imageUrl
                }
            }
        };
        const updatedSiteInfo = yield siteInfo_1.default.findOneAndUpdate({ websiteName: constants_1.websiteName }, update, { new: true });
        const addedProject = updatedSiteInfo === null || updatedSiteInfo === void 0 ? void 0 : updatedSiteInfo.aboutUs.projects.find((project) => {
            return project.title == title;
        });
        return {
            success: true,
            outputs: {
                project: addedProject
            }
        };
    }
    catch (error) {
        console.log('Error while adding project: ', error);
        return {
            success: false,
            error: {
                message: constants_1.errorMessages.shared.ise,
                statusCode: constants_1.statusCodes.ise
            }
        };
    }
});
//--------------------------------------------------------------------------------
const getProject = (projectId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = {
            websiteName: constants_1.websiteName,
            'aboutUs.projects._id': new ObjectId(projectId)
        };
        const siteInfo = yield siteInfo_1.default.findOne(filter).exec();
        if (!siteInfo) {
            return {
                success: false,
                error: {
                    message: constants_1.errorMessages.shared.notFound,
                    statusCode: constants_1.statusCodes.notFound
                }
            };
        }
        const project = siteInfo.aboutUs.projects.find((project) => {
            return project._id.toString() == projectId;
        });
        return {
            success: true,
            outputs: {
                project
            }
        };
    }
    catch (error) {
        console.log('Error while getting project: ', error);
        return {
            success: false,
            error: {
                message: constants_1.errorMessages.shared.ise,
                statusCode: constants_1.statusCodes.ise
            }
        };
    }
});
//--------------------------------------------------------------------------------
const getProjects = (options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit, skip, sortBy, sortOrder, search } = options;
        const siteInfo = yield siteInfo_1.default.findOne({ websiteName: constants_1.websiteName }).exec();
        let projects = (siteInfo === null || siteInfo === void 0 ? void 0 : siteInfo.aboutUs.projects) || [];
        // Sort projects
        if (sortBy) {
            // This is for ts type error
            // Because of yup validation sortBy always has a valid value
            if (sortBy == 'title' || sortBy == 'createdAt') {
                projects.sort((a, b) => {
                    if (a[sortBy] > b[sortBy]) {
                        return sortOrder == 'desc' ? -1 : 1;
                    }
                    else if (a[sortBy] < b[sortBy]) {
                        return sortOrder == 'desc' ? 1 : -1;
                    }
                    else {
                        return 0;
                    }
                });
            }
        }
        if (search) {
            projects = projects.filter((project) => {
                return project.title.includes(search);
            });
        }
        const count = projects.length;
        if (skip) {
            projects = projects.slice(skip);
        }
        if (limit) {
            projects = projects.slice(0, limit);
        }
        return {
            success: true,
            outputs: {
                projects,
                count
            }
        };
    }
    catch (error) {
        console.log('Error while getting projects: ', error);
        return {
            success: false,
            error: {
                message: constants_1.errorMessages.shared.ise,
                statusCode: constants_1.statusCodes.ise
            }
        };
    }
});
//--------------------------------------------------------------------------------
const editProject = (projectId, updates) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (Object.keys(updates).length == 0) {
            return {
                success: false,
                error: {
                    message: constants_1.errorMessages.shared.noChanges,
                    statusCode: constants_1.statusCodes.badRequest
                }
            };
        }
        const filter = {
            websiteName: constants_1.websiteName,
            'aboutUs.projects._id': new ObjectId(projectId)
        };
        const siteInfo = yield siteInfo_1.default.findOne(filter).exec();
        if (!siteInfo) {
            return {
                success: false,
                error: {
                    message: constants_1.errorMessages.shared.notFound,
                    statusCode: constants_1.statusCodes.notFound
                }
            };
        }
        if (updates.title) {
            // checking step availability
            const filter = {
                websiteName: constants_1.websiteName,
                'aboutUs.projects.title': updates.title
            };
            const existingProject = yield siteInfo_1.default.findOne(filter).exec();
            if (existingProject) {
                return {
                    success: false,
                    error: {
                        message: constants_1.errorMessages.siteInfo.titleIsTaken,
                        statusCode: constants_1.statusCodes.badRequest
                    }
                };
            }
        }
        // Store new image in database
        if (updates.image) {
            const imageUrl = (_a = siteInfo.aboutUs.projects.find((project) => {
                return project._id.toString() == projectId;
            })) === null || _a === void 0 ? void 0 : _a.image;
            if (imageUrl) {
                yield image_service_1.default.updateImage(imageUrl, updates.image.format, updates.image.data);
            }
            delete updates.image;
        }
        const update = {};
        const updatesValues = Object.values(updates);
        Object.keys(updates).forEach((u, i) => {
            update[`aboutUs.projects.$[i].${u}`] = updatesValues[i];
        });
        const arrayFilters = [{ 'i._id': projectId }];
        const updatedSiteInfo = yield siteInfo_1.default.findOneAndUpdate(filter, update, { arrayFilters, new: true }).exec();
        const updatedProject = updatedSiteInfo === null || updatedSiteInfo === void 0 ? void 0 : updatedSiteInfo.aboutUs.projects.find((project) => {
            return project._id.toString() == projectId;
        });
        return {
            success: true,
            outputs: {
                project: updatedProject
            }
        };
    }
    catch (error) {
        console.log('Error while editing a project: ', error);
        return {
            success: false,
            error: {
                message: constants_1.errorMessages.shared.ise,
                statusCode: constants_1.statusCodes.ise
            }
        };
    }
});
//--------------------------------------------------------------------------------
const deleteProjects = (idList) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // deleting projects and their image
        for (const id of idList) {
            const update = {
                $pull: {
                    'aboutUs.projects': {
                        _id: new ObjectId(id)
                    }
                }
            };
            const siteInfo = yield siteInfo_1.default.findOneAndUpdate({ websiteName: constants_1.websiteName }, update);
            const deletedProject = siteInfo === null || siteInfo === void 0 ? void 0 : siteInfo.aboutUs.projects.find((project) => {
                return project._id.toString() == id;
            });
            if (deletedProject) {
                yield image_service_1.default.deleteImage(deletedProject.image);
            }
        }
        return {
            success: true
        };
    }
    catch (error) {
        console.log('Error while deleting projects: ', error);
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
    updatePageContent,
    getPageContent,
    addProject,
    getProject,
    getProjects,
    editProject,
    deleteProjects
};
