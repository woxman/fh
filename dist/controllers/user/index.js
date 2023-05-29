"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.panelUserRouter = exports.websiteUserRouter = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const login_1 = __importDefault(require("./login"));
const addUser_1 = __importDefault(require("./addUser"));
const sendLoginCode_1 = __importDefault(require("./sendLoginCode"));
const logout_1 = __importDefault(require("./logout"));
const getCurrentUser_1 = __importDefault(require("./getCurrentUser"));
const editUser_1 = __importDefault(require("./editUser"));
const toggleFavoriteProduct_1 = __importDefault(require("./toggleFavoriteProduct"));
const deleteUser_1 = __importDefault(require("./deleteUser"));
exports.websiteUserRouter = (0, express_1.Router)();
exports.panelUserRouter = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 * - name: User | Website
 *   description: User routes for website
 */
/**
 * @swagger
 * /panel/user:
 *   post:
 *     tags:
 *       - User | Panel
 *     summary: Create a new user
 *     description: Create a new user
 *     security:
 *       - userBearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               addresses:
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *               - phone
 *               - name
 *     responses:
 *       200:
 *         description: An user object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     addresses:
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
 *       400:
 *         description: The name is taken
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
exports.panelUserRouter.post('/', (0, auth_1.default)('admin'), addUser_1.default);
/**
 * @swagger
 * /website/user/login-code:
 *   post:
 *     tags:
 *       - User | Website
 *     summary: send login code to user phone
 *     description: send login code to user phone (create new user if user doesn't exist)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *             required:
 *               - phone
 *     responses:
 *       200:
 *         description: Login code was sent to the user's phone
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
exports.websiteUserRouter.post('/login-code', sendLoginCode_1.default);
/**
 * @swagger
 * /website/user/login:
 *   post:
 *     tags:
 *       - User | Website
 *     summary: Login user
 *     description: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               code:
 *                 type: string
 *             required:
 *               - phone
 *               - code
 *     responses:
 *       200:
 *         description: Login was successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     phone:
 *                       type: boolean
 *                     name:
 *                       type: boolean
 *                     email:
 *                       type: string
 *                     favoriteProducts:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           subcategory:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                           factory:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                           name:
 *                             type: string
 *                           urlSlug:
 *                             type: string
 *                           description:
 *                             type: string
 *                           properties:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 name:
 *                                   type: string
 *                                 value:
 *                                   type: string
 *                           unit:
 *                             type: string
 *                           price:
 *                             type: number
 *                           priceHistory:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 price:
 *                                   type: number
 *                                 date:
 *                                   type: number
 *                           tags:
 *                             type: array
 *                             items:
 *                               type: string
 *                           images:
 *                             type: array
 *                             items:
 *                               type: string
 *                           averageRating:
 *                             type: number
 *                           ratingsCount:
 *                             type: number
 *                           ratings:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 user:
 *                                   type: string
 *                                   description: ID of the related user
 *                                 rating:
 *                                   type: number
 *                           createdAt:
 *                             type: number
 *                           updatedAt:
 *                             type: number
 *                     addresses:
 *                       type: array
 *                       items:
 *                         type: string
 *                     createdAt:
 *                       type: number
 *                     updatedAt:
 *                       type: number
 *                 token:
 *                   type: string
 *       400:
 *         description: Incorrect credentials
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
exports.websiteUserRouter.post('/login', login_1.default);
/**
 * @swagger
 * /website/user/logout:
 *   post:
 *     tags:
 *       - User | Website
 *     summary: Logout user
 *     description: Logout user
 *     security:
 *       - userBearerAuth: []
 *     responses:
 *       200:
 *         description: Logout was successful
 *       401:
 *         description: Not Authorized
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
exports.websiteUserRouter.post('/logout', (0, auth_1.default)('user'), logout_1.default);
/**
 * @swagger
 * /website/user:
 *   get:
 *     tags:
 *       - User | Website
 *     summary: get current user
 *     description: get current user
 *     security:
 *       - userBearerAuth: []
 *     responses:
 *       200:
 *         description: A user object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     phone:
 *                       type: boolean
 *                     name:
 *                       type: boolean
 *                     email:
 *                       type: string
 *                     favoriteProducts:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           subcategory:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                           factory:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                           name:
 *                             type: string
 *                           urlSlug:
 *                             type: string
 *                           description:
 *                             type: string
 *                           properties:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 name:
 *                                   type: string
 *                                 value:
 *                                   type: string
 *                           unit:
 *                             type: string
 *                           price:
 *                             type: number
 *                           priceHistory:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 price:
 *                                   type: number
 *                                 date:
 *                                   type: number
 *                           tags:
 *                             type: array
 *                             items:
 *                               type: string
 *                           images:
 *                             type: array
 *                             items:
 *                               type: string
 *                           averageRating:
 *                             type: number
 *                           ratingsCount:
 *                             type: number
 *                           ratings:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 user:
 *                                   type: string
 *                                   description: ID of the related user
 *                                 rating:
 *                                   type: number
 *                           createdAt:
 *                             type: number
 *                           updatedAt:
 *                             type: number
 *                     addresses:
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
exports.websiteUserRouter.get('/', (0, auth_1.default)('user'), getCurrentUser_1.default);
/**
 * @swagger
 * /website/user:
 *   patch:
 *     tags:
 *       - User | Website
 *     summary: Edit current user
 *     description: Edit current user
 *     security:
 *       - userBearerAuth: []
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
 *                   email:
 *                     type: string
 *                   addresses:
 *                     type: array
 *                     items:
 *                       type: string
 *     responses:
 *       200:
 *         description: A user object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     phone:
 *                       type: boolean
 *                     name:
 *                       type: boolean
 *                     email:
 *                       type: string
 *                     favoriteProducts:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           subcategory:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                           factory:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                           name:
 *                             type: string
 *                           urlSlug:
 *                             type: string
 *                           description:
 *                             type: string
 *                           properties:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 name:
 *                                   type: string
 *                                 value:
 *                                   type: string
 *                           unit:
 *                             type: string
 *                           price:
 *                             type: number
 *                           priceHistory:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 price:
 *                                   type: number
 *                                 date:
 *                                   type: number
 *                           tags:
 *                             type: array
 *                             items:
 *                               type: string
 *                           images:
 *                             type: array
 *                             items:
 *                               type: string
 *                           averageRating:
 *                             type: number
 *                           ratingsCount:
 *                             type: number
 *                           ratings:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 user:
 *                                   type: string
 *                                   description: ID of the related user
 *                                 rating:
 *                                   type: number
 *                           createdAt:
 *                             type: number
 *                           updatedAt:
 *                             type: number
 *                     addresses:
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
 *       400:
 *         description: Unique fields required or no changes received or special permission required
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
exports.websiteUserRouter.patch('/', (0, auth_1.default)('user'), editUser_1.default);
/**
 * @swagger
 * /panel/user:
 *   patch:
 *     tags:
 *       - User | Website
 *     summary: Edit current user
 *     description: Edit current user
 *     security:
 *       - userBearerAuth: []
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
 *                   email:
 *                     type: string
 *                   addresses:
 *                     type: array
 *                     items:
 *                       type: string
 *     responses:
 *       200:
 *         description: A user object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     phone:
 *                       type: boolean
 *                     name:
 *                       type: boolean
 *                     email:
 *                       type: string
 *                     favoriteProducts:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           subcategory:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                           factory:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                           name:
 *                             type: string
 *                           urlSlug:
 *                             type: string
 *                           description:
 *                             type: string
 *                           properties:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 name:
 *                                   type: string
 *                                 value:
 *                                   type: string
 *                           unit:
 *                             type: string
 *                           price:
 *                             type: number
 *                           priceHistory:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 price:
 *                                   type: number
 *                                 date:
 *                                   type: number
 *                           tags:
 *                             type: array
 *                             items:
 *                               type: string
 *                           images:
 *                             type: array
 *                             items:
 *                               type: string
 *                           averageRating:
 *                             type: number
 *                           ratingsCount:
 *                             type: number
 *                           ratings:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 user:
 *                                   type: string
 *                                   description: ID of the related user
 *                                 rating:
 *                                   type: number
 *                           createdAt:
 *                             type: number
 *                           updatedAt:
 *                             type: number
 *                     addresses:
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
 *       400:
 *         description: Unique fields required or no changes received or special permission required
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
exports.panelUserRouter.patch('/', (0, auth_1.default)('user'), editUser_1.default);
/**
 * @swagger
 * /website/user/favorite/toggle:
 *   post:
 *     tags:
 *       - User | Website
 *     summary: Add or remove a favorite product
 *     description: Add or remove a favorite product
 *     security:
 *       - userBearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *             required:
 *               - productId
 *     responses:
 *       200:
 *         description: Favorite product toggled successfully
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
exports.websiteUserRouter.post('/favorite/toggle', (0, auth_1.default)('user'), toggleFavoriteProduct_1.default);
//websiteUserRouter.delete('/', auth('user'), deleteUser)
exports.panelUserRouter.delete('/', (0, auth_1.default)('user'), deleteUser_1.default);
