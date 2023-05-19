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
const fs_1 = __importDefault(require("fs"));
const image_service_1 = __importDefault(require("../../db/models/image/image.service"));
const constants_1 = require("../../utils/constants");
const getImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { imageId } = req.params;
        const result = yield image_service_1.default.getImage(imageId);
        if (!result.success || !result.image) {
            res.sendStatus(constants_1.statusCodes.notFound);
            return;
        }
        const imageBuffer = (_a = result.image) === null || _a === void 0 ? void 0 : _a.data;
        const imageFormat = (_b = result.image) === null || _b === void 0 ? void 0 : _b.format;
        const fileName = `${imageId}.${imageFormat}`;
        fs_1.default.writeFileSync('./' + fileName, imageBuffer);
        var options = {
            root: './',
            dotfiles: 'deny',
            headers: {
                'x-timestamp': Date.now(),
                'x-sent': true
            }
        };
        res.sendFile(fileName, options, (error) => {
            if (fs_1.default.existsSync('./' + fileName)) {
                fs_1.default.unlinkSync('./' + fileName);
            }
        });
    }
    catch (error) {
        console.log('Error while getting an image: ', error);
        res.sendStatus(constants_1.statusCodes.ise);
    }
});
exports.default = getImage;
