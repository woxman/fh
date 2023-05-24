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
const subcategory_1 = __importDefault(require("../subcategory/subcategory"));
const factory_1 = __importDefault(require("../factory/factory"));
const ObjectId = mongoose_1.default.Types.ObjectId;
const updateLogo = (logo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield image_service_1.default.storeImage(logo.format, logo.data);
        if (!result.success) {
            return {
                success: false,
                error: {
                    message: constants_1.errorMessages.shared.ise,
                    statusCode: constants_1.statusCodes.ise
                }
            };
        }
        const update = {
            $set: {
                'mainPage.logo': result.imageUrl
            }
        };
        const updatedSiteInfo = yield siteInfo_1.default.findOneAndUpdate({ websiteName: constants_1.websiteName }, update, { new: true });
        return {
            success: true,
            outputs: {
                logo: updatedSiteInfo === null || updatedSiteInfo === void 0 ? void 0 : updatedSiteInfo.mainPage.logo
            }
        };
    }
    catch (error) {
        console.log('Error while updating site logo: ', error);
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
const getLogo = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const siteInfo = yield siteInfo_1.default.findOne({ websiteName: constants_1.websiteName }).exec();
        if (!(siteInfo === null || siteInfo === void 0 ? void 0 : siteInfo.mainPage.logo)) {
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
                logo: siteInfo === null || siteInfo === void 0 ? void 0 : siteInfo.mainPage.logo
            }
        };
    }
    catch (error) {
        console.log('Error while getting site logo: ', error);
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
const addSocialNetwork = (newSocialNetwork) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, link, show, icon } = newSocialNetwork;
        // checking name availability
        const filter = {
            websiteName: constants_1.websiteName,
            'mainPage.socialNetworks.name': name
        };
        const existingSocialNetwork = yield siteInfo_1.default.findOne(filter).exec();
        if (existingSocialNetwork) {
            return {
                success: false,
                error: {
                    message: constants_1.errorMessages.siteInfo.nameIsTaken,
                    statusCode: constants_1.statusCodes.badRequest
                }
            };
        }
        const result = yield image_service_1.default.storeImage(icon.format, icon.data);
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
                'mainPage.socialNetworks': {
                    name,
                    link,
                    show,
                    icon: result.imageUrl
                }
            }
        };
        const updatedSiteInfo = yield siteInfo_1.default.findOneAndUpdate({ websiteName: constants_1.websiteName }, update, { new: true });
        const addedSocialNetwork = updatedSiteInfo === null || updatedSiteInfo === void 0 ? void 0 : updatedSiteInfo.mainPage.socialNetworks.find((socialNetwork) => {
            return socialNetwork.name == name;
        });
        return {
            success: true,
            outputs: {
                socialNetwork: addedSocialNetwork
            }
        };
    }
    catch (error) {
        console.log('Error while adding social network: ', error);
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
const getSocialNetworks = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const siteInfo = yield siteInfo_1.default.findOne({ websiteName: constants_1.websiteName }).exec();
        return {
            success: true,
            outputs: {
                socialNetworks: siteInfo === null || siteInfo === void 0 ? void 0 : siteInfo.mainPage.socialNetworks
            }
        };
    }
    catch (error) {
        console.log('Error while getting social networks: ', error);
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
const getSocialNetwork = (socialNetworkId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = {
            websiteName: constants_1.websiteName,
            'mainPage.socialNetworks._id': new ObjectId(socialNetworkId)
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
        const socialNetwork = siteInfo.mainPage.socialNetworks.find((socialNetwork) => {
            return socialNetwork._id.toString() == socialNetworkId;
        });
        return {
            success: true,
            outputs: {
                socialNetwork
            }
        };
    }
    catch (error) {
        console.log('Error while getting social network: ', error);
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
const deleteSocialNetwork = (socialNetworkId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const filter = {
            websiteName: constants_1.websiteName,
            'mainPage.socialNetworks._id': new ObjectId(socialNetworkId)
        };
        const update = {
            $pull: { 'mainPage.socialNetworks': { _id: new ObjectId(socialNetworkId) } }
        };
        const siteInfo = yield siteInfo_1.default.findOneAndUpdate(filter, update).exec();
        const imageUrl = (_a = siteInfo === null || siteInfo === void 0 ? void 0 : siteInfo.mainPage.socialNetworks.find((socialNetwork) => {
            return socialNetwork._id.toString() == socialNetworkId;
        })) === null || _a === void 0 ? void 0 : _a.icon;
        if (imageUrl) {
            yield image_service_1.default.deleteImage(imageUrl);
            // delete social network from experts that have this social network
            const siteInfo = yield siteInfo_1.default.findOne({ websiteName: constants_1.websiteName }).exec();
            if (!siteInfo) {
                return {
                    success: true
                };
            }
            const experts = siteInfo.contactUs.experts;
            experts.forEach((expert, index) => {
                experts[index].socialNetworks = experts[index].socialNetworks.filter((socialNetwork) => {
                    return socialNetwork.icon != imageUrl;
                });
            });
            const update = {
                'contactUs.experts': experts
            };
            yield siteInfo_1.default.findOneAndUpdate({ websiteName: constants_1.websiteName }, update).exec();
        }
        return {
            success: true
        };
    }
    catch (error) {
        console.log('Error while deleting social network: ', error);
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
const editSocialNetwork = (socialNetworkId, updates) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
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
            'mainPage.socialNetworks._id': new ObjectId(socialNetworkId)
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
            // checking step availability
            const filter = {
                websiteName: constants_1.websiteName,
                'mainPage.socialNetworks.name': updates.name
            };
            const existingSocialNetwork = yield siteInfo_1.default.findOne(filter).exec();
            if (existingSocialNetwork) {
                return {
                    success: false,
                    error: {
                        message: constants_1.errorMessages.siteInfo.nameIsTaken,
                        statusCode: constants_1.statusCodes.badRequest
                    }
                };
            }
        }
        // Store new image in database
        if (updates.icon) {
            const iconUrl = (_b = siteInfo.mainPage.socialNetworks.find((socialNetwork) => {
                return socialNetwork._id.toString() == socialNetworkId;
            })) === null || _b === void 0 ? void 0 : _b.icon;
            if (iconUrl) {
                yield image_service_1.default.updateImage(iconUrl, updates.icon.format, updates.icon.data);
            }
            delete updates.icon;
        }
        const update = {};
        const updatesValues = Object.values(updates);
        Object.keys(updates).forEach((u, i) => {
            update[`mainPage.socialNetworks.$[i].${u}`] = updatesValues[i];
        });
        const arrayFilters = [{ 'i._id': socialNetworkId }];
        const updatedSiteInfo = yield siteInfo_1.default.findOneAndUpdate(filter, update, { arrayFilters, new: true }).exec();
        const updatedSocialNetwork = updatedSiteInfo === null || updatedSiteInfo === void 0 ? void 0 : updatedSiteInfo.mainPage.socialNetworks.find((socialNetwork) => {
            return socialNetwork._id.toString() == socialNetworkId;
        });
        return {
            success: true,
            outputs: {
                socialNetwork: updatedSocialNetwork
            }
        };
    }
    catch (error) {
        console.log('Error while editing a social network: ', error);
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
const addOrderStep = (newOrderStep) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { step, title, description, image } = newOrderStep;
        // checking step availability
        const filter = {
            websiteName: constants_1.websiteName,
            'mainPage.orderSteps.step': step
        };
        const existingOrderStep = yield siteInfo_1.default.findOne(filter).exec();
        if (existingOrderStep) {
            return {
                success: false,
                error: {
                    message: constants_1.errorMessages.siteInfo.stepExists,
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
                'mainPage.orderSteps': {
                    step,
                    title,
                    description,
                    image: result.imageUrl
                }
            }
        };
        const updatedSiteInfo = yield siteInfo_1.default.findOneAndUpdate({ websiteName: constants_1.websiteName }, update, { new: true });
        const addedOrderStep = updatedSiteInfo === null || updatedSiteInfo === void 0 ? void 0 : updatedSiteInfo.mainPage.orderSteps.find((orderStep) => {
            return orderStep.step == step;
        });
        return {
            success: true,
            outputs: {
                orderStep: addedOrderStep
            }
        };
    }
    catch (error) {
        console.log('Error while adding order step: ', error);
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
//--------------------------------------------------------------------------------
const addGalleryStep = (newGalleryStep) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { step, link, which, image } = newGalleryStep;
        // checking step availability
        const filter = {
            websiteName: constants_1.websiteName,
            'mainPage.gallerySteps.step': step
        };
        const existingGalleryStep = yield siteInfo_1.default.findOne(filter).exec();
        if (existingGalleryStep) {
            return {
                success: false,
                error: {
                    message: constants_1.errorMessages.siteInfo.stepExists,
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
                'mainPage.gallerySteps': {
                    step,
                    link,
                    which,
                    image: result.imageUrl
                }
            }
        };
        const updatedSiteInfo = yield siteInfo_1.default.findOneAndUpdate({ websiteName: constants_1.websiteName }, update, { new: true });
        const addedGalleryStep = updatedSiteInfo === null || updatedSiteInfo === void 0 ? void 0 : updatedSiteInfo.mainPage.gallerySteps.find((galleryStep) => {
            return galleryStep.step == step;
        });
        return {
            success: true,
            outputs: {
                galleryStep: addedGalleryStep
            }
        };
    }
    catch (error) {
        console.log('Error while adding gallery step: ', error);
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
const getOrderSteps = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const siteInfo = yield siteInfo_1.default.findOne({ websiteName: constants_1.websiteName }).exec();
        return {
            success: true,
            outputs: {
                orderSteps: siteInfo === null || siteInfo === void 0 ? void 0 : siteInfo.mainPage.orderSteps
            }
        };
    }
    catch (error) {
        console.log('Error while getting order steps: ', error);
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
//--------------------------------------------------------------------------------
const getGallerySteps = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const siteInfo = yield siteInfo_1.default.findOne({ websiteName: constants_1.websiteName }).exec();
        return {
            success: true,
            outputs: {
                gallerySteps: siteInfo === null || siteInfo === void 0 ? void 0 : siteInfo.mainPage.gallerySteps
            }
        };
    }
    catch (error) {
        console.log('Error while getting galley steps: ', error);
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
const getOrderStep = (orderStepId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = {
            websiteName: constants_1.websiteName,
            'mainPage.orderSteps._id': new ObjectId(orderStepId)
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
        const orderStep = siteInfo.mainPage.orderSteps.find((orderStep) => {
            return orderStep._id.toString() == orderStepId;
        });
        return {
            success: true,
            outputs: {
                orderStep
            }
        };
    }
    catch (error) {
        console.log('Error while getting order step: ', error);
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
//--------------------------------------------------------------------------------
const getGalleryStep = (galleryStepId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = {
            websiteName: constants_1.websiteName,
            'mainPage.gallerySteps._id': new ObjectId(galleryStepId)
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
        const galleryStep = siteInfo.mainPage.gallerySteps.find((galleryStep) => {
            return galleryStep._id.toString() == galleryStepId;
        });
        return {
            success: true,
            outputs: {
                galleryStep
            }
        };
    }
    catch (error) {
        console.log('Error while getting gallery step: ', error);
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
const deleteOrderStep = (orderStepId) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const filter = {
            websiteName: constants_1.websiteName,
            'mainPage.orderSteps._id': new ObjectId(orderStepId)
        };
        const update = {
            $pull: { 'mainPage.orderSteps': { _id: new ObjectId(orderStepId) } }
        };
        const siteInfo = yield siteInfo_1.default.findOneAndUpdate(filter, update).exec();
        const imageUrl = (_c = siteInfo === null || siteInfo === void 0 ? void 0 : siteInfo.mainPage.orderSteps.find((orderStep) => {
            return orderStep._id.toString() == orderStepId;
        })) === null || _c === void 0 ? void 0 : _c.image;
        if (imageUrl) {
            yield image_service_1.default.deleteImage(imageUrl);
        }
        return {
            success: true
        };
    }
    catch (error) {
        console.log('Error while deleting order step: ', error);
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
//--------------------------------------------------------------------------------
const deleteGalleryStep = (galleryStepId) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const filter = {
            websiteName: constants_1.websiteName,
            'mainPage.gallerySteps._id': new ObjectId(galleryStepId)
        };
        const update = {
            $pull: { 'mainPage.gallerySteps': { _id: new ObjectId(galleryStepId) } }
        };
        const siteInfo = yield siteInfo_1.default.findOneAndUpdate(filter, update).exec();
        const imageUrl = (_d = siteInfo === null || siteInfo === void 0 ? void 0 : siteInfo.mainPage.gallerySteps.find((galleryStep) => {
            return galleryStep._id.toString() == galleryStepId;
        })) === null || _d === void 0 ? void 0 : _d.image;
        if (imageUrl) {
            yield image_service_1.default.deleteImage(imageUrl);
        }
        return {
            success: true
        };
    }
    catch (error) {
        console.log('Error while deleting gallery step: ', error);
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
const editOrderStep = (orderStepId, updates) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
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
            'mainPage.orderSteps._id': new ObjectId(orderStepId)
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
        if (updates.step) {
            // checking step availability
            const filter = {
                websiteName: constants_1.websiteName,
                'mainPage.orderSteps.step': updates.step
            };
            const existingOrderStep = yield siteInfo_1.default.findOne(filter).exec();
            if (existingOrderStep) {
                return {
                    success: false,
                    error: {
                        message: constants_1.errorMessages.siteInfo.stepExists,
                        statusCode: constants_1.statusCodes.badRequest
                    }
                };
            }
        }
        // Store new image in database
        if (updates.image) {
            const imageUrl = (_e = siteInfo.mainPage.orderSteps.find((orderStep) => {
                return orderStep._id.toString() == orderStepId;
            })) === null || _e === void 0 ? void 0 : _e.image;
            if (imageUrl) {
                yield image_service_1.default.updateImage(imageUrl, updates.image.format, updates.image.data);
            }
            delete updates.image;
        }
        const update = {};
        const updatesValues = Object.values(updates);
        Object.keys(updates).forEach((u, i) => {
            update[`mainPage.orderSteps.$[i].${u}`] = updatesValues[i];
        });
        const arrayFilters = [{ 'i._id': orderStepId }];
        const updatedSiteInfo = yield siteInfo_1.default.findOneAndUpdate(filter, update, { arrayFilters, new: true }).exec();
        const updatedOrderStep = updatedSiteInfo === null || updatedSiteInfo === void 0 ? void 0 : updatedSiteInfo.mainPage.orderSteps.find((orderStep) => {
            return orderStep._id.toString() == orderStepId;
        });
        return {
            success: true,
            outputs: {
                orderStep: updatedOrderStep
            }
        };
    }
    catch (error) {
        console.log('Error while editing an order step: ', error);
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
//--------------------------------------------------------------------------------
const editGalleryStep = (galleryStepId, updates) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
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
            'mainPage.gallerySteps._id': new ObjectId(galleryStepId)
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
        if (updates.step) {
            // checking step availability
            const filter = {
                websiteName: constants_1.websiteName,
                'mainPage.gallerySteps.step': updates.step
            };
            const existingGalleryStep = yield siteInfo_1.default.findOne(filter).exec();
            if (existingGalleryStep) {
                return {
                    success: false,
                    error: {
                        message: constants_1.errorMessages.siteInfo.stepExists,
                        statusCode: constants_1.statusCodes.badRequest
                    }
                };
            }
        }
        // Store new image in database
        if (updates.image) {
            const imageUrl = (_f = siteInfo.mainPage.gallerySteps.find((galleryStep) => {
                return galleryStep._id.toString() == galleryStepId;
            })) === null || _f === void 0 ? void 0 : _f.image;
            if (imageUrl) {
                yield image_service_1.default.updateImage(imageUrl, updates.image.format, updates.image.data);
            }
            delete updates.image;
        }
        const update = {};
        const updatesValues = Object.values(updates);
        Object.keys(updates).forEach((u, i) => {
            update[`mainPage.gallerySteps.$[i].${u}`] = updatesValues[i];
        });
        const arrayFilters = [{ 'i._id': galleryStepId }];
        const updatedSiteInfo = yield siteInfo_1.default.findOneAndUpdate(filter, update, { arrayFilters, new: true }).exec();
        const updatedGalleryStep = updatedSiteInfo === null || updatedSiteInfo === void 0 ? void 0 : updatedSiteInfo.mainPage.gallerySteps.find((galleryStep) => {
            return galleryStep._id.toString() == galleryStepId;
        });
        return {
            success: true,
            outputs: {
                galleryStep: updatedGalleryStep
            }
        };
    }
    catch (error) {
        console.log('Error while editing an gallery step: ', error);
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
const updateFooter = (newFooter) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { content, email, phone, address, workHours, images } = newFooter;
        const siteInfo = yield siteInfo_1.default.findOne({ websiteName: constants_1.websiteName }).exec();
        const existingImages = (siteInfo === null || siteInfo === void 0 ? void 0 : siteInfo.mainPage.footer.images) || [];
        const updatedImages = [];
        // deleting images that no longer exist
        for (let image of existingImages) {
            if (!images.includes(image)) {
                yield image_service_1.default.deleteImage(image);
            }
        }
        // storing new images
        for (let image of images) {
            if (typeof (image) !== "string") {
                const result = yield image_service_1.default.storeImage(image.format, image.data);
                if (result.success && result.imageUrl) {
                    updatedImages.push(result.imageUrl);
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
            }
            else {
                if (existingImages.includes(image)) {
                    updatedImages.push(image);
                }
            }
        }
        const update = {
            $set: {
                'mainPage.footer': {
                    content,
                    email,
                    phone,
                    address,
                    workHours,
                    images: updatedImages
                }
            }
        };
        const updatedSiteInfo = yield siteInfo_1.default.findOneAndUpdate({ websiteName: constants_1.websiteName }, update, { new: true });
        const updatedFooter = updatedSiteInfo === null || updatedSiteInfo === void 0 ? void 0 : updatedSiteInfo.mainPage.footer;
        return {
            success: true,
            outputs: {
                footer: updatedFooter
            }
        };
    }
    catch (error) {
        console.log('Error while updating footer: ', error);
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
const getFooter = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const siteInfo = yield siteInfo_1.default.findOne({ websiteName: constants_1.websiteName }).exec();
        return {
            success: true,
            outputs: {
                footer: siteInfo === null || siteInfo === void 0 ? void 0 : siteInfo.mainPage.footer
            }
        };
    }
    catch (error) {
        console.log('Error while getting footer: ', error);
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
const updateNewsAndBanner = (newsAndBanner) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { news, banner } = newsAndBanner;
        const siteInfo = yield siteInfo_1.default.findOne({ websiteName: constants_1.websiteName }).exec();
        const existingBanner = siteInfo === null || siteInfo === void 0 ? void 0 : siteInfo.mainPage.newsAndBanner.banner;
        if (typeof (banner) !== "string") {
            // storing new banner
            const result = yield image_service_1.default.storeImage(banner.format, banner.data);
            if (result.success && result.imageUrl) {
                banner = result.imageUrl;
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
            // deleting old banner
            if (existingBanner) {
                yield image_service_1.default.deleteImage(existingBanner);
            }
        }
        else {
            if (existingBanner !== banner) {
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
                'mainPage.newsAndBanner': {
                    news,
                    banner
                }
            }
        };
        const updatedSiteInfo = yield siteInfo_1.default.findOneAndUpdate({ websiteName: constants_1.websiteName }, update, { new: true });
        const updatedNewsAndBanner = updatedSiteInfo === null || updatedSiteInfo === void 0 ? void 0 : updatedSiteInfo.mainPage.newsAndBanner;
        return {
            success: true,
            outputs: {
                newsAndBanner: updatedNewsAndBanner
            }
        };
    }
    catch (error) {
        console.log('Error while updating newsAndBanner: ', error);
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
const getNewsAndBanner = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const siteInfo = yield siteInfo_1.default.findOne({ websiteName: constants_1.websiteName }).exec();
        return {
            success: true,
            outputs: {
                newsAndBanner: siteInfo === null || siteInfo === void 0 ? void 0 : siteInfo.mainPage.newsAndBanner
            }
        };
    }
    catch (error) {
        console.log('Error while getting newsAndBanner: ', error);
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
const updateSpecialProducts = (specialProducts) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const siteInfo = yield siteInfo_1.default.findOne({ websiteName: constants_1.websiteName }).exec();
        for (const specialProduct of specialProducts) {
            // Check if the subcategory exists
            const subcategory = yield subcategory_1.default.findById(specialProduct.subcategory)
                .populate('products', '_id factory').exec();
            if (!subcategory) {
                return {
                    success: false,
                    error: {
                        statusCode: constants_1.statusCodes.notFound,
                        message: constants_1.errorMessages.subcategoryService.noSuchSubcategory
                    }
                };
            }
            // Check if the factory exists
            const factory = yield factory_1.default.findById(specialProduct.factory).exec();
            if (!factory) {
                return {
                    success: false,
                    error: {
                        statusCode: constants_1.statusCodes.notFound,
                        message: constants_1.errorMessages.factoryService.noSuchFactory
                    }
                };
            }
            const productsExist = specialProduct.products.every((product) => {
                const existingProduct = subcategory.products.find((subcategoryProduct) => {
                    if (subcategoryProduct._id.toString() == product && subcategoryProduct.factory.toString() == specialProduct.factory) {
                        return true;
                    }
                });
                if (existingProduct) {
                    return true;
                }
            });
            if (!productsExist) {
                return {
                    success: false,
                    error: {
                        statusCode: constants_1.statusCodes.notFound,
                        message: constants_1.errorMessages.orderService.notAllProductsExist
                    }
                };
            }
        }
        const update = {
            $set: {
                'mainPage.specialProducts': specialProducts
            }
        };
        const updatedSiteInfo = yield siteInfo_1.default.findOneAndUpdate({ websiteName: constants_1.websiteName }, update, { new: true })
            .populate('mainPage.specialProducts.subcategory', '_id name')
            .populate('mainPage.specialProducts.factory', '_id name')
            .populate('mainPage.specialProducts.products', '_id name').exec();
        const updatedSpecialProducts = updatedSiteInfo === null || updatedSiteInfo === void 0 ? void 0 : updatedSiteInfo.mainPage.specialProducts;
        return {
            success: true,
            outputs: {
                specialProducts: updatedSpecialProducts
            }
        };
    }
    catch (error) {
        console.log('Error while updating special products: ', error);
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
const getSpecialProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const siteInfo = yield siteInfo_1.default.findOne({ websiteName: constants_1.websiteName })
            .populate('mainPage.specialProducts.subcategory', '_id name')
            .populate('mainPage.specialProducts.factory', '_id name')
            .populate('mainPage.specialProducts.products', '_id name priceHistory').exec();
        return {
            success: true,
            outputs: {
                specialProducts: siteInfo === null || siteInfo === void 0 ? void 0 : siteInfo.mainPage.specialProducts
            }
        };
    }
    catch (error) {
        console.log('Error while getting specialProducts: ', error);
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
    updateLogo,
    getLogo,
    addSocialNetwork,
    getSocialNetwork,
    getSocialNetworks,
    deleteSocialNetwork,
    editSocialNetwork,
    addOrderStep,
    addGalleryStep,
    getOrderSteps,
    getGallerySteps,
    getOrderStep,
    getGalleryStep,
    deleteOrderStep,
    deleteGalleryStep,
    editOrderStep,
    editGalleryStep,
    updateFooter,
    getFooter,
    updateNewsAndBanner,
    getNewsAndBanner,
    updateSpecialProducts,
    getSpecialProducts
};
