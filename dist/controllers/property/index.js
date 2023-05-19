"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.websitePropertyRouter = exports.panelPropertyRouter = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const addProperty_1 = __importDefault(require("./addProperty"));
const getProperties_1 = __importDefault(require("./getProperties"));
const getProperty_1 = __importDefault(require("./getProperty"));
const editProperty_1 = __importDefault(require("./editProperty"));
const deleteProperties_1 = __importDefault(require("./deleteProperties"));
exports.panelPropertyRouter = (0, express_1.Router)();
exports.websitePropertyRouter = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 * - name: Property | Panel
 *   description: Property routes for panel
 * - name: Property | Website
 *   description: Property routes for website
 */
/**
 * @swagger
 * /panel/property:
 *   post:
 *     tags:
 *       - Property | Panel
 *     summary: Add a property
 *     description: Add a new property
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
 *               values:
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *               - name
 *               - values
 *     responses:
 *       200:
 *         description: Added property
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 property:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     values:
 *                       type: array
 *                       items:
 *                         type: string
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
exports.panelPropertyRouter.post('/', addProperty_1.default);
/**
 * @swagger
 * /panel/property/{propertyId}:
 *   get:
 *     tags:
 *       - Property | Panel
 *     summary: Get a property by id
 *     description: Get a property in full details by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: propertyId
 *         in: path
 *         required: true
 *         description: The ID of the expected property
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fetched property
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 property:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     values:
 *                       type: array
 *                       items:
 *                         type: string
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
exports.panelPropertyRouter.get('/:propertyId', (0, auth_1.default)('admin'), getProperty_1.default);
/**
 * @swagger
 * /panel/property:
 *   get:
 *     tags:
 *       - Property | Panel
 *     summary: Get a list of properties
 *     description: Get a list of properties in full details by passing the desired query parameters
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
 *           enum: ['name', 'createdAt', 'updatedAt']
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
 *         description: The list of properties
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: number
 *                 properties:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       values:
 *                         type: array
 *                         items:
 *                           type: string
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
exports.panelPropertyRouter.get('/', (0, auth_1.default)('admin'), getProperties_1.default);
/**
 * @swagger
 * /panel/property/{propertyId}:
 *   patch:
 *     tags:
 *       - Property | Panel
 *     summary: Edit a property by id
 *     description: Edit a property by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: propertyId
 *         in: path
 *         required: true
 *         description: The ID of the property
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
 *                   values:
 *                     type: array
 *                     items:
 *                       type: string
 *             required:
 *               - updates
 *     responses:
 *       200:
 *         description: Updated property
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 property:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     values:
 *                       type: array
 *                       items:
 *                         type: string
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
exports.panelPropertyRouter.patch('/:propertyId', (0, auth_1.default)('admin'), editProperty_1.default);
/**
 * @swagger
 * /panel/property/delete:
 *   post:
 *     tags:
 *       - Property | Panel
 *     summary: Delete a list of properties
 *     description: Delete a list of properties by passing an array of their id's
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
 *         description: The passed properties deleted
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
exports.panelPropertyRouter.post('/delete', (0, auth_1.default)('admin'), deleteProperties_1.default);
//--------------------------------------------------------------------------------------
/**
 * @swagger
 * /website/property/{propertyId}:
 *   get:
 *     tags:
 *       - Property | Website
 *     summary: Get a property by id
 *     description: Get a property in full details by id
 *     parameters:
 *       - name: propertyId
 *         in: path
 *         required: true
 *         description: The ID of the expected property
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fetched property
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 property:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     values:
 *                       type: array
 *                       items:
 *                         type: string
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
exports.websitePropertyRouter.get('/:propertyId', (0, auth_1.default)('user'), getProperty_1.default);
/**
 * @swagger
 * /website/property:
 *   get:
 *     tags:
 *       - Property | Website
 *     summary: Get a list of properties
 *     description: Get a list of properties in full details by passing the desired query parameters
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
 *           enum: ['name', 'createdAt', 'updatedAt']
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
 *         description: The list of properties
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: number
 *                 properties:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       values:
 *                         type: array
 *                         items:
 *                           type: string
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
exports.websitePropertyRouter.get('/', getProperties_1.default);
