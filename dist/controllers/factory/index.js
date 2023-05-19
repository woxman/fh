"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.websiteFactoryRouter = exports.panelFactoryRouter = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const addFactory_1 = __importDefault(require("./addFactory"));
const getFactories_1 = __importDefault(require("./getFactories"));
const getFactory_1 = __importDefault(require("./getFactory"));
const getFactoriesBySubcategoryId_1 = __importDefault(require("./getFactoriesBySubcategoryId"));
const editFactory_1 = __importDefault(require("./editFactory"));
const deleteFactories_1 = __importDefault(require("./deleteFactories"));
exports.panelFactoryRouter = (0, express_1.Router)();
exports.websiteFactoryRouter = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 * - name: Factory | Panel
 *   description: Factory routes for panel
 * - name: Factory | Website
 *   description: Factory routes for website
 */
/**
 * @swagger
 * /panel/factory:
 *   post:
 *     tags:
 *       - Factory | Panel
 *     summary: Add a factory
 *     description: Add a new factory
 *     security:
 *       - adminBearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               city:
 *                 type: string
 *               description:
 *                 type: string
 *               icon:
 *                 type: object
 *                 properties:
 *                   format:
 *                     type: string
 *                   data:
 *                     type: string
 *                     format: binary
 *             required:
 *               - name
 *               - city
 *               - icon
 *     responses:
 *       200:
 *         description: Added factory
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 factory:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     city:
 *                       type: string
 *                     description:
 *                       type: string
 *                     icon:
 *                       type: string
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
exports.panelFactoryRouter.post('/', (0, auth_1.default)('admin'), addFactory_1.default);
/**
 * @swagger
 * /panel/factory/{factoryId}:
 *   get:
 *     tags:
 *       - Factory | Panel
 *     summary: Get a factory by id
 *     description: Get a factory in full details by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: factoryId
 *         in: path
 *         required: true
 *         description: The ID of the expected factory
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fetched factory
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 factory:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     city:
 *                       type: string
 *                     description:
 *                       type: string
 *                     icon:
 *                       type: string
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
exports.panelFactoryRouter.get('/:factoryId', (0, auth_1.default)('admin'), getFactory_1.default);
/**
 * @swagger
 * /panel/factory:
 *   get:
 *     tags:
 *       - Factory | Panel
 *     summary: Get a list of factories
 *     description: Get a list of factories in full details by passing the desired query parameters
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
 *           enum: ['name', 'city', 'createdAt', 'updatedAt']
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
 *         description: The expression to filter the name of results by
 *     responses:
 *       200:
 *         description: The list of factories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: number
 *                 factories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       city:
 *                         type: string
 *                       description:
 *                         type: string
 *                       icon:
 *                         type: string
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
exports.panelFactoryRouter.get('/', (0, auth_1.default)('admin'), getFactories_1.default);
/**
 * @swagger
 * /panel/factory/{factoryId}:
 *   patch:
 *     tags:
 *       - Factory | Panel
 *     summary: Edit a factory
 *     description: Edit a factory by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: factoryId
 *         in: path
 *         required: true
 *         description: The ID of the factory
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
 *                   city:
 *                     type: string
 *                   description:
 *                     type: string
 *                   icon:
 *                     type: object
 *                     properties:
 *                       format:
 *                         type: string
 *                       data:
 *                         type: string
 *                         format: binary
 *     responses:
 *       200:
 *         description: Updated factory
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 factory:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     city:
 *                       type: string
 *                     icon:
 *                       type: string
 *                     description:
 *                       type: string
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
exports.panelFactoryRouter.patch('/:factoryId', (0, auth_1.default)('admin'), editFactory_1.default);
/**
 * @swagger
 * /panel/factory/delete:
 *   post:
 *     tags:
 *       - Factory | Panel
 *     summary: Delete a list of factories
 *     description: Delete a list of factories by passing an array of their id's
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
 *         description: The passed factories deleted
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
exports.panelFactoryRouter.post('/delete', (0, auth_1.default)('admin'), deleteFactories_1.default);
//------------------------------------------------------------------------------------------
/**
 * @swagger
 * /website/factory/{factoryId}:
 *   get:
 *     tags:
 *       - Factory | Website
 *     summary: Get a factory by id
 *     description: Get a factory in full details by id
 *     parameters:
 *       - name: factoryId
 *         in: path
 *         required: true
 *         description: The ID of the expected factory
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fetched factory
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 factory:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     city:
 *                       type: string
 *                     description:
 *                       type: string
 *                     icon:
 *                       type: string
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
exports.websiteFactoryRouter.get('/:factoryId', getFactory_1.default);
/**
 * @swagger
 * /website/factory:
 *   get:
 *     tags:
 *       - Factory | Website
 *     summary: Get a list of factories
 *     description: Get a list of factories in full details by passing the desired query parameters
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
 *           enum: ['name', 'city', 'createdAt', 'updatedAt']
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
 *         description: The expression to filter the name of results by
 *     responses:
 *       200:
 *         description: The list of factories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: number
 *                 factories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       city:
 *                         type: string
 *                       description:
 *                         type: string
 *                       icon:
 *                         type: string
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
exports.websiteFactoryRouter.get('/', getFactories_1.default);
/**
 * @swagger
 * /website/factory/subcategory/{subcategoryId}:
 *   get:
 *     tags:
 *       - Factory | Website
 *     summary: Get factories by subcategory id
 *     description: Get factories witch has at least a product with provided subcategory id
 *     parameters:
 *       - name: subcategoryId
 *         in: path
 *         required: true
 *         description: The ID of the expected subcategory
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fetched factories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 factories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
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
exports.websiteFactoryRouter.get('/subcategory/:subcategoryId', getFactoriesBySubcategoryId_1.default);
