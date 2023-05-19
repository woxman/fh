import { Router } from 'express'

import auth from '../../middlewares/auth'

import getReports from './getReports'

export const panelReportRouter = Router()


/**
 * @swagger
 * /panel/report:
 *   get:
 *     tags:
 *       - Report | Panel
 *     summary: Get a list of reports
 *     description: Get a list of reports in full details by passing the desired query parameters
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
 *           enum: ['event', 'createdAt']
 *         description: The property to sort by
 *       - name: sortOrder
 *         in: query
 *         schema:
 *           type: string
 *           enum: ['asc', 'desc']
 *         description: The order to sort by
 *     responses:
 *       200:
 *         description: The list of reports
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
 *                       admin:
 *                         type: object
 *                         properties: 
 *                           _id: 
 *                             type: string
 *                           name: 
 *                             type: string
 *                       ip:
 *                         type: string
 *                       event:
 *                         type: string
 *                       createdAdmin:
 *                         type: object
 *                         properties: 
 *                           _id: 
 *                             type: string
 *                           name: 
 *                             type: string
 *                       deletedAdmin:
 *                         type: string
 *                         description: Name of the deleted admin 
 *                       createdAt:
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
 panelReportRouter.get('/', auth('admin'), getReports)