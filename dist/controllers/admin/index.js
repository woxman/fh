"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.panelAdminRouter = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const addAdmin_1 = __importDefault(require("./addAdmin"));
const createGodAdmin_1 = __importDefault(require("./createGodAdmin"));
const login_1 = __importDefault(require("./login"));
const logout_1 = __importDefault(require("./logout"));
const getCurrentAdmin_1 = __importDefault(require("./getCurrentAdmin"));
const getAdmin_1 = __importDefault(require("./getAdmin"));
const getAdmins_1 = __importDefault(require("./getAdmins"));
const editAdmin_1 = __importDefault(require("./editAdmin"));
const editCurrentAdmin_1 = __importDefault(require("./editCurrentAdmin"));
const deleteAdmins_1 = __importDefault(require("./deleteAdmins"));
const forgetPassword_1 = __importDefault(require("./forgetPassword"));
const changePassword_1 = __importDefault(require("./changePassword"));
exports.panelAdminRouter = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 * - name: Admin | Panel
 *   description: Admin routes for panel
 */
/**
 * @swagger
 * /panel/admin:
 *   post:
 *     tags:
 *       - Admin | Panel
 *     summary: Create a new admin
 *     description: Create a new admin
 *     security:
 *       - adminBearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isSuperAdmin:
 *                 type: boolean
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *               name:
 *                 type: string
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *               - isSuperAdmin
 *               - email
 *               - password
 *               - name
 *     responses:
 *       200:
 *         description: An admin object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 admin:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     isGodAdmin:
 *                       type: boolean
 *                     isSuperAdmin:
 *                       type: boolean
 *                     email:
 *                       type: string
 *                     password:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     name:
 *                       type: string
 *                     permissions:
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
exports.panelAdminRouter.post('/', (0, auth_1.default)('admin'), addAdmin_1.default);
exports.panelAdminRouter.post('/god', createGodAdmin_1.default);
/**
 * @swagger
 * /panel/admin/login:
 *   post:
 *     tags:
 *       - Admin | Panel
 *     summary: Login to admin panel
 *     description: Login to admin panel
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login was successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 admin:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     isGodAdmin:
 *                       type: boolean
 *                     isSuperAdmin:
 *                       type: boolean
 *                     email:
 *                       type: string
 *                     password:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     name:
 *                       type: string
 *                     permissions:
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
exports.panelAdminRouter.post('/login', login_1.default);
/**
 * @swagger
 * /panel/admin/logout:
 *   post:
 *     tags:
 *       - Admin | Panel
 *     summary: Logout from admin panel
 *     description: Logout from admin panel
 *     security:
 *       - adminBearerAuth: []
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
exports.panelAdminRouter.post('/logout', (0, auth_1.default)('admin'), logout_1.default);
/**
 * @swagger
 * /panel/admin/current:
 *   get:
 *     tags:
 *       - Admin | Panel
 *     summary: get current admin
 *     description: get current admin
 *     security:
 *       - adminBearerAuth: []
 *     responses:
 *       200:
 *         description: An admin object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 admin:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     isGodAdmin:
 *                       type: boolean
 *                     isSuperAdmin:
 *                       type: boolean
 *                     email:
 *                       type: string
 *                     password:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     name:
 *                       type: string
 *                     permissions:
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
exports.panelAdminRouter.get('/current', (0, auth_1.default)('admin'), getCurrentAdmin_1.default);
/**
 * @swagger
 * /panel/admin/{adminId}:
 *   get:
 *     tags:
 *       - Admin | Panel
 *     summary: get an admin by id
 *     description: get an admin by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: adminId
 *         in: path
 *         required: true
 *         description: The ID of the admin
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: An admin object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 admin:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     isGodAdmin:
 *                       type: boolean
 *                     isSuperAdmin:
 *                       type: boolean
 *                     email:
 *                       type: string
 *                     password:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     name:
 *                       type: string
 *                     permissions:
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
exports.panelAdminRouter.get('/:adminId', (0, auth_1.default)('admin'), getAdmin_1.default);
/**
 * @swagger
 * /panel/admin:
 *   get:
 *     tags:
 *       - Admin | Panel
 *     summary: Get list of admins
 *     description: Get list of admins
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
 *           enum: ["name", "email", "phone", "isSuperAdmin", "createdAt", "updatedAt"]
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
 *         description: List of admin objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 admins:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       isGodAdmin:
 *                         type: boolean
 *                       isSuperAdmin:
 *                         type: boolean
 *                       email:
 *                         type: string
 *                       password:
 *                         type: string
 *                       phone:
 *                         type: string
 *                       name:
 *                         type: string
 *                       permissions:
 *                         type: array
 *                         items:
 *                           type: string
 *                       createdAt:
 *                         type: number
 *                       updatedAt:
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
exports.panelAdminRouter.get('/', (0, auth_1.default)('admin'), getAdmins_1.default);
/**
 * @swagger
 * /panel/admin/{adminId}:
 *   patch:
 *     tags:
 *       - Admin | Panel
 *     summary: Edit an admin by id
 *     description: Edit an admin by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: adminId
 *         in: path
 *         required: true
 *         description: The ID of the admin
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
 *                   isSuperAdmin:
 *                     type: boolean
 *                   email:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   name:
 *                     type: string
 *                   permissions:
 *                     type: array
 *                     items:
 *                       type: string
 *     responses:
 *       200:
 *         description: An admin object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 admin:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     isGodAdmin:
 *                       type: boolean
 *                     isSuperAdmin:
 *                       type: boolean
 *                     email:
 *                       type: string
 *                     password:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     name:
 *                       type: string
 *                     permissions:
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
exports.panelAdminRouter.patch('/:adminId', (0, auth_1.default)('admin'), editAdmin_1.default);
/**
 * @swagger
 * /panel/admin/current:
 *   patch:
 *     tags:
 *       - Admin | Panel
 *     summary: Edit current admin
 *     description: Edit current admin
 *     security:
 *       - adminBearerAuth: []
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
 *                   email:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   name:
 *                     type: string
 *     responses:
 *       200:
 *         description: An admin object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 admin:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     isGodAdmin:
 *                       type: boolean
 *                     isSuperAdmin:
 *                       type: boolean
 *                     email:
 *                       type: string
 *                     password:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     name:
 *                       type: string
 *                     permissions:
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
 *         description: Unique fields required or no changes received
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
exports.panelAdminRouter.patch('/current', (0, auth_1.default)('admin'), editCurrentAdmin_1.default);
/**
 * @swagger
 * /panel/admin/delete:
 *   post:
 *     tags:
 *       - Admin | Panel
 *     summary: Delete admins by id
 *     description: Delete admins by id
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
 *         description: The admins deleted.
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
 *         description: Permission required
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
exports.panelAdminRouter.post('/delete', (0, auth_1.default)('admin'), deleteAdmins_1.default);
exports.panelAdminRouter.post('/forget-password', forgetPassword_1.default);
exports.panelAdminRouter.post('/change-password', (0, auth_1.default)('admin'), changePassword_1.default);
