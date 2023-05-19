import { Router } from 'express'

import auth from '../../middlewares/auth'

import addProperty from './addProperty'
import getProperties from './getProperties'
import getProperty from './getProperty'
import editProperty from './editProperty'
import deleteProperty from './deleteProperties'

export const panelPropertyRouter = Router()
export const websitePropertyRouter = Router()

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
panelPropertyRouter.post('/', addProperty)



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
panelPropertyRouter.get('/:propertyId', auth('admin'), getProperty)



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
panelPropertyRouter.get('/', auth('admin'), getProperties)



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
panelPropertyRouter.patch('/:propertyId', auth('admin'), editProperty)



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
panelPropertyRouter.post('/delete', auth('admin'), deleteProperty)




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
websitePropertyRouter.get('/:propertyId', auth('user'), getProperty)



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
websitePropertyRouter.get('/', getProperties)