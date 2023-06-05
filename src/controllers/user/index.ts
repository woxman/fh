import { Router } from 'express'

import auth from "../../middlewares/auth"
import login from './login'
import addUser from './addUser'
import addUsers from './addUsers'
import sendLoginCode from './sendLoginCode'
import logout from './logout'
import getCurrentUser from './getCurrentUser'
import getUser from './getUser'
import getUsers from './getUsers'
import editUser from './editUser'
import toggleFavoriteProduct from './toggleFavoriteProduct'
import deleteUser from './deleteUser'

import User, { IUser } from "../../db/models/user/user"

export const websiteUserRouter = Router()
export const panelUserRouter = Router()



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
panelUserRouter.post('/', auth('admin'),  addUser)

/**
 * @swagger
 * /panel/user/combo:
 *   post:
 *     tags:
 *       - User | Panel
 *     summary: Create a new users
 *     description: Create a new users
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
 *                 type: array
 *                 items:
 *                   type: string
 *               name:
 *                 type: array
 *                 items:
 *                   type: string
 *               email:
 *                 type: array
 *                 items:
 *                   type: string
 *               addresses:
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *               - phone
 *               - name
 *               - email
 *               - addresses
 *     responses:
 *       200:
 *         description: An users object.
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
 *                       type: array
 *                       items:
 *                         type: string
 *                     name:
 *                       type: array
 *                       items:
 *                         type: string
 *                     email:
  *                       type: array
 *                       items:
 *                         type: string
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
panelUserRouter.post('/combo', auth('admin'),  addUsers)


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
 * /panel/user:
 *   get:
 *     tags:
 *       - User | Panel
 *     summary: Get list of users
 *     description: Get list of users
 *     security:
 *       - usersBearerAuth: []
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
 *           enum: ["name", "email", "phone", "addresses", "createdAt", "updatedAt"]
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
 *         description: List of user objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       phone:
 *                         type: string
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       addresses:
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
panelUserRouter.get('/', auth('admin'), getUsers)

/**
 * @swagger
 * /panel/user/{userId}:
 *   get:
 *     tags:
 *       - User | Panel
 *     summary: get an user by id
 *     description: get an user by id
 *     security:
 *       - userBearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: The ID of the user
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
panelUserRouter.get('/:userId', auth('admin'), getUser)

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
websiteUserRouter.get('/', getCurrentUser)


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
panelUserRouter.patch('/', auth('user'), editUser)


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


//websiteUserRouter.delete('/', auth('user'), deleteUser)


panelUserRouter.delete('/', auth('user'), deleteUser)

