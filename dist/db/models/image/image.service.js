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
const image_1 = __importDefault(require("./image"));
const storeImage = (format, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const image = yield image_1.default.create({ format, data });
        const imageUrl = `/image/${image._id.toString()}`;
        return {
            success: true,
            imageUrl
        };
    }
    catch (error) {
        console.log('Error while storing an image: ', error);
        return {
            success: false
        };
    }
});
//----------------------------------------------------------
const getImage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const image = yield image_1.default.findById(id).exec();
        if (!image) {
            return {
                success: false
            };
        }
        return {
            success: true,
            image
        };
    }
    catch (error) {
        console.log('Error while getting an image: ', error);
        return {
            success: false
        };
    }
});
//----------------------------------------------------------
const deleteImage = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = url.replace('/image/', '');
        yield image_1.default.findByIdAndDelete(id).exec();
        return {
            success: true
        };
    }
    catch (error) {
        console.log('Error while deleting an image: ', error);
        return {
            success: false
        };
    }
});
//----------------------------------------------------------
const updateImage = (url, format, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = url.replace('/image/', '');
        yield image_1.default.findByIdAndUpdate(id, { format, data }).exec();
        return {
            success: true
        };
    }
    catch (error) {
        console.log('Error while updating an image: ', error);
        return {
            success: false
        };
    }
});
//----------------------------------------------------------
exports.default = {
    storeImage,
    getImage,
    updateImage,
    deleteImage
};
