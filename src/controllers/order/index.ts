import { Router } from 'express'

import auth from '../../middlewares/auth'

import addOrder from "./addOrder"
import getOrder from "./getOrder"
import getOrderByTrackingCode from './getOrderByTrackingCode'
import getOrdersByUserId from "./getOrdersByUserId"
import getOrders from "./getOrders"
import editOrder from "./editOrder"
import deleteOrders from "./deleteOrders"
import getSiteStatistics from './getSiteStatistics'

export const panelOrderRouter = Router()
export const websiteOrderRouter = Router()

/**
 * @swagger
 * tags:
 * - name: Order | Panel
 *   description: Order routes for panel
 * - name: Order | Website
 *   description: Order routes for website
 */


/**
 * @swagger
 * /panel/order/{orderId}:
 *   get:
 *     tags:
 *       - Order | Panel
 *     summary: Get an order by id
 *     description: Get an order in full details by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: orderId
 *         in: path
 *         required: true
 *         description: The ID of the expected order
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fetched order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 order:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     owner:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                     status:
 *                       type: number
 *                     trackingCode:
 *                       type: string
 *                     products:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           product:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                               subcategory:
 *                                 type: object
 *                                 properties:
 *                                   _id:
 *                                     type: string
 *                                   name:
 *                                     type: string
 *                               factory:
 *                                 type: object
 *                                 properties:
 *                                   _id:
 *                                     type: string
 *                                   name:
 *                                     type: string
 *                               unit:
 *                                 type: string
 *                               price:
 *                                 type: number
 *                           count:
 *                             type: number
 *                           stockStatus:
 *                             type: object
 *                             properties:
 *                               enoughInStock:
 *                                 type: boolean
 *                               numberLeftInStock:
 *                                 type: number
 *                               alternativeProduct:
 *                                 type: string
 *                     phoneNumber:
 *                       type: string
 *                     address:
 *                       type: string
 *                     fullNameOfReceiverParty:
 *                       type: string
 *                     accountNumber:
 *                       type: string
 *                     fullNameOfAccountOwner:
 *                       type: string
 *                     shabaNumber:
 *                       type: string
 *                     bill:
 *                       type: object
 *                       properties:
 *                         validUntil:
 *                           type: number
 *                         products:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               product:
 *                                 type: object
 *                                 properties:
 *                                   _id:
 *                                     type: string
 *                                   name:
 *                                     type: string
 *                               count:
 *                                 type: number
 *                               price:
 *                                 type: number
 *                               totalPrice:
 *                                 type: number
 *                         shippingCost:
 *                           type: number
 *                         valueAddedPercentage:
 *                           type: number
 *                         totalDiscount:
 *                           type: number
 *                         totalPrice:
 *                           type: number
 *                         totalSum:
 *                           type: number
 *                         payment:
 *                           type: object
 *                           properties:
 *                             method:
 *                               type: string
 *                             onlinePayment:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   paidAmount: 
 *                                     type: number
 *                                   trackingNumber: 
 *                                     type: string
 *                                   paymentTime:
 *                                     type: number
 *                             bankPayment:
 *                               type: object
 *                               properties:
 *                                 paidAmount: 
 *                                   type: number
 *                                 originAccount: 
 *                                   type: string
 *                                 trackingNumber: 
 *                                   type: string
 *                                 images:
 *                                   type: array
 *                                   items:
 *                                     type: string
 *                     shippingDates: 
 *                       type: array
 *                       items: 
 *                         type: number
 *                     shippingDate:
 *                       type: number
 *                     createAt:
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
panelOrderRouter.get('/:orderId', auth('admin'), getOrder)



/**
* @swagger
* /panel/order/tracking-code/{trackingCode}:
*   get:
*     tags:
*       - Order | Panel
*     summary: Get a order by tracking code
*     description: Get a order by tracking code
*     security:
*       - adminBearerAuth: []
*     parameters:
*       - name: trackingCode
*         in: path
*         required: true
*         description: The tracking code of the expected order
*         schema:
*           type: string
*     responses:
*       200:
*         description: Fetched order
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 order:
*                   type: object
*                   properties:
*                     _id:
*                       type: string
*                     owner:
*                       type: object
*                       properties:
*                         _id:
*                           type: string
*                         name:
*                           type: string
*                     status:
*                       type: number
*                     trackingCode:
*                       type: string
*                     products:
*                       type: array
*                       items:
*                         type: object
*                         properties:
*                           product:
*                             type: object
*                             properties:
*                               _id:
*                                 type: string
*                               name:
*                                 type: string
*                               subcategory:
*                                 type: object
*                                 properties:
*                                   _id:
*                                     type: string
*                                   name:
*                                     type: string
*                               factory:
*                                 type: object
*                                 properties:
*                                   _id:
*                                     type: string
*                                   name:
*                                     type: string
*                               unit:
*                                 type: string
*                               price:
*                                 type: number
*                           count:
*                             type: number
*                           stockStatus:
*                             type: object
*                             properties:
*                               enoughInStock:
*                                 type: boolean
*                               numberLeftInStock:
*                                 type: number
*                               alternativeProduct:
*                                 type: string
*                     phoneNumber:
*                       type: string
*                     address:
*                       type: string
*                     fullNameOfReceiverParty:
*                       type: string
*                     accountNumber:
*                       type: string
*                     fullNameOfAccountOwner:
*                       type: string
*                     shabaNumber:
*                       type: string
*                     bill:
*                       type: object
*                       properties:
*                         validUntil:
*                           type: number
*                         products:
*                           type: array
*                           items:
*                             type: object
*                             properties:
*                               product:
*                                 type: object
*                                 properties:
*                                   _id:
*                                     type: string
*                                   name:
*                                     type: string
*                               count:
*                                 type: number
*                               price:
*                                 type: number
*                               totalPrice:
*                                 type: number
*                         shippingCost:
*                           type: number
*                         valueAddedPercentage:
*                           type: number
*                         totalDiscount:
*                           type: number
*                         totalPrice:
*                           type: number
*                         totalSum:
*                           type: number
*                         payment:
*                           type: object
*                           properties:
*                             method:
*                               type: string
*                             onlinePayment:
*                               type: array
*                               items:
*                                 type: object
*                                 properties:
*                                   paidAmount: 
*                                     type: number
*                                   trackingNumber: 
*                                     type: string
*                                   paymentTime:
*                                     type: number
*                             bankPayment:
*                               type: object
*                               properties:
*                                 paidAmount: 
*                                   type: number
*                                 originAccount: 
*                                   type: string
*                                 trackingNumber: 
*                                   type: string
*                                 images:
*                                   type: array
*                                   items:
*                                     type: string
*                     shippingDates: 
*                       type: array
*                       items: 
*                         type: number
*                     shippingDate:
*                       type: number
*                     createAt:
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
panelOrderRouter.get('/tracking-code/:trackingCode', auth('admin'), getOrderByTrackingCode)



/**
 * @swagger
 * /panel/order:
 *   get:
 *     tags:
 *       - Order | Panel
 *     summary: Get all of the orders
 *     description: Get a list of all existing orders in full details by passing the desired query parameters
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
 *           enum: ['name', 'unit', 'createdAt', 'updatedAt']
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
 *         description: The list of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: number
 *                 orders:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       owner:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                       status:
 *                         type: number
 *                       trackingCode:
 *                         type: string
 *                       products:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             product:
 *                               type: object
 *                               properties:
 *                                 _id:
 *                                   type: string
 *                                 name:
 *                                   type: string
 *                                 subcategory:
 *                                   type: object
 *                                   properties:
 *                                     _id:
 *                                       type: string
 *                                     name:
 *                                       type: string
 *                                 factory:
 *                                   type: object
 *                                   properties:
 *                                     _id:
 *                                       type: string
 *                                     name:
 *                                       type: string
 *                                 unit:
 *                                   type: string
 *                                 price:
 *                                   type: number
 *                             count:
 *                               type: number
 *                             stockStatus:
 *                               type: object
 *                               properties:
 *                                 enoughInStock:
 *                                   type: boolean
 *                                 numberLeftInStock:
 *                                   type: number
 *                                 alternativeProduct:
 *                                   type: string
 *                       phoneNumber:
 *                         type: string
 *                       address:
 *                         type: string
 *                       fullNameOfReceiverParty:
 *                         type: string
 *                       accountNumber:
 *                         type: string
 *                       fullNameOfAccountOwner:
 *                         type: string
 *                       shabaNumber:
 *                         type: string
 *                       bill:
 *                         type: object
 *                         properties:
 *                           validUntil:
 *                             type: number
 *                           products:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 product:
 *                                   type: object
 *                                   properties:
 *                                     _id:
 *                                       type: string
 *                                     name:
 *                                       type: string
 *                                 count:
 *                                   type: number
 *                                 price:
 *                                   type: number
 *                                 totalPrice:
 *                                   type: number
 *                           shippingCost:
 *                             type: number
 *                           valueAddedPercentage:
 *                             type: number
 *                           totalDiscount:
 *                             type: number
 *                           totalPrice:
 *                             type: number
 *                           totalSum:
 *                             type: number
 *                           payment:
 *                             type: object
 *                             properties:
 *                               method:
 *                                 type: string
 *                               onlinePayment:
 *                                 type: array
 *                                 items:
 *                                   type: object
 *                                   properties:
 *                                     paidAmount: 
 *                                       type: number
 *                                     trackingNumber: 
 *                                       type: string
 *                                     paymentTime:
 *                                       type: number
 *                               bankPayment:
 *                                 type: object
 *                                 properties:
 *                                   paidAmount: 
 *                                     type: number
 *                                   originAccount: 
 *                                     type: string
 *                                   trackingNumber: 
 *                                     type: string
 *                                   images:
 *                                     type: array
 *                                     items:
 *                                       type: string
 *                       shippingDates: 
 *                         type: array
 *                         items: 
 *                           type: number
 *                       shippingDate:
 *                         type: number
 *                       createAt:
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
panelOrderRouter.get('/', auth('admin'), getOrders)



/**
 * @swagger
 * /panel/order/user/{userId}:
 *   get:
 *     tags:
 *       - Order | Panel
 *     summary: Get a list of the user's orders
 *     description: Get a list of user's orders in full details by passing the desired query parameters
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: The ID of the user whose orders we want
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
 *           enum: ['name', 'unit', 'createdAt', 'updatedAt']
 *         description: The property to sort by
 *       - name: sortOrder
 *         in: query
 *         schema:
 *           type: string
 *           enum: ['asc', 'desc']
 *         description: The order to sort by
 *     responses:
 *       200:
 *         description: The list of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: number
 *                 orders:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       owner:
 *                         type: string
 *                       status:
 *                         type: number
 *                       trackingCode:
 *                         type: string
 *                       products:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             product:
 *                               type: object
 *                               properties:
 *                                 _id:
 *                                   type: string
 *                                 name:
 *                                   type: string
 *                                 subcategory:
 *                                   type: object
 *                                   properties:
 *                                     _id:
 *                                       type: string
 *                                     name:
 *                                       type: string
 *                                 factory:
 *                                   type: object
 *                                   properties:
 *                                     _id:
 *                                       type: string
 *                                     name:
 *                                       type: string
 *                                 unit:
 *                                   type: string
 *                                 price:
 *                                   type: number
 *                             count:
 *                               type: number
 *                             stockStatus:
 *                               type: object
 *                               properties:
 *                                 enoughInStock:
 *                                   type: boolean
 *                                 numberLeftInStock:
 *                                   type: number
 *                                 alternativeProduct:
 *                                   type: string
 *                       phoneNumber:
 *                         type: string
 *                       address:
 *                         type: string
 *                       fullNameOfReceiverParty:
 *                         type: string
 *                       accountNumber:
 *                         type: string
 *                       fullNameOfAccountOwner:
 *                         type: string
 *                       shabaNumber:
 *                         type: string
 *                       bill:
 *                         type: object
 *                         properties:
 *                           validUntil:
 *                             type: number
 *                           products:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 product:
 *                                   type: object
 *                                   properties:
 *                                     _id:
 *                                       type: string
 *                                     name:
 *                                       type: string
 *                                 count:
 *                                   type: number
 *                                 price:
 *                                   type: number
 *                                 totalPrice:
 *                                   type: number
 *                           shippingCost:
 *                             type: number
 *                           valueAddedPercentage:
 *                             type: number
 *                           totalDiscount:
 *                             type: number
 *                           totalPrice:
 *                             type: number
 *                           totalSum:
 *                             type: number
 *                           payment:
 *                             type: object
 *                             properties:
 *                               method:
 *                                 type: string
 *                               onlinePayment:
 *                                 type: array
 *                                 items:
 *                                   type: object
 *                                   properties:
 *                                     paidAmount: 
 *                                       type: number
 *                                     trackingNumber: 
 *                                       type: string
 *                                     paymentTime:
 *                                       type: number
 *                               bankPayment:
 *                                 type: object
 *                                 properties:
 *                                   paidAmount: 
 *                                     type: number
 *                                   originAccount: 
 *                                     type: string
 *                                   trackingNumber: 
 *                                     type: string
 *                                   images:
 *                                     type: array
 *                                     items:
 *                                       type: string
 *                       shippingDates: 
 *                         type: array
 *                         items: 
 *                           type: number
 *                       shippingDate:
 *                         type: number
 *                       createAt:
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
panelOrderRouter.get('/user/:userId', auth('admin'), getOrdersByUserId)



/**
 * @swagger
 * /panel/order/{orderId}:
 *   patch:
 *     tags:
 *       - Order | Panel
 *     summary: Edit an order by id
 *     description: Edit an order by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: orderId
 *         in: path
 *         required: true
 *         description: The ID of the order
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
 *                   status:
 *                     type: number
 *                   products:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         product:
 *                           type: string
 *                         count:
 *                           type: number
 *                         stockStatus:
 *                           type: object
 *                           properties:
 *                             enoughInStock:
 *                               type: boolean
 *                             numberLeftInStock:
 *                               type: number
 *                             alternativeProduct:
 *                               type: string
 *                   shippingDates: 
 *                     type: array
 *                     items: 
 *                       type: number
 *     responses:
 *       200:
 *         description: Updated order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 order:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     owner:
 *                       type: string
 *                     status:
 *                       type: number
 *                     trackingCode:
 *                       type: string
 *                     products:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           product:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                               subcategory:
 *                                 type: object
 *                                 properties:
 *                                   _id:
 *                                     type: string
 *                                   name:
 *                                     type: string
 *                               factory:
 *                                 type: object
 *                                 properties:
 *                                   _id:
 *                                     type: string
 *                                   name:
 *                                     type: string
 *                               unit:
 *                                 type: string
 *                               price:
 *                                 type: number
 *                           count:
 *                             type: number
 *                           stockStatus:
 *                             type: object
 *                             properties:
 *                               enoughInStock:
 *                                 type: boolean
 *                               numberLeftInStock:
 *                                 type: number
 *                               alternativeProduct:
 *                                 type: string
 *                     phoneNumber:
 *                       type: string
 *                     address:
 *                       type: string
 *                     fullNameOfReceiverParty:
 *                       type: string
 *                     accountNumber:
 *                       type: string
 *                     fullNameOfAccountOwner:
 *                       type: string
 *                     shabaNumber:
 *                       type: string
 *                     bill:
 *                       type: object
 *                       properties:
 *                         validUntil:
 *                           type: number
 *                         products:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               product:
 *                                 type: object
 *                                 properties:
 *                                   _id:
 *                                     type: string
 *                                   name:
 *                                     type: string
 *                               count:
 *                                 type: number
 *                               price:
 *                                 type: number
 *                               totalPrice:
 *                                 type: number
 *                         shippingCost:
 *                           type: number
 *                         valueAddedPercentage:
 *                           type: number
 *                         totalDiscount:
 *                           type: number
 *                         totalPrice:
 *                           type: number
 *                         totalSum:
 *                           type: number
 *                         payment:
 *                           type: object
 *                           properties:
 *                             method:
 *                               type: string
 *                             onlinePayment:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   paidAmount: 
 *                                     type: number
 *                                   trackingNumber: 
 *                                     type: string
 *                                   paymentTime:
 *                                     type: number
 *                             bankPayment:
 *                               type: object
 *                               properties:
 *                                 paidAmount: 
 *                                   type: number
 *                                 originAccount: 
 *                                   type: string
 *                                 trackingNumber: 
 *                                   type: string
 *                                 images:
 *                                   type: array
 *                                   items:
 *                                     type: string
 *                     shippingDates: 
 *                       type: array
 *                       items: 
 *                         type: number
 *                     shippingDate:
 *                       type: number
 *                     createAt:
 *                       type: number
 *                     updatedAt:
 *                       type: number
 *       400:
 *         description: No changes received or invalid changes were provided
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
panelOrderRouter.patch('/:orderId', auth('admin'), editOrder)



/**
 * @swagger
 * /panel/order/delete:
 *   post:
 *     tags:
 *       - Order | Panel
 *     summary: Delete a list of orders
 *     description: Delete a list of orders by passing an array of their id's
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
 *         description: The passed orders deleted
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
panelOrderRouter.post('/delete', auth('admin'), deleteOrders)



/**
 * @swagger
 * /panel/order/site/statistics:
 *   get:
 *     tags:
 *       - Order | Panel
 *     summary: Get site statistics
 *     description: Get site statistics (total income of the week and ...)
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: startOfTheYear
 *         in: query
 *         required: true
 *         description: The start of the year to return income
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Site statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 productsCount:
 *                   type: number
 *                 ordersCount:
 *                   type: number
 *                 thisWeekIncome:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       totalSum:
 *                         type: number
 *                       date:
 *                         type: number
 *                 yearIncome:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       totalSum:
 *                         type: number
 *                       date:
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
panelOrderRouter.get('/site/statistics', auth('admin'), getSiteStatistics)




// ------------------------------------------------------------------------------------------------




/**
 * @swagger
 * /website/order:
 *   post:
 *     tags:
 *       - Order | Website
 *     summary: Add an order
 *     description: Add a new order
 *     security:
 *       - userBearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product:
 *                       type: string
 *                       description: ID of the related product
 *                     count:
 *                       type: number
 *               phoneNumber:
 *                 type: string
 *               address:
 *                 type: string
 *               fullNameOfReceiverParty:
 *                 type: string
 *               accountNumber:
 *                 type: string
 *               fullNameOfAccountOwner:
 *                 type: string
 *               shabaNumber:
 *                 type: string
 *             required:
 *               - products
 *               - phoneNumber
 *               - address
 *               - fullNameOfReceiverParty
 *               - accountNumber
 *               - fullNameOfAccountOwner
 *     responses:
 *       200:
 *         description: Added order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 order:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     owner:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                     status:
 *                       type: number
 *                     trackingCode:
 *                       type: string
 *                     products:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           product:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                               subcategory:
 *                                 type: object
 *                                 properties:
 *                                   _id:
 *                                     type: string
 *                                   name:
 *                                     type: string
 *                               factory:
 *                                 type: object
 *                                 properties:
 *                                   _id:
 *                                     type: string
 *                                   name:
 *                                     type: string
 *                               unit:
 *                                 type: string
 *                               price:
 *                                 type: number
 *                           count:
 *                             type: number
 *                           stockStatus:
 *                             type: object
 *                             properties:
 *                               enoughInStock:
 *                                 type: boolean
 *                     phoneNumber:
 *                       type: string
 *                     address:
 *                       type: string
 *                     fullNameOfReceiverParty:
 *                       type: string
 *                     accountNumber:
 *                       type: string
 *                     fullNameOfAccountOwner:
 *                       type: string
 *                     shabaNumber:
 *                       type: string
 *                     createAt:
 *                       type: number
 *                     updatedAt:
 *                       type: number
 *       400:
 *         description: Not all selected products exist
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
websiteOrderRouter.post('/', auth('user'), addOrder)



/**
 * @swagger
 * /website/order/{orderId}:
 *   get:
 *     tags:
 *       - Order | Website
 *     summary: Get an order by id
 *     description: Get an order in full details by id
 *     security:
 *       - userBearerAuth: []
 *     parameters:
 *       - name: orderId
 *         in: path
 *         required: true
 *         description: The ID of the expected order
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fetched order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 order:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     owner:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                     status:
 *                       type: number
 *                     trackingCode:
 *                       type: string
 *                     products:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           product:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                               subcategory:
 *                                 type: object
 *                                 properties:
 *                                   _id:
 *                                     type: string
 *                                   name:
 *                                     type: string
 *                               factory:
 *                                 type: object
 *                                 properties:
 *                                   _id:
 *                                     type: string
 *                                   name:
 *                                     type: string
 *                               unit:
 *                                 type: string
 *                               price:
 *                                 type: number
 *                           count:
 *                             type: number
 *                           stockStatus:
 *                             type: object
 *                             properties:
 *                               enoughInStock:
 *                                 type: boolean
 *                               numberLeftInStock:
 *                                 type: number
 *                               alternativeProduct:
 *                                 type: string
 *                     phoneNumber:
 *                       type: string
 *                     address:
 *                       type: string
 *                     fullNameOfReceiverParty:
 *                       type: string
 *                     accountNumber:
 *                       type: string
 *                     fullNameOfAccountOwner:
 *                       type: string
 *                     shabaNumber:
 *                       type: string
 *                     bill:
 *                       type: object
 *                       properties:
 *                         validUntil:
 *                           type: number
 *                         products:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               product:
 *                                 type: object
 *                                 properties:
 *                                   _id:
 *                                     type: string
 *                                   name:
 *                                     type: string
 *                               count:
 *                                 type: number
 *                               price:
 *                                 type: number
 *                               totalPrice:
 *                                 type: number
 *                         shippingCost:
 *                           type: number
 *                         valueAddedPercentage:
 *                           type: number
 *                         totalDiscount:
 *                           type: number
 *                         totalPrice:
 *                           type: number
 *                         totalSum:
 *                           type: number
 *                         payment:
 *                           type: object
 *                           properties:
 *                             method:
 *                               type: string
 *                             onlinePayment:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   paidAmount: 
 *                                     type: number
 *                                   trackingNumber: 
 *                                     type: string
 *                                   paymentTime:
 *                                     type: number
 *                             bankPayment:
 *                               type: object
 *                               properties:
 *                                 paidAmount: 
 *                                   type: number
 *                                 originAccount: 
 *                                   type: string
 *                                 trackingNumber: 
 *                                   type: string
 *                                 images:
 *                                   type: array
 *                                   items:
 *                                     type: string
 *                     shippingDates: 
 *                       type: array
 *                       items: 
 *                         type: number
 *                     shippingDate:
 *                       type: number
 *                     createAt:
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
websiteOrderRouter.get('/:orderId', auth('user'), getOrder)



/**
 * @swagger
 * /website/tracking-code/{trackingCode}:
 *   get:
 *     tags:
 *       - Order | Website
 *     summary: Get a order by tracking code
 *     description: Get a order in full details by tracking code
 *     security:
 *       - userBearerAuth: []
 *     parameters:
 *       - name: trackingCode
 *         in: path
 *         required: true
 *         description: The tracking code of the expected order
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fetched order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 order:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     owner:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                     status:
 *                       type: number
 *                     trackingCode:
 *                       type: string
 *                     products:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           product:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                               subcategory:
 *                                 type: object
 *                                 properties:
 *                                   _id:
 *                                     type: string
 *                                   name:
 *                                     type: string
 *                               factory:
 *                                 type: object
 *                                 properties:
 *                                   _id:
 *                                     type: string
 *                                   name:
 *                                     type: string
 *                               unit:
 *                                 type: string
 *                               price:
 *                                 type: number
 *                           count:
 *                             type: number
 *                           stockStatus:
 *                             type: object
 *                             properties:
 *                               enoughInStock:
 *                                 type: boolean
 *                               numberLeftInStock:
 *                                 type: number
 *                               alternativeProduct:
 *                                 type: string
 *                     phoneNumber:
 *                       type: string
 *                     address:
 *                       type: string
 *                     fullNameOfReceiverParty:
 *                       type: string
 *                     accountNumber:
 *                       type: string
 *                     fullNameOfAccountOwner:
 *                       type: string
 *                     shabaNumber:
 *                       type: string
 *                     bill:
 *                       type: object
 *                       properties:
 *                         validUntil:
 *                           type: number
 *                         products:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               product:
 *                                 type: object
 *                                 properties:
 *                                   _id:
 *                                     type: string
 *                                   name:
 *                                     type: string
 *                               count:
 *                                 type: number
 *                               price:
 *                                 type: number
 *                               totalPrice:
 *                                 type: number
 *                         shippingCost:
 *                           type: number
 *                         valueAddedPercentage:
 *                           type: number
 *                         totalDiscount:
 *                           type: number
 *                         totalPrice:
 *                           type: number
 *                         totalSum:
 *                           type: number
 *                         payment:
 *                           type: object
 *                           properties:
 *                             method:
 *                               type: string
 *                             onlinePayment:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   paidAmount: 
 *                                     type: number
 *                                   trackingNumber: 
 *                                     type: string
 *                                   paymentTime:
 *                                     type: number
 *                             bankPayment:
 *                               type: object
 *                               properties:
 *                                 paidAmount: 
 *                                   type: number
 *                                 originAccount: 
 *                                   type: string
 *                                 trackingNumber: 
 *                                   type: string
 *                                 images:
 *                                   type: array
 *                                   items:
 *                                     type: string
 *                     shippingDates: 
 *                       type: array
 *                       items: 
 *                         type: number
 *                     shippingDate:
 *                       type: number
 *                     createAt:
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
websiteOrderRouter.get('/tracking-code/:trackingCode', auth('user'), getOrderByTrackingCode)



/**
 * @swagger
 * /website/order:
 *   get:
 *     tags:
 *       - Order | Website
 *     summary: Get a list of the current user's orders
 *     description: Get a list of user's orders in full details by passing the desired query parameters
 *     security:
 *       - userBearerAuth: []
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
 *           enum: ['name', 'unit', 'createdAt', 'updatedAt']
 *         description: The property to sort by
 *       - name: sortOrder
 *         in: query
 *         schema:
 *           type: string
 *           enum: ['asc', 'desc']
 *         description: The order to sort by
 *     responses:
 *       200:
 *         description: The list of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: number
 *                 orders:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       owner:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                       status:
 *                         type: number
 *                       trackingCode:
 *                         type: string
 *                       products:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             product:
 *                               type: object
 *                               properties:
 *                                 _id:
 *                                   type: string
 *                                 name:
 *                                   type: string
 *                                 subcategory:
 *                                   type: object
 *                                   properties:
 *                                     _id:
 *                                       type: string
 *                                     name:
 *                                       type: string
 *                                 factory:
 *                                   type: object
 *                                   properties:
 *                                     _id:
 *                                       type: string
 *                                     name:
 *                                       type: string
 *                                 unit:
 *                                   type: string
 *                                 price:
 *                                   type: number
 *                             count:
 *                               type: number
 *                             stockStatus:
 *                               type: object
 *                               properties:
 *                                 enoughInStock:
 *                                   type: boolean
 *                                 numberLeftInStock:
 *                                   type: number
 *                                 alternativeProduct:
 *                                   type: string
 *                       phoneNumber:
 *                         type: string
 *                       address:
 *                         type: string
 *                       fullNameOfReceiverParty:
 *                         type: string
 *                       accountNumber:
 *                         type: string
 *                       fullNameOfAccountOwner:
 *                         type: string
 *                       shabaNumber:
 *                         type: string
 *                       bill:
 *                         type: object
 *                         properties:
 *                           validUntil:
 *                             type: number
 *                           products:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 product:
 *                                   type: object
 *                                   properties:
 *                                     _id:
 *                                       type: string
 *                                     name:
 *                                       type: string
 *                                 count:
 *                                   type: number
 *                                 price:
 *                                   type: number
 *                                 totalPrice:
 *                                   type: number
 *                           shippingCost:
 *                             type: number
 *                           valueAddedPercentage:
 *                             type: number
 *                           totalDiscount:
 *                             type: number
 *                           totalPrice:
 *                             type: number
 *                           totalSum:
 *                             type: number
 *                           payment:
 *                             type: object
 *                             properties:
 *                               method:
 *                                 type: string
 *                               onlinePayment:
 *                                 type: array
 *                                 items:
 *                                   type: object
 *                                   properties:
 *                                     paidAmount: 
 *                                       type: number
 *                                     trackingNumber: 
 *                                       type: string
 *                                     paymentTime:
 *                                       type: number
 *                               bankPayment:
 *                                 type: object
 *                                 properties:
 *                                   paidAmount: 
 *                                     type: number
 *                                   originAccount: 
 *                                     type: string
 *                                   trackingNumber: 
 *                                     type: string
 *                                   images:
 *                                     type: array
 *                                     items:
 *                                       type: string
 *                       shippingDates: 
 *                         type: array
 *                         items: 
 *                           type: number
 *                       shippingDate:
 *                         type: number
 *                       createAt:
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
websiteOrderRouter.get('/', auth('user'), getOrdersByUserId)



/**
 * @swagger
 * /website/order/{orderId}:
 *   patch:
 *     tags:
 *       - Order | Website
 *     summary: Edit an order by id
 *     description: Edit an order by id
 *     security:
 *       - userBearerAuth: []
 *     parameters:
 *       - name: orderId
 *         in: path
 *         required: true
 *         description: The ID of the order
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
 *                   phoneNumber:
 *                     type: string
 *                   address:
 *                     type: string
 *                   fullNameOfReceiverParty:
 *                     type: string
 *                   accountNumber:
 *                     type: string
 *                   fullNameOfAccountOwner:
 *                     type: string
 *                   shabaNumber:
 *                     type: string
 *                   shippingDate:
 *                     type: number
 *     responses:
 *       200:
 *         description: Updated order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 order:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     owner:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                     status:
 *                       type: number
 *                     trackingCode:
 *                       type: string
 *                     products:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           product:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                               subcategory:
 *                                 type: object
 *                                 properties:
 *                                   _id:
 *                                     type: string
 *                                   name:
 *                                     type: string
 *                               factory:
 *                                 type: object
 *                                 properties:
 *                                   _id:
 *                                     type: string
 *                                   name:
 *                                     type: string
 *                               unit:
 *                                 type: string
 *                               price:
 *                                 type: number
 *                           count:
 *                             type: number
 *                           stockStatus:
 *                             type: object
 *                             properties:
 *                               enoughInStock:
 *                                 type: boolean
 *                               numberLeftInStock:
 *                                 type: number
 *                               alternativeProduct:
 *                                 type: string
 *                     phoneNumber:
 *                       type: string
 *                     address:
 *                       type: string
 *                     fullNameOfReceiverParty:
 *                       type: string
 *                     accountNumber:
 *                       type: string
 *                     fullNameOfAccountOwner:
 *                       type: string
 *                     shabaNumber:
 *                       type: string
 *                     bill:
 *                       type: object
 *                       properties:
 *                         validUntil:
 *                           type: number
 *                         products:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               product:
 *                                 type: object
 *                                 properties:
 *                                   _id:
 *                                     type: string
 *                                   name:
 *                                     type: string
 *                               count:
 *                                 type: number
 *                               price:
 *                                 type: number
 *                               totalPrice:
 *                                 type: number
 *                         shippingCost:
 *                           type: number
 *                         valueAddedPercentage:
 *                           type: number
 *                         totalDiscount:
 *                           type: number
 *                         totalPrice:
 *                           type: number
 *                         totalSum:
 *                           type: number
 *                         payment:
 *                           type: object
 *                           properties:
 *                             method:
 *                               type: string
 *                             onlinePayment:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   paidAmount: 
 *                                     type: number
 *                                   trackingNumber: 
 *                                     type: string
 *                                   paymentTime:
 *                                     type: number
 *                             bankPayment:
 *                               type: object
 *                               properties:
 *                                 paidAmount: 
 *                                   type: number
 *                                 originAccount: 
 *                                   type: string
 *                                 trackingNumber: 
 *                                   type: string
 *                                 images:
 *                                   type: array
 *                                   items:
 *                                     type: string
 *                     shippingDates: 
 *                       type: array
 *                       items: 
 *                         type: number
 *                     shippingDate:
 *                       type: number
 *                     createAt:
 *                       type: number
 *                     updatedAt:
 *                       type: number
 *       400:
 *         description: No changes received or invalid changes were provided
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
websiteOrderRouter.patch('/:orderId', auth('user'), editOrder)