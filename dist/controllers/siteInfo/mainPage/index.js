"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.websiteMainPageRouter = exports.panelMainPageRouter = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../../middlewares/auth"));
const updateLogo_1 = __importDefault(require("./updateLogo"));
const getLogo_1 = __importDefault(require("./getLogo"));
const updateNewsAndBanner_1 = __importDefault(require("./updateNewsAndBanner"));
const getNewsAndBanner_1 = __importDefault(require("./getNewsAndBanner"));
const addSocialNetwork_1 = __importDefault(require("./addSocialNetwork"));
const getSocialNetwork_1 = __importDefault(require("./getSocialNetwork"));
const getSocialNetworks_1 = __importDefault(require("./getSocialNetworks"));
const editSocialNetwork_1 = __importDefault(require("./editSocialNetwork"));
const deleteSocialNetwork_1 = __importDefault(require("./deleteSocialNetwork"));
const addOrderStep_1 = __importDefault(require("./addOrderStep"));
const addGalleryStep_1 = __importDefault(require("./addGalleryStep"));
const getOrderStep_1 = __importDefault(require("./getOrderStep"));
const getGalleryStep_1 = __importDefault(require("./getGalleryStep"));
const getOrderSteps_1 = __importDefault(require("./getOrderSteps"));
const getGallerySteps_1 = __importDefault(require("./getGallerySteps"));
const editOrderStep_1 = __importDefault(require("./editOrderStep"));
const editGalleryStep_1 = __importDefault(require("./editGalleryStep"));
const deleteOrderStep_1 = __importDefault(require("./deleteOrderStep"));
const deleteGalleryStep_1 = __importDefault(require("./deleteGalleryStep"));
const updateFooter_1 = __importDefault(require("./updateFooter"));
const getFooter_1 = __importDefault(require("./getFooter"));
const updateSpecialProducts_1 = __importDefault(require("./updateSpecialProducts"));
const getSpecialProducts_1 = __importDefault(require("./getSpecialProducts"));
exports.panelMainPageRouter = (0, express_1.Router)();
exports.websiteMainPageRouter = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 * - name: Main page | Panel
 *   description: Main page routes for panel
 * - name: Main page | Website
 *   description: Main page routes for website
 */
