import { Router } from 'express'

import auth from "../../middlewares/auth"
import addPage from './addPage'
import getPage from './getPage'
import getPages from './getPages'
import getPagesByCategory from './getPagesByCategory'
import getPagesByTag from './getPagesByTag'
import editPage from './editPage'
import deletePages from './deletePages'
import getTags from './getTags'
import getCategorys from './getCategorys'
import getCategories from '../category/getCategories'

export const panelPageRouter = Router()
export const websitePageRouter = Router()

/**
 * @swagger
 * components:
 *  securitySchemes:
 *    userBearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    adminBearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 */


/**
 * @swagger
 * tags:
 * - name: Page | Panel
 *   description: Page routes for panel
 * - name: Page | Website
 *   description: Page routes for website
 */


/**
 * @swagger
 * /panel/page:
 *   post:
 *     tags:
 *       - Page | Panel
 *     summary: Create a new page
 *     description: Create a new page
 *     security:
 *       - adminBearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               summary:
 *                 type: string
 *               author:
 *                 type: string
 *               content:
 *                 type: string
 *               show:
 *                 type: boolean
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               categorys:
 *                 type: array
 *                 items:
 *                   type: string
 *               cover:
 *                 type: object
 *                 properties:
 *                   format:
 *                     type: string
 *                   data:
 *                     type: string
 *                     format: binary
 *             required:
 *               - title
 *               - summary
 *               - author
 *               - content
 *               - show
 *               - tags
 *               - categorys
 *     responses:
 *       200:
 *         description: A page object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     summary:
 *                       type: string
 *                     author:
 *                       type: string
 *                     content:
 *                       type: string
 *                     show:
 *                       type: boolean
 *                     tags:
 *                       type: array
 *                       items:
 *                         type: string
 *                     categorys:
 *                       type: array
 *                       items:
 *                         type: string
 *                     cover:
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
 *       400:
 *         description: The title is taken
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
panelPageRouter.post('/', auth('admin'), addPage)



/**
 * @swagger
 * /panel/page/{pageId}:
 *   get:
 *     tags:
 *       - Page | Panel
 *     summary: get a page by id
 *     description: get a page by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: pageId
 *         in: path
 *         required: true
 *         description: The ID of the page
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A page object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     summary:
 *                       type: string
 *                     author:
 *                       type: string
 *                     content:
 *                       type: string
 *                     show:
 *                       type: boolean
 *                     tags:
 *                       type: array
 *                       items:
 *                         type: string
 *                     categorys:
 *                       type: array
 *                       items:
 *                         type: string
 *                     cover:
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
panelPageRouter.get('/:pageId', auth('admin'), getPage)



/**
 * @swagger
 * /panel/page:
 *   get:
 *     tags:
 *       - Page | Panel
 *     summary: Get list of pages
 *     description: Get list of pages
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
 *           enum: ["title", "view", "author", "createdAt", "updatedAt"]
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
 *         description: List of page objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pages:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       summary:
 *                         type: string
 *                       author:
 *                         type: string
 *                       content:
 *                         type: string
 *                       show:
 *                         type: boolean
 *                       tags:
 *                         type: array
 *                         items:
 *                           type: string
 *                       categorys:
 *                         type: array
 *                         items:
 *                           type: string
 *                       cover:
 *                         type: string
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
panelPageRouter.get('/', auth('admin'), getPages)


/**
 * @swagger
 * /panel/page/{pageId}:
 *   patch:
 *     tags:
 *       - Page | Panel
 *     summary: Edit a page by id
 *     description: Edit a page by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: pageId
 *         in: path
 *         required: true
 *         description: The ID of the page
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
 *                   title:
 *                     type: string
 *                   summary:
 *                     type: string
 *                   author:
 *                     type: string
 *                   content:
 *                     type: string
 *                   show:
 *                     type: boolean
 *                   tags:
 *                     type: array
 *                     items:
 *                       type: string
 *                   categorys:
 *                     type: array
 *                     items:
 *                       type: string
 *                   cover:
 *                     type: object
 *                     properties:
 *                       format:
 *                         type: string
 *                       data:
 *                         type: string
 *                         format: binary
 *     responses:
 *       200:
 *         description: A page object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     summary:
 *                       type: string
 *                     author:
 *                       type: string
 *                     content:
 *                       type: string
 *                     show:
 *                       type: boolean
 *                     tags:
 *                       type: array
 *                       items:
 *                         type: string
 *                     categorys:
 *                       type: array
 *                       items:
 *                         type: string
 *                     cover:
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
panelPageRouter.patch('/:pageId', auth('admin'), editPage)



/**
 * @swagger
 * /panel/page/delete:
 *   post:
 *     tags:
 *       - Page | Panel
 *     summary: Delete pages by id
 *     description: Delete pages by id
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
 *         description: The pages deleted.
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
panelPageRouter.post('/delete', auth('admin'), deletePages)



/**
 * @swagger
 * /panel/page/tags/all:
 *   get:
 *     tags:
 *       - Page | Panel
 *     summary: get list of used tags in pages
 *     description: get list of used tags in pages
 *     security:
 *       - adminBearerAuth: []
 *     responses:
 *       200:
 *         description: A list of tags.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
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
panelPageRouter.get('/tags/all', auth('admin'), getTags)


/**
 * @swagger
 * /panel/page/Categorys/all:
 *   get:
 *     Categorys:
 *       - Page | Panel
 *     summary: get list of used Categorys in pages
 *     description: get list of used Categorys in pages
 *     security:
 *       - adminBearerAuth: []
 *     responses:
 *       200:
 *         description: A list of Categorys.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Categorys:
 *                   type: array
 *                   items:
 *                     type: string
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
panelPageRouter.get('/tags/all', auth('admin'), getCategorys)

//----------------------------------------------------



/**
 * @swagger
 * /website/page/{pageId}:
 *   get:
 *     tags:
 *       - Page | Website
 *     summary: get a page by id
 *     description: get a page by id
 *     parameters:
 *       - name: pageId
 *         in: path
 *         required: true
 *         description: The ID of the page
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A page object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     summary:
 *                       type: string
 *                     author:
 *                       type: string
 *                     content:
 *                       type: string
 *                     show:
 *                       type: boolean
 *                     tags:
 *                       type: array
 *                       items:
 *                         type: string
 *                     category:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                     cover:
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
websitePageRouter.get('/:pageId', getPage)



/**
 * @swagger
 * /website/page:
 *   get:
 *     tags:
 *       - Page | Website
 *     summary: Get list of pages
 *     description: Get list of pages
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
 *           enum: ["title", "view", "author", "createdAt", "updatedAt"]
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
 *         description: The expression to filter title of the results by
 *     responses:
 *       200:
 *         description: List of page objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pages:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       summary:
 *                         type: string
 *                       author:
 *                         type: string
 *                       content:
 *                         type: string
 *                       show:
 *                         type: boolean
 *                       tags:
 *                         type: array
 *                         items:
 *                           type: string
 *                       category:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                       cover:
 *                         type: string
 *                       createdAt:
 *                         type: number
 *                       updatedAt:
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
websitePageRouter.get('/', getPages)


/**
 * @swagger
 * /website/page/category/{categoryValue}:
 *   get:
 *     categorys:
 *       - Page | Website
 *     summary: Get list of pages containing category
 *     description: Get list of pages containing the category
 *     parameters:
 *       - name: categoryValue
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The category that pages filter by
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
 *           enum: ["title", "view", "author", "createdAt", "updatedAt"]
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
 *         description: List of page objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pages:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       summary:
 *                         type: string
 *                       author:
 *                         type: string
 *                       content:
 *                         type: string
 *                       show:
 *                         type: boolean
 *                       tags:
 *                         type: array
 *                         items:
 *                           type: string
 *                       categorys:
 *                         type: array
 *                         items:
 *                           type: string
 *                       cover:
 *                         type: string
 *                       createdAt:
 *                         type: number
 *                       updatedAt:
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
websitePageRouter.get('/category/:categoryValue', getPagesByCategory)



/**
 * @swagger
 * /website/page/tag/{tagValue}:
 *   get:
 *     tags:
 *       - Page | Website
 *     summary: Get list of pages containing tag
 *     description: Get list of pages containing the tag
 *     parameters:
 *       - name: tagValue
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The tag that pages filter by
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
 *           enum: ["title", "view", "author", "createdAt", "updatedAt"]
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
 *         description: List of page objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pages:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       summary:
 *                         type: string
 *                       author:
 *                         type: string
 *                       content:
 *                         type: string
 *                       show:
 *                         type: boolean
 *                       tags:
 *                         type: array
 *                         items:
 *                           type: string
 *                       category:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                       cover:
 *                         type: string
 *                       createdAt:
 *                         type: number
 *                       updatedAt:
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
websitePageRouter.get('/tag/:tagValue', getPagesByTag)



/**
 * @swagger
 * /website/page/tags/all:
 *   get:
 *     tags:
 *       - Page | Website
 *     summary: get list of used tags in pages
 *     description: get list of used tags in pages
 *     responses:
 *       200:
 *         description: A list of tags.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
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
websitePageRouter.get('/tags/all', getTags)