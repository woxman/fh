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
const product_1 = __importDefault(require("./product"));
const constants_1 = require("../../../utils/constants");
const subcategory_1 = __importDefault(require("../subcategory/subcategory"));
const factory_1 = __importDefault(require("../factory/factory"));
const user_1 = __importDefault(require("../user/user"));
const siteInfo_1 = __importDefault(require("../siteInfo/siteInfo"));
const image_service_1 = __importDefault(require("../image/image.service"));
const addProduct = (subcategoryId, newProduct) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { factory: factoryId, name, description, properties, unit, weight, price, tags, images } = newProduct;
        // Check if the subcategory exists
        const subcategory = yield subcategory_1.default.findById(subcategoryId)
            .populate('properties.property', 'name values').exec();
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
        const factory = yield factory_1.default.findById(factoryId).exec();
        if (!factory) {
            return {
                success: false,
                error: {
                    statusCode: constants_1.statusCodes.badRequest,
                    message: constants_1.errorMessages.factoryService.noSuchFactory
                }
            };
        }
        const propertiesToSave = [];
        // Check if all subcategory properties and proper value exist in properties
        const propertiesExist = subcategory.properties.every((subcategoryProperty) => {
            const existingProperty = properties.find((property) => {
                if ('name' in subcategoryProperty.property) {
                    if (property.name == subcategoryProperty.property.name && subcategoryProperty.property.values.includes(property.value)) {
                        return true;
                    }
                }
            });
            if (existingProperty) {
                propertiesToSave.push({
                    name: existingProperty.name,
                    value: existingProperty.value
                });
                return true;
            }
        });
        if (!propertiesExist) {
            return {
                success: false,
                error: {
                    statusCode: constants_1.statusCodes.badRequest,
                    message: constants_1.errorMessages.productService.invalidProperty
                }
            };
        }
        const imagesToSave = [];
        // storing images
        for (let image of images) {
            const result = yield image_service_1.default.storeImage(image.format, image.data);
            if (result.success && result.imageUrl) {
                imagesToSave.push(result.imageUrl);
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
        // generating url slug off of name and a random number
        const namePart = name.split(' ').join('-');
        const randomPart = (Math.floor(100000 + Math.random() * 900000)).toString();
        const urlSlug = namePart + '-' + randomPart;
        const priceHistory = price ? [{
                price,
                date: Math.floor(Date.now() / 1000)
            }] : [];
        // Creating the new product
        let addedProduct = yield product_1.default.create({
            subcategory: subcategoryId,
            factory: factoryId,
            name,
            urlSlug,
            description,
            properties: propertiesToSave,
            unit,
            weight,
            price,
            priceHistory,
            tags,
            images: imagesToSave
        });
        addedProduct = yield addedProduct.populate({
            path: 'subcategory',
            select: '_id name category',
            populate: {
                path: 'category',
                select: '_id name'
            }
        });
        addedProduct = yield addedProduct.populate('factory', '_id name');
        return {
            success: true,
            outputs: {
                product: addedProduct
            }
        };
    }
    catch (error) {
        console.log('Error while creating the new product: ', error);
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
const getProduct = (productUrlSlug) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find and return the product    
        const product = yield product_1.default.findOne({ urlSlug: productUrlSlug })
            .populate({
            path: 'subcategory',
            select: '_id name category urlSlug',
            populate: {
                path: 'category',
                select: '_id name urlSlug'
            }
        })
            .populate('factory', '_id name')
            .exec();
        if (!product) {
            return {
                success: false,
                error: {
                    statusCode: constants_1.statusCodes.notFound,
                    message: constants_1.errorMessages.shared.notFound
                }
            };
        }
        // Finding alternative products
        let complementaryProducts;
        if ('_id' in product.subcategory) {
            const filter = {
                subcategory: product.subcategory._id
            };
            const projection = {
                _id: 1,
                name: 1,
                description: 1,
                price: 1,
                images: 1
            };
            complementaryProducts = yield product_1.default.find(filter, projection).exec();
            complementaryProducts = shuffle(complementaryProducts).slice(0, 5);
            product.complementaryProducts = complementaryProducts;
            console.log(complementaryProducts);
            console.log(product);
        }
        return {
            success: true,
            outputs: {
                product: Object.assign(Object.assign({}, product.toObject()), { complementaryProducts })
            }
        };
    }
    catch (error) {
        console.log('Error while getting the product: ', error);
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
const getProducts = (options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit, skip, sortBy, sortOrder, search, access, factory } = options;
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
        let qr = {
            path: 'subcategory',
            select: '_id name category code factory',
            match: {},
            populate: [
                {
                    path: 'category',
                    select: '_id name'
                },
                {
                    path: 'factory',
                    select: '_id name'
                }
            ]
        };
        if (access != "all") {
            const coder = access === null || access === void 0 ? void 0 : access.split(",");
            qr.match = { 'code': { $in: coder } };
        }
        if (factory != "all") {
            qr.match = { 'factory.name': { $in: factory } };
        }
        let products = yield product_1.default.find(filter, {}, queryOptions)
            .populate(qr)
            .populate('factory', '_id name')
            .exec();
        products = products.filter(product => product.subcategory);
        let counts = yield product_1.default.find(filter, {}, {})
            .populate(qr)
            .populate('factory', '_id name')
            .exec();
        counts = counts.filter(count => count.subcategory);
        return {
            success: true,
            outputs: {
                count: counts.length,
                products
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
// ----------------------------------------------------------------------------
const getProductsBySubcategoryId = (subcategoryId, options) => __awaiter(void 0, void 0, void 0, function* () {
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
        const filter = { subcategory: subcategoryId };
        if (search) {
            filter.name = { $regex: search };
        }
        // Fetch the subcategories
        const count = yield product_1.default.countDocuments(filter);
        let products = yield product_1.default.find(filter, {}, queryOptions)
            .populate({
            path: 'subcategory',
            select: '_id name category',
            populate: {
                path: 'category',
                select: '_id name'
            }
        })
            .populate('factory', '_id name')
            .exec();
        return {
            success: true,
            outputs: {
                count,
                products
            }
        };
    }
    catch (error) {
        console.log('Error while getting the products by subcategory id: ', error);
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
const getProductsByFactoryId = (factoryId, options) => __awaiter(void 0, void 0, void 0, function* () {
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
        const filter = { factory: factoryId };
        if (search) {
            filter.name = { $regex: search };
        }
        // Fetch the subcategories
        const count = yield product_1.default.countDocuments(filter);
        let products = yield product_1.default.find(filter, {}, queryOptions)
            .populate({
            path: 'subcategory',
            select: '_id name category',
            populate: {
                path: 'category',
                select: '_id name'
            }
        })
            .populate('factory', '_id name')
            .exec();
        return {
            success: true,
            outputs: {
                count,
                products
            }
        };
    }
    catch (error) {
        console.log('Error while getting the products by factory id: ', error);
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
const getFactoriesProductsBySubcategoryUrlSlug = (subcategoryUrlSlug, options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if the product exists
        const subcategory = yield subcategory_1.default.findOne({ urlSlug: subcategoryUrlSlug }).exec();
        if (!subcategory) {
            return {
                success: false,
                error: {
                    statusCode: constants_1.statusCodes.notFound,
                    message: constants_1.errorMessages.shared.notFound
                }
            };
        }
        const { limit, skip } = options;
        // Fetch the products
        let subcategoryProducts = yield product_1.default.find({ subcategory: subcategory._id })
            .populate({
            path: 'subcategory',
            select: '_id name category',
            populate: {
                path: 'category',
                select: '_id name'
            }
        })
            .populate('factory', '_id name')
            .exec();
        let factoriesProducts = [];
        for (const product of subcategoryProducts) {
            // Checking if this product's factory exists in factoriesProducts list
            const factoryProductsIndex = factoriesProducts.findIndex((factoryProducts) => {
                if ('_id' in product.factory) {
                    return factoryProducts.factory._id.toString() == product.factory._id.toString();
                }
            });
            if (factoryProductsIndex !== -1) {
                // Add product to existing factory if factory exists
                factoriesProducts[factoryProductsIndex].products.push(product);
            }
            else {
                // Add factory and product if factory does not exist
                if ('_id' in product.factory) {
                    const factory = yield factory_1.default.findById(product.factory._id).exec();
                    if (factory) {
                        factoriesProducts.push({
                            factory,
                            products: [product]
                        });
                    }
                }
            }
        }
        const count = factoriesProducts.length;
        if (skip) {
            factoriesProducts = factoriesProducts.slice(skip);
        }
        if (limit) {
            factoriesProducts = factoriesProducts.slice(0, limit);
        }
        return {
            success: true,
            outputs: {
                count,
                factoriesProducts
            }
        };
    }
    catch (error) {
        console.log('Error while getting the factories products by subcategory id: ', error);
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
const editProduct = (productId, updates) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Make sure the record exists
        const product = yield product_1.default.findById(productId).exec();
        if (!product) {
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
        // Make sure the factory exists
        if (updates.factory) {
            const factoryExists = yield factory_1.default.findById(updates.factory).exec();
            if (!factoryExists) {
                return {
                    success: false,
                    error: {
                        message: constants_1.errorMessages.factoryService.noSuchFactory,
                        statusCode: constants_1.statusCodes.badRequest
                    }
                };
            }
        }
        const subcategory = yield subcategory_1.default.findById(product.subcategory)
            .populate('properties.property', 'name values').exec();
        if (!subcategory) {
            return {
                success: false,
                error: {
                    statusCode: constants_1.statusCodes.notFound,
                    message: constants_1.errorMessages.shared.notFound
                }
            };
        }
        if (updates.properties) {
            const propertiesToSave = [];
            updates.properties;
            // Check if all subcategory properties and proper value exist in properties
            const propertiesExist = subcategory.properties.every((subcategoryProperty) => {
                var _a;
                const existingProperty = (_a = updates.properties) === null || _a === void 0 ? void 0 : _a.find((property) => {
                    if ('name' in subcategoryProperty.property) {
                        if (property.name == subcategoryProperty.property.name && subcategoryProperty.property.values.includes(property.value)) {
                            return true;
                        }
                    }
                });
                if (existingProperty) {
                    propertiesToSave.push({
                        name: existingProperty.name,
                        value: existingProperty.value
                    });
                    return true;
                }
            });
            if (!propertiesExist) {
                return {
                    success: false,
                    error: {
                        statusCode: constants_1.statusCodes.badRequest,
                        message: constants_1.errorMessages.productService.invalidProperty
                    }
                };
            }
            updates.properties = propertiesToSave;
        }
        if (updates.images) {
            const existingImages = product.images;
            const updatedImages = [];
            // deleting images that no longer exist
            for (let image of existingImages) {
                if (!updates.images.includes(image)) {
                    yield image_service_1.default.deleteImage(image);
                }
            }
            // storing new images
            for (let image of updates.images) {
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
            updates.images = updatedImages;
        }
        if (updates.name) {
            // generating url slug off of name and a random number
            const namePart = updates.name.split(' ').join('-');
            const randomPart = (Math.floor(100000 + Math.random() * 900000)).toString();
            updates.urlSlug = namePart + randomPart;
        }
        if (updates.price) {
            // Adding new price to price history
            const priceHistory = product.priceHistory;
            priceHistory.push({
                price: updates.price,
                date: Math.floor(Date.now() / 1000)
            });
            updates.priceHistory = priceHistory;
        }
        // Update the product
        const updatedProduct = yield product_1.default.findByIdAndUpdate(productId, updates, { new: true })
            .populate({
            path: 'subcategory',
            select: '_id name category',
            populate: {
                path: 'category',
                select: '_id name'
            }
        })
            .populate('factory', '_id name')
            .exec();
        return {
            success: true,
            outputs: {
                updatedProduct
            }
        };
    }
    catch (error) {
        console.log('Error while updating the product: ', error);
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
const deleteProducts = (idList) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const siteInfo = yield siteInfo_1.default.findOne({ websiteName: constants_1.websiteName });
        let specialProducts = siteInfo === null || siteInfo === void 0 ? void 0 : siteInfo.mainPage.specialProducts;
        for (const id of idList) {
            // Find and delete the product
            const product = yield product_1.default.findByIdAndDelete(id).exec();
            if (product) {
                // Deleting images of deleted product
                for (const image in product.images) {
                    yield image_service_1.default.deleteImage(image);
                }
                // Removing the product from special products
                const index = specialProducts === null || specialProducts === void 0 ? void 0 : specialProducts.findIndex((specialProduct) => {
                    return specialProduct.factory === product.factory && specialProduct.subcategory === product.factory;
                });
                if (index && index !== -1 && specialProducts) {
                    const productIndex = specialProducts[index].products.findIndex((item) => {
                        return item == product._id;
                    });
                    if (productIndex !== -1) {
                        specialProducts[index].products = specialProducts[index].products.splice(productIndex, 1);
                        yield siteInfo_1.default.findByIdAndUpdate({ websiteName: constants_1.websiteName }, {
                            $set: {
                                'mainPage.specialProducts': specialProducts
                            }
                        });
                    }
                }
                // Removing the product from favorite products
                const users = yield user_1.default.find({ favoriteProducts: product._id }).exec();
                for (const user of users) {
                    const productIndex = user.favoriteProducts.findIndex((favoriteProduct) => {
                        favoriteProduct === product._id;
                    });
                    if (productIndex !== -1) {
                        user.favoriteProducts.splice(productIndex, 1);
                        yield user.save();
                    }
                }
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
// ----------------------------------------------------------------------------
const rateProduct = (productId, rating, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if the product exists
        const product = yield product_1.default.findById(productId).exec();
        if (!product) {
            return {
                success: false,
                error: {
                    statusCode: constants_1.statusCodes.notFound,
                    message: constants_1.errorMessages.shared.notFound
                }
            };
        }
        const existingRating = product.ratings.find((rating) => {
            rating.user.toString() == userId;
        });
        let updatedProduct;
        if (existingRating) {
            const ratingsSum = product.averageRating * product.ratingsCount - existingRating.rating + rating;
            const averageRating = ratingsSum / product.ratingsCount;
            const update = {
                averageRating,
                'ratings.$[i].rating': rating
            };
            const arrayFilters = [{ 'i.user': userId }];
            updatedProduct = yield product_1.default.findByIdAndUpdate(productId, update, { arrayFilters }).exec();
        }
        else {
            const ratingsSum = product.averageRating * product.ratingsCount + rating;
            const averageRating = ratingsSum / (product.ratingsCount + 1);
            const update = {
                averageRating,
                ratingsCount: product.ratingsCount + 1,
                $push: {
                    ratings: {
                        user: userId,
                        rating
                    }
                }
            };
            updatedProduct = yield product_1.default.findByIdAndUpdate(productId, update).exec();
        }
        return {
            success: true,
            outputs: {
                product: updatedProduct
            }
        };
    }
    catch (error) {
        console.log('Error while rating the product: ', error);
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
const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }
    return array;
};
exports.default = {
    addProduct,
    getProduct,
    getProducts,
    getProductsBySubcategoryId,
    getProductsByFactoryId,
    getFactoriesProductsBySubcategoryUrlSlug,
    editProduct,
    deleteProducts,
    rateProduct
};