/**
 * @swagger
 * /panel/site-info/main-page/logo:
 *   put:
 *     tags:
 *       - Main page | Panel
 *     summary: Update site logo
 *     description: Update site logo
 *     security:
 *       - adminBearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               logo:
 *                 type: object
 *                 properties:
 *                   format:
 *                     type: string
 *                   data:
 *                     type: string
 *                     format: binary
 *             required:
 *               - logo
 *     responses:
 *       200:
 *         description: Logo url
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 logo:
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
exports.panelMainPageRouter.put('/logo', (0, auth_1.default)('admin'), updateLogo_1.default);
/**
 * @swagger
 * /panel/site-info/main-page/logo:
 *   get:
 *     tags:
 *       - Main page | Panel
 *     summary: get site logo url
 *     description: get site logo url
 *     security:
 *       - adminBearerAuth: []
 *     responses:
 *       200:
 *         description: Logo url
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 logo:
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
exports.panelMainPageRouter.get('/logo', (0, auth_1.default)('admin'), getLogo_1.default);
/**
 * @swagger
 * /panel/site-info/main-page/news-and-banner:
 *   put:
 *     tags:
 *       - Main page | Panel
 *     summary: Update main page news and banner
 *     description: Update main page news and banner
 *     security:
 *       - adminBearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               news:
 *                 type: string
 *               banner:
 *                 oneOf:
 *                   - type: object
 *                     properties:
 *                       format:
 *                         type: string
 *                       data:
 *                         type: string
 *                         format: binary
 *                   - type: string
 *             required:
 *               - news
 *               - banner
 *     responses:
 *       200:
 *         description: main page news and banner
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 newsAndBanner:
 *                   type: object
 *                   properties:
 *                     news:
 *                       type: string
 *                     banner:
 *                       type: string
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
exports.panelMainPageRouter.put('/news-and-banner', (0, auth_1.default)('admin'), updateNewsAndBanner_1.default);
/**
 * @swagger
 * /panel/site-info/main-page/news-and-banner:
 *   get:
 *     tags:
 *       - Main page | Panel
 *     summary: Get main page news and banner
 *     description: Get main page news and banner
 *     security:
 *       - adminBearerAuth: []
 *     responses:
 *       200:
 *         description: main page news and banner
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 newsAndBanner:
 *                   type: object
 *                   properties:
 *                     news:
 *                       type: string
 *                     banner:
 *                       type: string
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
exports.panelMainPageRouter.get('/news-and-banner', (0, auth_1.default)('admin'), getNewsAndBanner_1.default);
/**
 * @swagger
 * /panel/site-info/main-page/social-network:
 *   post:
 *     tags:
 *       - Main page | Panel
 *     summary: Add a social network
 *     description: Add a social network
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
 *               link:
 *                 type: string
 *               show:
 *                 type: boolean
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
 *               - link
 *               - show
 *               - icon
 *     responses:
 *       200:
 *         description: Created social networks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 socialNerworks:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     link:
 *                       type: string
 *                     show:
 *                       type: boolean
 *                     icon:
 *                       type: string
 *                     createdAt:
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
exports.panelMainPageRouter.post('/social-network', (0, auth_1.default)('admin'), addSocialNetwork_1.default);
/**
 * @swagger
 * /panel/site-info/main-page/social-network/{socialNerworkId}:
 *   get:
 *     tags:
 *       - Main page | Panel
 *     summary: Get a social network
 *     description: Get a social network by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: socialNerworkId
 *         in: path
 *         required: true
 *         description: The ID of the social nerwork
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The expected social network
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 socialNerwork:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     link:
 *                       type: string
 *                     show:
 *                       type: boolean
 *                     icon:
 *                       type: string
 *                     createdAt:
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
exports.panelMainPageRouter.get('/social-network/:socialNetworkId', (0, auth_1.default)('admin'), getSocialNetwork_1.default);
/**
 * @swagger
 * /panel/site-info/main-page/social-network:
 *   get:
 *     tags:
 *       - Main page | Panel
 *     summary: Get all social networks
 *     description: Get all social networks
 *     security:
 *       - adminBearerAuth: []
 *     responses:
 *       200:
 *         description: List of the social networks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 socialNerworks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       link:
 *                         type: string
 *                       show:
 *                         type: boolean
 *                       icon:
 *                         type: string
 *                       createdAt:
 *                         type: number
 *                 count:
 *                   type: number
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
exports.panelMainPageRouter.get('/social-network', (0, auth_1.default)('admin'), getSocialNetworks_1.default);
/**
 * @swagger
 * /panel/site-info/main-page/social-network/{socialNetworkId}:
 *   patch:
 *     tags:
 *       - Main page | Panel
 *     summary: Edit a social network
 *     description: Edit a social network by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: socialNerworkId
 *         in: path
 *         required: true
 *         description: The ID of the social nerwork
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
 *                   link:
 *                     type: string
 *                   show:
 *                     type: boolean
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
 *         description: Updated social network
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 socialNerwork:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     link:
 *                       type: string
 *                     show:
 *                       type: boolean
 *                     icon:
 *                       type: string
 *                     createdAt:
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
exports.panelMainPageRouter.patch('/social-network/:socialNetworkId', (0, auth_1.default)('admin'), editSocialNetwork_1.default);
/**
 * @swagger
 * /panel/site-info/main-page/social-network/{socialNerworkId}:
 *   delete:
 *     tags:
 *       - Main page | Panel
 *     summary: Delete a social network
 *     description: Delete a social network by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: socialNerworkId
 *         in: path
 *         required: true
 *         description: The ID of the social nerwork
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The social network deleted
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
exports.panelMainPageRouter.delete('/social-network/:socialNetworkId', (0, auth_1.default)('admin'), deleteSocialNetwork_1.default);
//Herer Start
/**
 * @swagger
 * /panel/site-info/main-page/order-step:
 *   post:
 *     tags:
 *       - Main page | Panel
 *     summary: Add an order step
 *     description: Add an order step
 *     security:
 *       - adminBearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               step:
 *                 type: number
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: object
 *                 properties:
 *                   format:
 *                     type: string
 *                   data:
 *                     type: string
 *                     format: binary
 *             required:
 *               - step
 *               - title
 *               - description
 *               - image
 *     responses:
 *       200:
 *         description: Created order step
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderStep:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     step:
 *                       type: string
 *                     title:
 *                       type: string
 *                     description:
 *                       type: boolean
 *                     image:
 *                       type: string
 *                     createdAt:
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
exports.panelMainPageRouter.post('/order-step', (0, auth_1.default)('admin'), addOrderStep_1.default);
/**
 * @swagger
 * /panel/site-info/main-page/gallery-step:
 *   post:
 *     tags:
 *       - Main page | Panel
 *     summary: Add an gallery
 *     description: Add an gallery
 *     security:
 *       - adminBearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               step:
 *                 type: number
 *               link:
 *                 type: string
 *               which:
 *                 type: string
 *               image:
 *                 type: object
 *                 properties:
 *                   format:
 *                     type: string
 *                   data:
 *                     type: string
 *                     format: binary
 *             required:
 *               - step
 *               - which
 *               - image
 *     responses:
 *       200:
 *         description: Created gallery
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderStep:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     step:
 *                       type: string
 *                     link:
 *                       type: string
 *                     which:
 *                       type: string
 *                     image:
 *                       type: string
 *                     createdAt:
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
exports.panelMainPageRouter.post('/gallery-step', (0, auth_1.default)('admin'), addGalleryStep_1.default);
/**
 * @swagger
 * /panel/site-info/main-page/order-step/{orderStepId}:
 *   get:
 *     tags:
 *       - Main page | Panel
 *     summary: Get an order step
 *     description: Get an order step by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: orderStepId
 *         in: path
 *         required: true
 *         description: The ID of the order step
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The expected order step
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderStep:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     step:
 *                       type: string
 *                     title:
 *                       type: string
 *                     description:
 *                       type: boolean
 *                     image:
 *                       type: string
 *                     createdAt:
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
exports.panelMainPageRouter.get('/order-step/:orderStepId', (0, auth_1.default)('admin'), getOrderStep_1.default);
/**
 * @swagger
 * /panel/site-info/main-page/gallery-step/{galleryStepId}:
 *   get:
 *     tags:
 *       - Main page | Panel
 *     summary: Get an order step
 *     description: Get an gallery step by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: orderStepId
 *         in: path
 *         required: true
 *         description: The ID of the gallery step
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The expected gallery step
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderStep:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     step:
 *                       type: string
 *                     link:
 *                       type: string
 *                     which:
 *                       type: boolean
 *                     image:
 *                       type: string
 *                     createdAt:
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
exports.panelMainPageRouter.get('/gallery-step/:galleryStepId', (0, auth_1.default)('admin'), getGalleryStep_1.default);
/**
 * @swagger
 * /panel/site-info/main-page/order-step:
 *   get:
 *     tags:
 *       - Main page | Panel
 *     summary: Get all order steps
 *     description: Get all order steps
 *     security:
 *       - adminBearerAuth: []
 *     responses:
 *       200:
 *         description: List of the order steps
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderSteps:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       step:
 *                         type: string
 *                       title:
 *                         type: string
 *                       description:
 *                         type: boolean
 *                       image:
 *                         type: string
 *                       createdAt:
 *                         type: number
 *                 count:
 *                   type: number
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
exports.panelMainPageRouter.get('/order-step', (0, auth_1.default)('admin'), getOrderSteps_1.default);
/**
 * @swagger
 * /panel/site-info/main-page/gallery-step:
 *   get:
 *     tags:
 *       - Main page | Panel
 *     summary: Get all gallery steps
 *     description: Get all gallery steps
 *     security:
 *       - adminBearerAuth: []
 *     responses:
 *       200:
 *         description: List of the gallery steps
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderSteps:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       step:
 *                         type: string
 *                       link:
 *                         type: string
 *                       which:
 *                         type: boolean
 *                       image:
 *                         type: string
 *                       createdAt:
 *                         type: number
 *                 count:
 *                   type: number
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
exports.panelMainPageRouter.get('/gallery-step', (0, auth_1.default)('admin'), getGallerySteps_1.default);
/**
 * @swagger
 * /panel/site-info/main-page/order-step/{orderStepId}:
 *   patch:
 *     tags:
 *       - Main page | Panel
 *     summary: Edit an order step
 *     description: Edit an order step by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: orderStepId
 *         in: path
 *         required: true
 *         description: The ID of the order step
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
 *                   step:
 *                     type: number
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   image:
 *                     type: object
 *                     properties:
 *                       format:
 *                         type: string
 *                       data:
 *                         type: string
 *                         format: binary
 *     responses:
 *       200:
 *         description: Updated order step
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderStep:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     step:
 *                       type: string
 *                     title:
 *                       type: string
 *                     description:
 *                       type: boolean
 *                     image:
 *                       type: string
 *                     createdAt:
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
exports.panelMainPageRouter.patch('/order-step/:orderStepId', (0, auth_1.default)('admin'), editOrderStep_1.default);
/**
 * @swagger
 * /panel/site-info/main-page/gallery-step/{galleryStepId}:
 *   patch:
 *     tags:
 *       - Main page | Panel
 *     summary: Edit an gallery step
 *     description: Edit an gallery step by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: galleryStepId
 *         in: path
 *         required: true
 *         description: The ID of the gallery step
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
 *                   step:
 *                     type: number
 *                   link:
 *                     type: string
 *                   which:
 *                     type: string
 *                   image:
 *                     type: object
 *                     properties:
 *                       format:
 *                         type: string
 *                       data:
 *                         type: string
 *                         format: binary
 *     responses:
 *       200:
 *         description: Updated gallery step
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderStep:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     step:
 *                       type: string
 *                     link:
 *                       type: string
 *                     which:
 *                       type: boolean
 *                     image:
 *                       type: string
 *                     createdAt:
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
exports.panelMainPageRouter.patch('/gallery-step/:galleryStepId', (0, auth_1.default)('admin'), editGalleryStep_1.default);
/**
 * @swagger
 * /panel/site-info/main-page/order-step/{orderStepId}:
 *   delete:
 *     tags:
 *       - Main page | Panel
 *     summary: Delete an order step
 *     description: Delete an order step
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: orderStepId
 *         in: path
 *         required: true
 *         description: The ID of the order step
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The order step deleted
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
exports.panelMainPageRouter.delete('/order-step/:orderStepId', (0, auth_1.default)('admin'), deleteOrderStep_1.default);
/**
 * @swagger
 * /panel/site-info/main-page/gallery-step/{galleryStepId}:
 *   delete:
 *     tags:
 *       - Main page | Panel
 *     summary: Delete an gallery step
 *     description: Delete an gallery step
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: galleryStepId
 *         in: path
 *         required: true
 *         description: The ID of the gallery step
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The gallery step deleted
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
exports.panelMainPageRouter.delete('/gallery-step/:galleryStepId', (0, auth_1.default)('admin'), deleteGalleryStep_1.default);
//Herer Stop
/**
 * @swagger
 * /panel/site-info/main-page/footer:
 *   put:
 *     tags:
 *       - Main page | Panel
 *     summary: Update main page footer
 *     description: Update main page footer
 *     security:
 *       - adminBearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               workHours:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   oneOf:
 *                     - type: string
 *                     - type: object
 *                       properties:
 *                         format:
 *                           type: string
 *                         data:
 *                           type: string
 *                           format: binary
 *             required:
 *               - content
 *               - email
 *               - phone
 *               - address
 *               - workHours
 *               - images
 *     responses:
 *       200:
 *         description: main page footer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 footer:
 *                   type: object
 *                   properties:
 *                     content:
 *                       type: string
 *                     email:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     address:
 *                       type: string
 *                     workHours:
 *                       type: string
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
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
exports.panelMainPageRouter.put('/footer', (0, auth_1.default)('admin'), updateFooter_1.default);
/**
 * @swagger
 * /panel/site-info/main-page/footer:
 *   get:
 *     tags:
 *       - Main page | Panel
 *     summary: Get main page footer
 *     description: Get main page footer
 *     security:
 *       - adminBearerAuth: []
 *     responses:
 *       200:
 *         description: main page footer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 footer:
 *                   type: object
 *                   properties:
 *                     content:
 *                       type: string
 *                     email:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     address:
 *                       type: string
 *                     workHours:
 *                       type: string
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
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
exports.panelMainPageRouter.get('/footer', (0, auth_1.default)('admin'), getFooter_1.default);
/**
 * @swagger
 * /panel/site-info/main-page/special-products:
 *   put:
 *     tags:
 *       - Main page | Panel
 *     summary: Update main page special products
 *     description: Update main page special products
 *     security:
 *       - adminBearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               specialProducts:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     subcategory:
 *                       type: string
 *                       description: ID of the related subcategory
 *                     factory:
 *                       type: string
 *                       description: ID of the related factory
 *                     products:
 *                       type: array
 *                       items:
 *                         type: string
 *                         description: ID of the related product
 *             required:
 *               - specialProducts
 *     responses:
 *       200:
 *         description: main page special products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 specialProducts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       subcategory:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                       factory:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                       products:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                             name:
 *                               type: string
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
exports.panelMainPageRouter.put('/special-products', (0, auth_1.default)('admin'), updateSpecialProducts_1.default);
/**
 * @swagger
 * /panel/site-info/main-page/special-products:
 *   get:
 *     tags:
 *       - Main page | Panel
 *     summary: Get main page special products
 *     description: Get main page special products
 *     security:
 *       - adminBearerAuth: []
 *     responses:
 *       200:
 *         description: main page special products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 specialProducts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       subcategory:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                       factory:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                       products:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                             name:
 *                               type: string
 *                             priceHistory:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   price:
 *                                     type: number
 *                                   date:
 *                                     type: number
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
exports.panelMainPageRouter.get('/special-products', (0, auth_1.default)('admin'), getSpecialProducts_1.default);
//---------------------------------------------------------------
/**
 * @swagger
 * /website/site-info/main-page/logo:
 *   get:
 *     tags:
 *       - Main page | Website
 *     summary: get site logo url
 *     description: get site logo url
 *     responses:
 *       200:
 *         description: Logo url
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 logo:
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
exports.websiteMainPageRouter.get('/logo', getLogo_1.default);
/**
 * @swagger
 * /website/site-info/main-page/news-and-banner:
 *   get:
 *     tags:
 *       - Main page | Website
 *     summary: Get main page news and banner
 *     description: Get main page news and banner
 *     responses:
 *       200:
 *         description: main page news and banner
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 newsAndBanner:
 *                   type: object
 *                   properties:
 *                     news:
 *                       type: string
 *                     banner:
 *                       type: string
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
exports.websiteMainPageRouter.get('/news-and-banner', getNewsAndBanner_1.default);
/**
 * @swagger
 * /website/site-info/main-page/social-network:
 *   get:
 *     tags:
 *       - Main page | Website
 *     summary: Get all social networks
 *     description: Get all social networks
 *     responses:
 *       200:
 *         description: List of the social networks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 socialNerworks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       link:
 *                         type: string
 *                       show:
 *                         type: boolean
 *                       icon:
 *                         type: string
 *                       createdAt:
 *                         type: number
 *                 count:
 *                   type: number
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
exports.websiteMainPageRouter.get('/social-network', getSocialNetworks_1.default);
/**
 * @swagger
 * /website/site-info/main-page/order-step:
 *   get:
 *     tags:
 *       - Main page | Website
 *     summary: Get all order steps
 *     description: Get all order steps
 *     responses:
 *       200:
 *         description: List of the order steps
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderSteps:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       step:
 *                         type: string
 *                       title:
 *                         type: string
 *                       description:
 *                         type: boolean
 *                       image:
 *                         type: string
 *                       createdAt:
 *                         type: number
 *                 count:
 *                   type: number
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
exports.websiteMainPageRouter.get('/order-step', getOrderSteps_1.default);
/**
 * @swagger
 * /website/site-info/main-page/footer:
 *   get:
 *     tags:
 *       - Main page | Website
 *     summary: Get main page footer
 *     description: Get main page footer
 *     responses:
 *       200:
 *         description: main page footer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 footer:
 *                   type: object
 *                   properties:
 *                     content:
 *                       type: string
 *                     email:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     address:
 *                       type: string
 *                     workHours:
 *                       type: string
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
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
exports.websiteMainPageRouter.get('/footer', getFooter_1.default);
/**
 * @swagger
 * /website/site-info/main-page/special-products:
 *   get:
 *     tags:
 *       - Main page | Website
 *     summary: Get main page special products
 *     description: Get main page special products
 *     responses:
 *       200:
 *         description: main page special products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 specialProducts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       subcategory:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                       factory:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                       products:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                             name:
 *                               type: string
 *                             priceHistory:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   price:
 *                                     type: number
 *                                   date:
 *                                     type: number
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
exports.websiteMainPageRouter.get('/special-products', getSpecialProducts_1.default);
