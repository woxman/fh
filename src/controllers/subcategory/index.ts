import { Router } from 'express'

import auth from '../../middlewares/auth'

import addSubcategory from './addSubcategory'
import getSubcategory from './getSubcategory'
import getSubcategories from './getSubcategories'
import getSubcategoriesByCategoryId from './getSubcategoriesByCategoryId'
import editSubcategory from './editSubcategory'
import deleteSubcategories from './deleteSubcategories'

export const panelSubcategoryRouter = Router()
export const websiteSubcategoryRouter = Router()


/**
 * @swagger
 * tags:
 * - name: Subcategory | Panel
 *   description: Subcategory routes for panel
 * - name: Subcategory | Website
 *   description: Subcategory routes for website
 */


/**
 * @swagger
 * /panel/subcategory/category/{categoryId}:
 *   post:
 *     tags:
 *       - Subcategory | Panel
 *     summary: Add a subcategory
 *     description: Add a new subcategory
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         description: ID of the category to which the new subcategory will be related
 *         code: Category code
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               urlSlug:
 *                 type: string
 *               description:
 *                 type: string
 *               properties: 
 *                 type: array
 *                 items: 
 *                   type: object
 *                   properties: 
 *                     property: 
 *                       type: string
 *                       description: Id of the related property
 *                     order:
 *                       type: number
 *             required:
 *               - name
 *               - urlSlug
 *               - description
 *     responses:
 *       200:
 *         description: Added subcategory
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 subcategory:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     category:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string 
 *                     name:
 *                       type: string
 *                     code:
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
 *                           property: 
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                               values:
 *                                 type: array
 *                                 items:
 *                                   type: string
 *                           order:
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
panelSubcategoryRouter.post('/category/:categoryId', auth('admin'), addSubcategory)



/**
 * @swagger
 * /panel/subcategory/{subcategoryId}:
 *   get:
 *     tags:
 *       - Subcategory | Panel
 *     summary: Get a subcategory
 *     description: Get a subcategory in full details by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: subcategoryId
 *         in: path
 *         required: true
 *         description: The ID of the expected subcategory
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fetched subcategory
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 subcategory:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     category:
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
 *                           property: 
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                               values:
 *                                 type: array
 *                                 items:
 *                                   type: string
 *                           order:
 *                             type: number
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
panelSubcategoryRouter.get('/:subcategoryId', auth('admin'), getSubcategory)
 

 
/**
 * @swagger
 * /panel/subcategory:
 *   get:
 *     tags:
 *       - Subcategory | Panel
 *     summary: Get a list of subcategories
 *     description: Get a list of subcategories in full details by passing the desired query parameters
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
 *         description: The expression to filter the results by
 *     responses:
 *       200:
 *         description: The list of subcategories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: number
 *                 subcategories: 
 *                   type: array
 *                   items: 
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       category:
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
 *                             property: 
 *                               type: object
 *                               properties:
 *                                 _id:
 *                                   type: string
 *                                 name:
 *                                   type: string
 *                                 values:
 *                                   type: array
 *                                   items:
 *                                     type: string
 *                             order:
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
panelSubcategoryRouter.get('/', auth('admin'), getSubcategories)
 

 
/**
 * @swagger
 * /panel/subcategory/category/{categoryId}:
 *   get:
 *     tags:
 *       - Subcategory | Panel
 *     summary: Get a list of subcategories by category id
 *     description: Get a list of subcategories in a category (by passing id of the category) in full details by passing the desired query parameters
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         description: ID of the category whose subcategories we want
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
 *           enum: ['name']
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
 *         description: The list of subcategories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: number
 *                 subcategories: 
 *                   type: array
 *                   items: 
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       category:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           description:
 *                             type: string
 *                           icon:
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
 *                             property: 
 *                               type: object
 *                               properties:
 *                                 _id:
 *                                   type: string
 *                                 name:
 *                                   type: string
 *                                 values:
 *                                   type: array
 *                                   items:
 *                                     type: string
 *                             order:
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
panelSubcategoryRouter.get('/category/:categoryId', auth('admin'), getSubcategoriesByCategoryId)
 
 
 
/**
 * @swagger
 * /panel/subcategory/{subcategoryId}:
 *   patch:
 *     tags:
 *       - Subcategory | Panel
 *     summary: Edit a subcategory by id
 *     description: Edit a subcategory by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: subcategoryId
 *         in: path
 *         required: true
 *         description: The ID of the subcategory
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
 *                   urlSlug:
 *                     type: string
 *                   description:
 *                     type: string
 *                   properties: 
 *                       type: array
 *                       items: 
 *                         type: object
 *                         properties: 
 *                           property: 
 *                             type: string
 *                             description: Id of the related property
 *                           order:
 *                             type: number
 *     responses:
 *       200:
 *         description: Updated subcategory
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 subcategory:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     category:
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
 *                           property: 
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                               values:
 *                                 type: array
 *                                 items:
 *                                   type: string
 *                           order:
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
panelSubcategoryRouter.patch('/:subcategoryId', auth('admin'), editSubcategory)
 
 
 
/**
 * @swagger
 * /panel/subcategory/delete:
 *   post:
 *     tags:
 *       - Subcategory | Panel
 *     summary: Delete a list of subcategories
 *     description: Delete a list of subcategories by passing an array of their id's
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
 *         description: The passed subcategories deleted
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
panelSubcategoryRouter.post('/delete', auth('admin'), deleteSubcategories)
 



//-------------------------------------------------------------------------------------------



 
/**
 * @swagger
 * /website/subcategory/{subcategoryId}:
 *   get:
 *     tags:
 *       - Subcategory | Website
 *     summary: Get a subcategory
 *     description: Get a subcategory in full details by id
 *     parameters:
 *       - name: subcategoryId
 *         in: path
 *         required: true
 *         description: The ID of the expected subcategory
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fetched subcategory
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 subcategory:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     category:
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
 *                           property: 
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                               values:
 *                                 type: array
 *                                 items:
 *                                   type: string
 *                           order:
 *                             type: number
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
websiteSubcategoryRouter.get('/:subcategoryId', getSubcategory)
 

 
/**
 * @swagger
 * /website/subcategory:
 *   get:
 *     tags:
 *       - Subcategory | Website
 *     summary: Get a list of subcategories
 *     description: Get a list of subcategories in full details by passing the desired query parameters
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
 *         description: The expression to filter the results by
 *     responses:
 *       200:
 *         description: The list of subcategories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: number
 *                 subcategories: 
 *                   type: array
 *                   items: 
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       category:
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
 *                             property: 
 *                               type: object
 *                               properties:
 *                                 _id:
 *                                   type: string
 *                                 name:
 *                                   type: string
 *                                 values:
 *                                   type: array
 *                                   items:
 *                                     type: string
 *                             order:
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
websiteSubcategoryRouter.get('/', getSubcategories)
 

 
/**
 * @swagger
 * /website/subcategory/category/{categoryId}:
 *   get:
 *     tags:
 *       - Subcategory | Website
 *     summary: Get a list of subcategories by category id
 *     description: Get a list of subcategories in a category (by passing id of the category) in full details by passing the desired query parameters
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         description: ID of the category whose subcategories we want
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
 *           enum: ['name']
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
 *         description: The list of subcategories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: number
 *                 subcategories: 
 *                   type: array
 *                   items: 
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       category:
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
 *                             property: 
 *                               type: object
 *                               properties:
 *                                 _id:
 *                                   type: string
 *                                 name:
 *                                   type: string
 *                                 values:
 *                                   type: array
 *                                   items:
 *                                     type: string
 *                             order:
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
websiteSubcategoryRouter.get('/category/:categoryId', getSubcategoriesByCategoryId)
