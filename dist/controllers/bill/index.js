"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.websiteBillRouter = exports.panelBillRouter = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const addBill_1 = __importDefault(require("./addBill"));
const editBill_1 = __importDefault(require("./editBill"));
const choosePaymentMethod_1 = __importDefault(require("./choosePaymentMethod"));
const updateBankPayment_1 = __importDefault(require("./updateBankPayment"));
const disapproveBankPayment_1 = __importDefault(require("./disapproveBankPayment"));
const deleteBill_1 = __importDefault(require("./deleteBill"));
exports.panelBillRouter = (0, express_1.Router)();
exports.websiteBillRouter = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 * - name: Bill | Panel
 *   description: Bill routes for panel
 * - name: Bill | Website
 *   description: Bill routes for website
 */
/**
 * @swagger
 * /panel/bill/order/{orderId}:
 *   post:
 *     tags:
 *       - Bill | Panel
 *     summary: Add a bill for an order
 *     description: Add a new bill for an order
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
 *               validUntil:
 *                 type: number
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
 *                     price:
 *                       type: number
 *               shippingCost:
 *                 type: number
 *               valueAddedPercentage:
 *                 type: number
 *               totalDiscount:
 *                 type: number
 *             required:
 *               - validUntil
 *               - products
 *               - shippingCost
 *               - valueAddedPercentage
 *               - totalDiscount
 *     responses:
 *       200:
 *         description: updated order
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
 *                         createAt:
 *                           type: number
 *                         updatedAt:
 *                           type: number
 *                     createAt:
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
exports.panelBillRouter.post('/order/:orderId', (0, auth_1.default)('admin'), addBill_1.default);
/**
 * @swagger
 * /panel/bill/order/{orderId}:
 *   patch:
 *     tags:
 *       - Bill | Panel
 *     summary: Edit the bill of an order
 *     description: Edit the bill of an order
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
 *                   validUntil:
 *                     type: number
 *                   products:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         product:
 *                           type: string
 *                           description: ID of the related product
 *                         count:
 *                           type: number
 *                         price:
 *                           type: number
 *                   shippingCost:
 *                     type: number
 *                   valueAddedPercentage:
 *                     type: number
 *                   totalDiscount:
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
 *                         createAt:
 *                           type: number
 *                         updatedAt:
 *                           type: number
 *                     createAt:
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
exports.panelBillRouter.patch('/order/:orderId', (0, auth_1.default)('admin'), editBill_1.default);
/**
 * @swagger
 * /panel/bill/order/{orderId}/disaprove-bank-payment:
 *   post:
 *     tags:
 *       - Bill | Panel
 *     summary: Disapprove bank payment of an order
 *     description: Disapprove bank payment of an order
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
 *               disapprovalMessage:
 *                 type: string
 *             required:
 *               - disapprovalMessage
 *     responses:
 *       200:
 *         description: updated order
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
 *                                 disapprovalMessage:
 *                                   type: string
 *                         createAt:
 *                           type: number
 *                         updatedAt:
 *                           type: number
 *                     createAt:
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
exports.panelBillRouter.post('/order/:orderId/disaprove-bank-payment', (0, auth_1.default)('admin'), disapproveBankPayment_1.default);
/**
 * @swagger
 * /panel/bill/order/{orderId}:
 *   delete:
 *     tags:
 *       - Bill | Panel
 *     summary: Delete the bill of an order
 *     description: Delete the bill of an order
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: orderId
 *         in: path
 *         required: true
 *         description: The ID of the order
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The bill deleted
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
exports.panelBillRouter.delete('/order/:orderId', (0, auth_1.default)('admin'), deleteBill_1.default);
//--------------------------------------------------------------------------------------------------------
/**
 * @swagger
 * /website/bill/order/{orderId}/payment-method:
 *   post:
 *     tags:
 *       - Bill | Website
 *     summary: Choose payment method of bill for an order
 *     description: Choose payment method of bill for an order
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
 *               paymentMethod:
 *                 type: string
 *             required:
 *               - paymentMethod
 *     responses:
 *       200:
 *         description: updated order
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
 *                         createAt:
 *                           type: number
 *                         updatedAt:
 *                           type: number
 *                     createAt:
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
exports.websiteBillRouter.post('/order/:orderId/payment-method', (0, auth_1.default)('user'), choosePaymentMethod_1.default);
/**
 * @swagger
 * /website/bill/order/{orderId}/bank-payment:
 *   post:
 *     tags:
 *       - Bill | Website
 *     summary: Update bank payment of bill for an order
 *     description: Update bank payment of bill for an order
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
 *               paidAmount:
 *                 type: number
 *               originAccount:
 *                 type: string
 *               trackingNumber:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     format:
 *                       type: string
 *                     data:
 *                       type: string
 *                       format: binary
 *             required:
 *               - paidAmount
 *               - originAccount
 *               - trackingNumber
 *               - images
 *     responses:
 *       200:
 *         description: updated order
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
 *                         createAt:
 *                           type: number
 *                         updatedAt:
 *                           type: number
 *                     createAt:
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
exports.websiteBillRouter.post('/order/:orderId/bank-payment', (0, auth_1.default)('user'), updateBankPayment_1.default);
