"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.websiteProductRouter = exports.panelProductRouter = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const addProduct_1 = __importDefault(require("./addProduct"));
const getProduct_1 = __importDefault(require("./getProduct"));
const getProducts_1 = __importDefault(require("./getProducts"));
const getProductsByFactoryId_1 = __importDefault(require("./getProductsByFactoryId"));
const getProductsBySubcategoryId_1 = __importDefault(require("./getProductsBySubcategoryId"));
const getFactoriesProductsBySubcategoryId_1 = __importDefault(require("./getFactoriesProductsBySubcategoryId"));
const editProduct_1 = __importDefault(require("./editProduct"));
const deleteProducts_1 = __importDefault(require("./deleteProducts"));
const rateProduct_1 = __importDefault(require("./rateProduct"));
exports.panelProductRouter = (0, express_1.Router)();
exports.websiteProductRouter = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 * - name: Product | Panel
 *   description: Product routes for panel
 * - name: Product | Website
 *   description: Product routes for website
 */
/**
 * @swagger
 * /panel/product/subcategory/{subcategoryId}:
 *   post:
 *     tags:
 *       - Product | Panel
 *     summary: Add a product
 *     description: Add a new product
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: subcategoryId
 *         in: path
 *         required: true
 *         description: ID of the subcategory to which the new product will be related
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               factory:
 *                 type: string
 *                 description: Id of the related factory
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               properties:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     value:
 *                       type: string
 *               unit:
 *                 type: string
 *               price:
 *                 type: number
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     format:
 *                       type: string
 *                     data:
 *                       type: string
 *                       format: binary
 *             required:
 *               - factory
 *               - name
 *               - description
 *               - properties
 *               - unit
 *               - tags
 *               - images
 *     responses:
 *       200:
 *         description: Added product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     subcategory:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         category:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                             name:
 *                               type: string
 *                     factory:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                     name:
 *                       type: string
 *                     urlSlug:
 *                       type: string
 *                     description:
 *                       type: string
 *                     properties:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                           value:
 *                             type: string
 *                     unit:
 *                       type: string
 *                     price:
 *                       type: number
 *                     priceHistory:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           price:
 *                             type: number
 *                           date:
 *                             type: number
 *                     tags:
 *                       type: array
 *                       items:
 *                         type: string
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                     averageRating:
 *                       type: number
 *                     ratingsCount:
 *                       type: number
 *                     ratings:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           user:
 *                             type: string
 *                             description: ID of the related user
 *                           rating:
 *                             type: number
 *                     createdAt:
 *                       type: number
 *                     updatedAt:
 *                       type: number
 *       400:
 *         description: Unique fields required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       422:
 *         description: Data validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
exports.panelProductRouter.post('/subcategory/:subcategoryId', (0, auth_1.default)('admin'), addProduct_1.default);
/**
 * @swagger
 * /panel/product/{productId}:
 *   get:
 *     tags:
 *       - Product | Panel
 *     summary: Get a product by id
 *     description: Get a product in full details by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: The ID of the expected product
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fetched product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     subcategory:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         category:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                             name:
 *                               type: string
 *                     factory:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                     name:
 *                       type: string
 *                     urlSlug:
 *                       type: string
 *                     description:
 *                       type: string
 *                     properties:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                           value:
 *                             type: string
 *                     unit:
 *                       type: string
 *                     price:
 *                       type: number
 *                     priceHistory:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           price:
 *                             type: number
 *                           date:
 *                             type: number
 *                     tags:
 *                       type: array
 *                       items:
 *                         type: string
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                     averageRating:
 *                       type: number
 *                     ratingsCount:
 *                       type: number
 *                     ratings:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           user:
 *                             type: string
 *                             description: ID of the related user
 *                           rating:
 *                             type: number
 *                     complementaryProducts:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           description:
 *                             type: string
 *                           price:
 *                             type: number
 *                           images:
 *                             type: array
 *                             items:
 *                               type: string
 *                     createdAt:
 *                       type: number
 *                     updatedAt:
 *                       type: number
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
exports.panelProductRouter.get('/:productId', (0, auth_1.default)('admin'), getProduct_1.default);
/**
 * @swagger
 * /panel/product:
 *   get:
 *     tags:
 *       - Product | Panel
 *     summary: Get a list of products
 *     description: Get a list of products in full details by passing the desired query parameters
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: limit
 *         in: query
 *         schema:
 *           type: number
 *         description: The number of items to return
 *       - name: skip
 *         in: query
 *         schema:
 *           type: number
 *         description: The number of items to skip before starting to collect the results
 *       - name: sortBy
 *         in: query
 *         schema:
 *           type: string
 *           enum: ['name', 'unit', 'createdAt', 'updatedAt']
 *         description: The property to sort by
 *       - name: sortOrder
 *         in: query
 *         schema:
 *           type: string
 *           enum: ['asc', 'desc']
 *         description: The order to sort by
 *       - name: search
 *         in: query
 *         schema:
 *           type: string
 *         description: The expression to filter name of the results by
 *     responses:
 *       200:
 *         description: The list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: number
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       subcategory:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           category:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                       factory:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                       name:
 *                         type: string
 *                       urlSlug:
 *                         type: string
 *                       description:
 *                         type: string
 *                       properties:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             name:
 *                               type: string
 *                             value:
 *                               type: string
 *                       unit:
 *                         type: string
 *                       price:
 *                         type: number
 *                       priceHistory:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             price:
 *                               type: number
 *                             date:
 *                               type: number
 *                       tags:
 *                         type: array
 *                         items:
 *                           type: string
 *                       images:
 *                         type: array
 *                         items:
 *                           type: string
 *                       averageRating:
 *                         type: number
 *                       ratingsCount:
 *                         type: number
 *                       ratings:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             user:
 *                               type: string
 *                               description: ID of the related user
 *                             rating:
 *                               type: number
 *                       createdAt:
 *                         type: number
 *                       updatedAt:
 *                         type: number
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
exports.panelProductRouter.get('/', (0, auth_1.default)('admin'), getProducts_1.default);
/**
 * @swagger
 * /panel/product/subcategory/{subcategoryId}:
 *   get:
 *     tags:
 *       - Product | Panel
 *     summary: Get a list of products by subcategory id
 *     description: Get a list of products in a subcategory (by passing id of the subcategory) in full details by passing the desired query parameters
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: subcategoryId
 *         in: path
 *         required: true
 *         description: ID of the subcategory whose products we want
 *         schema:
 *           type: string
 *       - name: limit
 *         in: query
 *         schema:
 *           type: number
 *         description: The number of items to return
 *       - name: skip
 *         in: query
 *         schema:
 *           type: number
 *         description: The number of items to skip before starting to collect the results
 *       - name: sortBy
 *         in: query
 *         schema:
 *           type: string
 *           enum: ['name', 'unit', 'createdAt', 'updatedAt']
 *         description: The property to sort by
 *       - name: sortOrder
 *         in: query
 *         schema:
 *           type: string
 *           enum: ['asc', 'desc']
 *         description: The order to sort by
 *       - name: search
 *         in: query
 *         schema:
 *           type: string
 *         description: The expression to filter the results by
 *     responses:
 *       200:
 *         description: The list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: number
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       subcategory:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           category:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                       factory:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string`
 *                           name:
 *                             type: string
 *                       name:
 *                         type: string
 *                       urlSlug:
 *                         type: string
 *                       description:
 *                         type: string
 *                       properties:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             name:
 *                               type: string
 *                             value:
 *                               type: string
 *                       unit:
 *                         type: string
 *                       price:
 *                         type: number
 *                       priceHistory:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             price:
 *                               type: number
 *                             date:
 *                               type: number
 *                       tags:
 *                         type: array
 *                         items:
 *                           type: string
 *                       images:
 *                         type: array
 *                         items:
 *                           type: string
 *                       averageRating:
 *                         type: number
 *                       ratingsCount:
 *                         type: number
 *                       ratings:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             user:
 *                               type: string
 *                               description: ID of the related user
 *                             rating:
 *                               type: number
 *                       createdAt:
 *                         type: number
 *                       updatedAt:
 *                         type: number
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
exports.panelProductRouter.get('/subcategory/:subcategoryId', (0, auth_1.default)('admin'), getProductsBySubcategoryId_1.default);
/**
 * @swagger
 * /panel/product/factory/{factoryId}:
 *   get:
 *     tags:
 *       - Product | Panel
 *     summary: Get a list of products by factory id
 *     description: Get a list of products in a factory (by passing id of the factory) in full details by passing the desired query parameters
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: factoryId
 *         in: path
 *         required: true
 *         description: ID of the factory whose products we want
 *         schema:
 *           type: string
 *       - name: limit
 *         in: query
 *         schema:
 *           type: number
 *         description: The number of items to return
 *       - name: skip
 *         in: query
 *         schema:
 *           type: number
 *         description: The number of items to skip before starting to collect the results
 *       - name: sortBy
 *         in: query
 *         schema:
 *           type: string
 *           enum: ['name', 'unit', 'createdAt', 'updatedAt']
 *         description: The property to sort by
 *       - name: sortOrder
 *         in: query
 *         schema:
 *           type: string
 *           enum: ['asc', 'desc']
 *         description: The order to sort by
 *       - name: search
 *         in: query
 *         schema:
 *           type: string
 *         description: The expression to filter the results by
 *     responses:
 *       200:
 *         description: The list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: number
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       subcategory:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           category:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                       factory:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                       name:
 *                         type: string
 *                       urlSlug:
 *                         type: string
 *                       description:
 *                         type: string
 *                       properties:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             name:
 *                               type: string
 *                             value:
 *                               type: string
 *                       unit:
 *                         type: string
 *                       price:
 *                         type: number
 *                       images:
 *                         type: array
 *                         items:
 *                           type: string
 *                       averageRating:
 *                         type: number
 *                       ratingsCount:
 *                         type: number
 *                       ratings:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             user:
 *                               type: string
 *                               description: ID of the related user
 *                             rating:
 *                               type: number
 *                       createdAt:
 *                         type: number
 *                       updatedAt:
 *                         type: number
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
exports.panelProductRouter.get('/factory/:factoryId', (0, auth_1.default)('admin'), getProductsByFactoryId_1.default);
/**
 * @swagger
 * /panel/product/{productId}:
 *   patch:
 *     tags:
 *       - Product | Panel
 *     summary: Edit a product by id
 *     description: Edit a product by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: The ID of the product
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               updates:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   factory:
 *                     type: string
 *                   description:
 *                     type: string
 *                   properties:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                         value:
 *                           type: string
 *                   unit:
 *                     type: string
 *                   price:
 *                     type: number
 *                   tags:
 *                     type: array
 *                     items:
 *                       type: string
 *                   images:
 *                     type: array
 *                     items:
 *                       oneOf:
 *                         - type: string
 *                         - type: object
 *                           properties:
 *                             format:
 *                               type: string
 *                             data:
 *                               type: string
 *                               format: binary
 *     responses:
 *       200:
 *         description: Updated product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     subcategory:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         category:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                             name:
 *                               type: string
 *                     factory:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                     name:
 *                       type: string
 *                     urlSlug:
 *                       type: string
 *                     description:
 *                       type: string
 *                     properties:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                           value:
 *                             type: string
 *                     unit:
 *                       type: string
 *                     price:
 *                       type: number
 *                     priceHistory:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           price:
 *                             type: number
 *                           date:
 *                             type: number
 *                     tags:
 *                       type: array
 *                       items:
 *                         type: string
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                     averageRating:
 *                       type: number
 *                     ratingsCount:
 *                       type: number
 *                     ratings:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           user:
 *                             type: string
 *                             description: ID of the related user
 *                           rating:
 *                             type: number
 *                     createdAt:
 *                       type: number
 *                     updatedAt:
 *                       type: number
 *       400:
 *         description: Unique fields required or no changes received
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       422:
 *         description: Data validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
exports.panelProductRouter.patch('/:productId', (0, auth_1.default)('admin'), editProduct_1.default);
/**
 * @swagger
 * /panel/product/delete:
 *   post:
 *     tags:
 *       - Product | Panel
 *     summary: Delete a list of products
 *     description: Delete a list of products by passing an array of their id's
 *     security:
 *       - adminBearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idList:
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *               - idList
 *     responses:
 *       200:
 *         description: The passed products deleted
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
exports.panelProductRouter.post('/delete', (0, auth_1.default)('admin'), deleteProducts_1.default);
//-------------------------------------------------------------------------------------------
/**
 * @swagger
 * /website/product/{productId}:
 *   get:
 *     tags:
 *       - Product | Website
 *     summary: Get a product by id
 *     description: Get a product in full details by id
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: The ID of the expected product
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fetched product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     subcategory:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         category:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                             name:
 *                               type: string
 *                     factory:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                     name:
 *                       type: string
 *                     urlSlug:
 *                       type: string
 *                     description:
 *                       type: string
 *                     properties:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                           value:
 *                             type: string
 *                     unit:
 *                       type: string
 *                     price:
 *                       type: number
 *                     priceHistory:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           price:
 *                             type: number
 *                           date:
 *                             type: number
 *                     tags:
 *                       type: array
 *                       items:
 *                         type: string
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                     averageRating:
 *                       type: number
 *                     ratingsCount:
 *                       type: number
 *                     ratings:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           user:
 *                             type: string
 *                             description: ID of the related user
 *                           rating:
 *                             type: number
 *                     complementaryProducts:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           description:
 *                             type: string
 *                           price:
 *                             type: number
 *                           images:
 *                             type: array
 *                             items:
 *                               type: string
 *                     createdAt:
 *                       type: number
 *                     updatedAt:
 *                       type: number
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
exports.websiteProductRouter.get('/:productId', getProduct_1.default);
/**
 * @swagger
 * /website/product:
 *   get:
 *     tags:
 *       - Product | Website
 *     summary: Get a list of products
 *     description: Get a list of products in full details by passing the desired query parameters
 *     parameters:
 *       - name: limit
 *         in: query
 *         schema:
 *           type: number
 *         description: The number of items to return
 *       - name: skip
 *         in: query
 *         schema:
 *           type: number
 *         description: The number of items to skip before starting to collect the results
 *       - name: sortBy
 *         in: query
 *         schema:
 *           type: string
 *           enum: ['name', 'unit', 'createdAt', 'updatedAt']
 *         description: The property to sort by
 *       - name: sortOrder
 *         in: query
 *         schema:
 *           type: string
 *           enum: ['asc', 'desc']
 *         description: The order to sort by
 *       - name: search
 *         in: query
 *         schema:
 *           type: string
 *         description: The expression to filter name of the results by
 *     responses:
 *       200:
 *         description: The list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: number
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       subcategory:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           category:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                       factory:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                       name:
 *                         type: string
 *                       urlSlug:
 *                         type: string
 *                       description:
 *                         type: string
 *                       properties:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             name:
 *                               type: string
 *                             value:
 *                               type: string
 *                       unit:
 *                         type: string
 *                       price:
 *                         type: number
 *                       priceHistory:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             price:
 *                               type: number
 *                             date:
 *                               type: number
 *                       tags:
 *                         type: array
 *                         items:
 *                           type: string
 *                       images:
 *                         type: array
 *                         items:
 *                           type: string
 *                       averageRating:
 *                         type: number
 *                       ratingsCount:
 *                         type: number
 *                       ratings:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             user:
 *                               type: string
 *                               description: ID of the related user
 *                             rating:
 *                               type: number
 *                       createdAt:
 *                         type: number
 *                       updatedAt:
 *                         type: number
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
exports.websiteProductRouter.get('/', getProducts_1.default);
/**
 * @swagger
 * /website/product/subcategory/{subcategoryId}:
 *   get:
 *     tags:
 *       - Product | Website
 *     summary: Get a list of factories products by subcategory id
 *     description: Get a list of factories products in a subcategory (by passing id of the subcategory) in full details by passing the desired query parameters
 *     parameters:
 *       - name: subcategoryId
 *         in: path
 *         required: true
 *         description: ID of the subcategory whose products we want
 *         schema:
 *           type: string
 *       - name: limit
 *         in: query
 *         schema:
 *           type: number
 *         description: The number of items to return
 *       - name: skip
 *         in: query
 *         schema:
 *           type: number
 *         description: The number of items to skip before starting to collect the results
 *     responses:
 *       200:
 *         description: The list of factories products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: number
 *                 factoriesProducts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       factory:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           city:
 *                             type: string
 *                           icon:
 *                             type: string
 *                           createdAt:
 *                             type: number
 *                           updatedAt:
 *                             type: number
 *                       products:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                             subcategory:
 *                               type: object
 *                               properties:
 *                                 _id:
 *                                   type: string
 *                                 name:
 *                                   type: string
 *                                 category:
 *                                   type: object
 *                                   properties:
 *                                     _id:
 *                                       type: string
 *                                     name:
 *                                       type: string
 *                             factory:
 *                               type: object
 *                               properties:
 *                                 _id:
 *                                   type: string
 *                                 name:
 *                                   type: string
 *                             name:
 *                               type: string
 *                             urlSlug:
 *                               type: string
 *                             description:
 *                               type: string
 *                             properties:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   name:
 *                                     type: string
 *                                   value:
 *                                     type: string
 *                             unit:
 *                               type: string
 *                             price:
 *                               type: number
 *                             priceHistory:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   price:
 *                                     type: number
 *                                   date:
 *                                     type: number
 *                             tags:
 *                               type: array
 *                               items:
 *                                 type: string
 *                             images:
 *                               type: array
 *                               items:
 *                                 type: string
 *                             averageRating:
 *                               type: number
 *                             ratingsCount:
 *                               type: number
 *                             ratings:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   user:
 *                                     type: string
 *                                     description: ID of the related user
 *                                   rating:
 *                                     type: number
 *                             createdAt:
 *                               type: number
 *                             updatedAt:
 *                               type: number
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
exports.websiteProductRouter.get('/subcategory/:subcategoryId', getFactoriesProductsBySubcategoryId_1.default);
/**
 * @swagger
 * /website/product/{productId}/rate:
 *   post:
 *     tags:
 *       - Product | Website
 *     summary: Rate a product
 *     description: Rate a new product
 *     security:
 *       - userBearerAuth: []
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: ID of the product to rate
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: string
 *             required:
 *               - rating
 *     responses:
 *       200:
 *         description: Updated product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     subcategory:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         category:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                             name:
 *                               type: string
 *                     factory:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                     name:
 *                       type: string
 *                     urlSlug:
 *                       type: string
 *                     description:
 *                       type: string
 *                     properties:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                           value:
 *                             type: string
 *                     unit:
 *                       type: string
 *                     price:
 *                       type: number
 *                     priceHistory:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           price:
 *                             type: number
 *                           date:
 *                             type: number
 *                     tags:
 *                       type: array
 *                       items:
 *                         type: string
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                     averageRating:
 *                       type: number
 *                     ratingsCount:
 *                       type: number
 *                     ratings:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           user:
 *                             type: string
 *                             description: ID of the related user
 *                           rating:
 *                             type: number
 *                     createdAt:
 *                       type: number
 *                     updatedAt:
 *                       type: number
 *       400:
 *         description: Unique fields required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       422:
 *         description: Data validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
exports.websiteProductRouter.post('/:productId/rate', (0, auth_1.default)('user'), rateProduct_1.default);
