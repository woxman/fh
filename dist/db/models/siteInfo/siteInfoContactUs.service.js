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
const category_1 = __importDefault(require("../category/category"));
const image_service_1 = __importDefault(require("../image/image.service"));
const constants_1 = require("../../../utils/constants");
const mongoose_1 = __importDefault(require("mongoose"));
const ObjectId = mongoose_1.default.Types.ObjectId;
const updatePageContent = (newPageContent) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { email, phone, address, workHours, image } = newPageContent;
        const siteInfo = yield siteInfo_1.default.findOne({ websiteName: constants_1.websiteName }).exec();
        const existingImage = siteInfo === null || siteInfo === void 0 ? void 0 : siteInfo.contactUs.pageContent.image;
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
        const update = {
            $set: {
                'contactUs.pageContent': {
                    email,
                    phone,
                    address,
                    workHours,
                    image
                }
            }
        };
        const updatedSiteInfo = yield siteInfo_1.default.findOneAndUpdate({ websiteName: constants_1.websiteName }, update, { new: true });
        const updatedPageContent = updatedSiteInfo === null || updatedSiteInfo === void 0 ? void 0 : updatedSiteInfo.contactUs.pageContent;
        return {
            success: true,
            outputs: {
                pageContent: updatedPageContent
            }
        };
    }
    catch (error) {
        console.log('Error while updating contact us page content: ', error);
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
                pageContent: siteInfo === null || siteInfo === void 0 ? void 0 : siteInfo.contactUs.pageContent
            }
        };
    }
    catch (error) {
        console.log('Error while getting contact us page content: ', error);
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
const addQuestionAndAnswer = (newQuestionAndAnswer) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { question, answer } = newQuestionAndAnswer;
        // checking title availability
        const filter = {
            websiteName: constants_1.websiteName,
            'contactUs.questionAndAnswers.question': question
        };
        const existingQuestionAndAnswer = yield siteInfo_1.default.findOne(filter).exec();
        if (existingQuestionAndAnswer) {
            return {
                success: false,
                error: {
                    message: constants_1.errorMessages.siteInfo.questionIsRepetitious,
                    statusCode: constants_1.statusCodes.badRequest
                }
            };
        }
        const update = {
            $push: {
                'contactUs.questionAndAnswers': {
                    question,
                    answer,
                }
            }
        };
        const updatedSiteInfo = yield siteInfo_1.default.findOneAndUpdate({ websiteName: constants_1.websiteName }, update, { new: true });
        const addedQuestionAndAnswer = updatedSiteInfo === null || updatedSiteInfo === void 0 ? void 0 : updatedSiteInfo.contactUs.questionAndAnswers.find((questionAndAnswer) => {
            return questionAndAnswer.question == question;
        });
        return {
            success: true,
            outputs: {
                questionAndAnswer: addedQuestionAndAnswer
            }
        };
    }
    catch (error) {
        console.log('Error while adding questionAndAnswer: ', error);
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
const getQuestionAndAnswer = (questionAndAnswerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = {
            websiteName: constants_1.websiteName,
            'contactUs.questionAndAnswers._id': new ObjectId(questionAndAnswerId)
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
        const questionAndAnswer = siteInfo.contactUs.questionAndAnswers.find((questionAndAnswer) => {
            return questionAndAnswer._id.toString() == questionAndAnswerId;
        });
        return {
            success: true,
            outputs: {
                questionAndAnswer
            }
        };
    }
    catch (error) {
        console.log('Error while getting questionAndAnswer: ', error);
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
const getQuestionAndAnswers = (options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit, skip, sortBy, sortOrder, search } = options;
        const siteInfo = yield siteInfo_1.default.findOne({ websiteName: constants_1.websiteName }).exec();
        let questionAndAnswers = (siteInfo === null || siteInfo === void 0 ? void 0 : siteInfo.contactUs.questionAndAnswers) || [];
        // Sort questionAndAnswers
        if (sortBy) {
            // This is for ts type error
            // Because of yup validation sortBy always has a valid value
            if (sortBy == 'question' || sortBy == 'createdAt') {
                questionAndAnswers.sort((a, b) => {
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
            questionAndAnswers = questionAndAnswers.filter((questionAndAnswer) => {
                return questionAndAnswer.question.includes(search);
            });
        }
        const count = questionAndAnswers.length;
        if (skip) {
            questionAndAnswers = questionAndAnswers.slice(skip);
        }
        if (limit) {
            questionAndAnswers = questionAndAnswers.slice(0, limit);
        }
        return {
            success: true,
            outputs: {
                questionAndAnswers,
                count
            }
        };
    }
    catch (error) {
        console.log('Error while getting questionAndAnswers: ', error);
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
const editQuestionAndAnswer = (questionAndAnswerId, updates) => __awaiter(void 0, void 0, void 0, function* () {
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
            'contactUs.questionAndAnswers._id': new ObjectId(questionAndAnswerId)
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
        if (updates.question) {
            // checking step availability
            const filter = {
                websiteName: constants_1.websiteName,
                'contactUs.questionAndAnswers.question': updates.question
            };
            const existingQuestionAndAnswer = yield siteInfo_1.default.findOne(filter).exec();
            if (existingQuestionAndAnswer) {
                return {
                    success: false,
                    error: {
                        message: constants_1.errorMessages.siteInfo.questionIsRepetitious,
                        statusCode: constants_1.statusCodes.badRequest
                    }
                };
            }
        }
        const update = {};
        const updatesValues = Object.values(updates);
        Object.keys(updates).forEach((u, i) => {
            update[`contactUs.questionAndAnswers.$[i].${u}`] = updatesValues[i];
        });
        const arrayFilters = [{ 'i._id': questionAndAnswerId }];
        const updatedSiteInfo = yield siteInfo_1.default.findOneAndUpdate(filter, update, { arrayFilters, new: true }).exec();
        const updatedQuestionAndAnswer = updatedSiteInfo === null || updatedSiteInfo === void 0 ? void 0 : updatedSiteInfo.contactUs.questionAndAnswers.find((questionAndAnswer) => {
            return questionAndAnswer._id.toString() == questionAndAnswerId;
        });
        return {
            success: true,
            outputs: {
                questionAndAnswer: updatedQuestionAndAnswer
            }
        };
    }
    catch (error) {
        console.log('Error while editing a questionAndAnswer: ', error);
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
const deleteQuestionAndAnswers = (idList) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // deleting question and answers and their image
        for (const id of idList) {
            const update = {
                $pull: {
                    'contactUs.questionAndAnswers': {
                        _id: new ObjectId(id)
                    }
                }
            };
            yield siteInfo_1.default.findOneAndUpdate({ websiteName: constants_1.websiteName }, update);
        }
        return {
            success: true
        };
    }
    catch (error) {
        console.log('Error while deleting questionAndAnswers: ', error);
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
const addExpert = (newExpert) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, phone, category, socialNetworks, image } = newExpert;
        // checking name availability
        const nameCheckingFilter = {
            websiteName: constants_1.websiteName,
            'contactUs.experts.name': name
        };
        const existingExpertWithThisName = yield siteInfo_1.default.findOne(nameCheckingFilter).exec();
        if (existingExpertWithThisName) {
            return {
                success: false,
                error: {
                    message: constants_1.errorMessages.siteInfo.nameIsTaken,
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
        // checking if all of social networks exist
        const siteInfo = yield siteInfo_1.default.findOne({ websiteName: constants_1.websiteName }).exec();
        if (siteInfo) {
            const siteInfoSocialNetworks = siteInfo.mainPage.socialNetworks;
            const allSocialNetworksExist = socialNetworks.every((socialNetwork) => {
                const existingSocialNetwork = siteInfoSocialNetworks.find((s) => {
                    return s.icon == socialNetwork.icon;
                });
                if (existingSocialNetwork) {
                    return true;
                }
            });
            if (!allSocialNetworksExist) {
                return {
                    success: false,
                    error: {
                        message: constants_1.errorMessages.shared.ise,
                        statusCode: constants_1.statusCodes.ise
                    }
                };
            }
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
                'contactUs.experts': {
                    name,
                    phone,
                    category,
                    socialNetworks,
                    image: result.imageUrl
                }
            }
        };
        const updatedSiteInfo = yield siteInfo_1.default.findOneAndUpdate({ websiteName: constants_1.websiteName }, update, { new: true })
            .populate('contactUs.experts.category', '_id name').exec();
        const addedExpert = updatedSiteInfo === null || updatedSiteInfo === void 0 ? void 0 : updatedSiteInfo.contactUs.experts.find((expert) => {
            return expert.name == name;
        });
        return {
            success: true,
            outputs: {
                expert: addedExpert
            }
        };
    }
    catch (error) {
        console.log('Error while adding expert: ', error);
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
const getExpert = (expertId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = {
            websiteName: constants_1.websiteName,
            'contactUs.experts._id': new ObjectId(expertId)
        };
        const siteInfo = yield siteInfo_1.default.findOne(filter)
            .populate('contactUs.experts.category', '_id name').exec();
        if (!siteInfo) {
            return {
                success: false,
                error: {
                    message: constants_1.errorMessages.shared.notFound,
                    statusCode: constants_1.statusCodes.notFound
                }
            };
        }
        const expert = siteInfo.contactUs.experts.find((expert) => {
            return expert._id.toString() == expertId;
        });
        return {
            success: true,
            outputs: {
                expert
            }
        };
    }
    catch (error) {
        console.log('Error while getting expert: ', error);
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
const getExperts = (options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit, skip, sortBy, sortOrder, search } = options;
        const siteInfo = yield siteInfo_1.default.findOne({ websiteName: constants_1.websiteName })
            .populate('contactUs.experts.category', '_id name').exec();
        let experts = (siteInfo === null || siteInfo === void 0 ? void 0 : siteInfo.contactUs.experts) || [];
        // Sort experts
        if (sortBy) {
            // This is for ts type error
            // Because of yup validation sortBy always has a valid value
            if (sortBy == 'name' || sortBy == 'phone' || sortBy == 'createdAt') {
                experts.sort((a, b) => {
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
            experts = experts.filter((expert) => {
                return expert.name.includes(search);
            });
        }
        const count = experts.length;
        if (skip) {
            experts = experts.slice(skip);
        }
        if (limit) {
            experts = experts.slice(0, limit);
        }
        return {
            success: true,
            outputs: {
                experts,
                count
            }
        };
    }
    catch (error) {
        console.log('Error while getting experts: ', error);
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
const getExpertsByCategoryId = (categoryId, options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit, skip, sortBy, sortOrder, search } = options;
        const siteInfo = yield siteInfo_1.default.findOne({ websiteName: constants_1.websiteName })
            .populate('contactUs.experts.category', '_id name').exec();
        let experts = (siteInfo === null || siteInfo === void 0 ? void 0 : siteInfo.contactUs.experts.filter((expert) => {
            if (expert.category && '_id' in expert.category) {
                return expert.category._id.toString() === categoryId;
            }
            else
                return false;
        })) || [];
        // Sort experts
        if (sortBy) {
            // This is for ts type error
            // Because of yup validation sortBy always has a valid value
            if (sortBy == 'name' || sortBy == 'phone' || sortBy == 'createdAt') {
                experts.sort((a, b) => {
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
            experts = experts.filter((expert) => {
                return expert.name.includes(search);
            });
        }
        if (skip) {
            experts = experts.slice(skip);
        }
        if (limit) {
            experts = experts.slice(0, limit);
        }
        const count = experts.length;
        return {
            success: true,
            outputs: {
                experts,
                count
            }
        };
    }
    catch (error) {
        console.log('Error while getting experts by category id: ', error);
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
const editExpert = (expertId, updates) => __awaiter(void 0, void 0, void 0, function* () {
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
            'contactUs.experts._id': new ObjectId(expertId)
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
        if (updates.name) {
            // checking name availability
            const filter = {
                websiteName: constants_1.websiteName,
                'contactUs.experts.name': updates.name
            };
            const existingExpert = yield siteInfo_1.default.findOne(filter).exec();
            if (existingExpert) {
                return {
                    success: false,
                    error: {
                        message: constants_1.errorMessages.siteInfo.nameIsTaken,
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
        if (updates.image) {
            const imageUrl = (_a = siteInfo.contactUs.experts.find((expert) => {
                return expert._id.toString() == expertId;
            })) === null || _a === void 0 ? void 0 : _a.image;
            if (imageUrl) {
                yield image_service_1.default.updateImage(imageUrl, updates.image.format, updates.image.data);
            }
            delete updates.image;
        }
        const update = {};
        const updatesValues = Object.values(updates);
        Object.keys(updates).forEach((u, i) => {
            update[`contactUs.experts.$[i].${u}`] = updatesValues[i];
        });
        const arrayFilters = [{ 'i._id': expertId }];
        const updatedSiteInfo = yield siteInfo_1.default.findOneAndUpdate(filter, update, { arrayFilters, new: true })
            .populate('contactUs.experts.category', '_id name').exec();
        const updatedExpert = updatedSiteInfo === null || updatedSiteInfo === void 0 ? void 0 : updatedSiteInfo.contactUs.experts.find((expert) => {
            return expert._id.toString() == expertId;
        });
        return {
            success: true,
            outputs: {
                expert: updatedExpert
            }
        };
    }
    catch (error) {
        console.log('Error while editing a expert: ', error);
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
const deleteExperts = (idList) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // deleting experts and their image
        for (const id of idList) {
            const update = {
                $pull: {
                    'contactUs.experts': {
                        _id: new ObjectId(id)
                    }
                }
            };
            const siteInfo = yield siteInfo_1.default.findOneAndUpdate({ websiteName: constants_1.websiteName }, update);
            const deletedExpert = siteInfo === null || siteInfo === void 0 ? void 0 : siteInfo.contactUs.experts.find((expert) => {
                return expert._id.toString() == id;
            });
            if (deletedExpert) {
                yield image_service_1.default.deleteImage(deletedExpert.image);
            }
        }
        return {
            success: true
        };
    }
    catch (error) {
        console.log('Error while deleting experts: ', error);
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
    addQuestionAndAnswer,
    getQuestionAndAnswer,
    getQuestionAndAnswers,
    editQuestionAndAnswer,
    deleteQuestionAndAnswers,
    addExpert,
    getExpert,
    getExperts,
    getExpertsByCategoryId,
    editExpert,
    deleteExperts
};
