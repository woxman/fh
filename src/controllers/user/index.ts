import { Router } from 'express'

import auth from "../../middlewares/auth"
import login from './login'
import sendLoginCode from './sendLoginCode'
import logout from './logout'
import getCurrentUser from './getCurrentUser'
import editUser from './editUser'
import toggleFavoriteProduct from './toggleFavoriteProduct'
import deleteUser from './logout'

export const websiteUserRouter = Router()



/**
 * @swagger
 * tags:
 * - name: User | Website
 *   description: User routes for website
 */



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
websiteUserRouter.post('/login-code', sendLoginCode)



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
websiteUserRouter.post('/login', login)



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
websiteUserRouter.post('/logout', auth('user'), logout)



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
websiteUserRouter.get('/', auth('user'), getCurrentUser)



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
websiteUserRouter.patch('/', auth('user'), editUser)



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
websiteUserRouter.post('/favorite/toggle', auth('user'), toggleFavoriteProduct)



websiteUserRouter.delete('/', auth('user'), deleteUser)

