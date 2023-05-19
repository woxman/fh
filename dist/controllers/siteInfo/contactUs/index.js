"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.websiteContactUsRouter = exports.panelContactUsRouter = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../../middlewares/auth"));
const updatePageContent_1 = __importDefault(require("./updatePageContent"));
const getPageContent_1 = __importDefault(require("./getPageContent"));
const addQuestionAndAnswer_1 = __importDefault(require("./addQuestionAndAnswer"));
const getQuestionAndAnswer_1 = __importDefault(require("./getQuestionAndAnswer"));
const getQuestionAndAnswers_1 = __importDefault(require("./getQuestionAndAnswers"));
const editQuestionAndAnswer_1 = __importDefault(require("./editQuestionAndAnswer"));
const deleteQuestionAndAnswers_1 = __importDefault(require("./deleteQuestionAndAnswers"));
const addExpert_1 = __importDefault(require("./addExpert"));
const getExpert_1 = __importDefault(require("./getExpert"));
const getExperts_1 = __importDefault(require("./getExperts"));
const getExpertsByCategoryId_1 = __importDefault(require("./getExpertsByCategoryId"));
const editExpert_1 = __importDefault(require("./editExpert"));
const deleteExperts_1 = __importDefault(require("./deleteExperts"));
exports.panelContactUsRouter = (0, express_1.Router)();
exports.websiteContactUsRouter = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 * - name: Contact us | Panel
 *   description: Contact us routes for panel
 * - name: Contact us | Website
 *   description: Contact us routes for website
 */
/**
 * @swagger
 * /panel/site-info/contact-us/page-content:
 *   put:
 *     tags:
 *       - Contact us | Panel
 *     summary: Update contact us page content
 *     description: Update contact us page content
 *     security:
 *       - adminBearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               workHours:
 *                 type: string
 *               image:
 *                 oneOf:
 *                   - type: object
 *                     properties:
 *                       format:
 *                         type: string
 *                       data:
 *                         type: string
 *                         format: binary
 *                   - type: string
 *             required:
 *               - email
 *               - phone
 *               - address
 *               - workHours
 *               - image
 *     responses:
 *       200:
 *         description: contact us page content
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pageContent:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     address:
 *                       type: string
 *                     workHours:
 *                       type: string
 *                     image:
 *                       type: string
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
exports.panelContactUsRouter.put('/page-content', (0, auth_1.default)('admin'), updatePageContent_1.default);
/**
 * @swagger
 * /panel/site-info/contact-us/page-content:
 *   get:
 *     tags:
 *       - Contact us | Panel
 *     summary: Get contact us page content
 *     description: Get contact us page content
 *     security:
 *       - adminBearerAuth: []
 *     responses:
 *       200:
 *         description: contact us page content
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pageContent:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     address:
 *                       type: string
 *                     workHours:
 *                       type: string
 *                     image:
 *                       type: string
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
exports.panelContactUsRouter.get('/page-content', (0, auth_1.default)('admin'), getPageContent_1.default);
/**
 * @swagger
 * /panel/site-info/contact-us/question-and-answer:
 *   post:
 *     tags:
 *       - Contact us | Panel
 *     summary: Add a question and answer
 *     description: Add a question and answer
 *     security:
 *       - adminBearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               answer:
 *                 type: string
 *             required:
 *               - question
 *               - answer
 *     responses:
 *       200:
 *         description: Created question and answer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 questionAndAnswer:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     question:
 *                       type: string
 *                     answer:
 *                       type: string
 *                     createdAt:
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
exports.panelContactUsRouter.post('/question-and-answer', (0, auth_1.default)('admin'), addQuestionAndAnswer_1.default);
/**
 * @swagger
 * /panel/site-info/contact-us/question-and-answer/{questionAndAnswerId}:
 *   get:
 *     tags:
 *       - Contact us | Panel
 *     summary: Get a question and answer
 *     description: Get a question and answer by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: questionAndAnswerId
 *         in: path
 *         required: true
 *         description: The ID of the question and answer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The expected question and answer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 questionAndAnswer:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     question:
 *                       type: string
 *                     answer:
 *                       type: string
 *                     createdAt:
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
exports.panelContactUsRouter.get('/question-and-answer/:questionAndAnswerId', (0, auth_1.default)('admin'), getQuestionAndAnswer_1.default);
/**
 * @swagger
 * /panel/site-info/contact-us/question-and-answer:
 *   get:
 *     tags:
 *       - Contact us | Panel
 *     summary: Get list of question and answers
 *     description: Get list of question and answers
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
 *           enum: ["question", "createdAt"]
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
 *         description: The expression to filter the question of question and answers by
 *     responses:
 *       200:
 *         description: List of question and answer objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 questionAndAnswers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       question:
 *                         type: string
 *                       answer:
 *                         type: string
 *                       createdAt:
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
exports.panelContactUsRouter.get('/question-and-answer', (0, auth_1.default)('admin'), getQuestionAndAnswers_1.default);
/**
 * @swagger
 * /panel/site-info/contact-us/question-and-answer/{questionAndAnswerId}:
 *   patch:
 *     tags:
 *       - Contact us | Panel
 *     summary: Edit a question and answer
 *     description: Edit a question and answer by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: questionAndAnswerId
 *         in: path
 *         required: true
 *         description: The ID of the question and answer
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
 *                   question:
 *                     type: string
 *                   answer:
 *                     type: string
 *     responses:
 *       200:
 *         description: Updated question and answer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 questionAndAnswer:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     question:
 *                       type: string
 *                     answer:
 *                       type: string
 *                     createdAt:
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
exports.panelContactUsRouter.patch('/question-and-answer/:questionAndAnswerId', (0, auth_1.default)('admin'), editQuestionAndAnswer_1.default);
/**
 * @swagger
 * /panel/site-info/contact-us/question-and-answer/delete:
 *   post:
 *     tags:
 *       - Contact us | Panel
 *     summary: Delete question and answers by id
 *     description: Delete question and answers by id
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
 *         description: The question and answers deleted.
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
exports.panelContactUsRouter.post('/question-and-answer/delete', (0, auth_1.default)('admin'), deleteQuestionAndAnswers_1.default);
/**
 * @swagger
 * /panel/site-info/contact-us/expert:
 *   post:
 *     tags:
 *       - Contact us | Panel
 *     summary: Add an expert
 *     description: Add an expert
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
 *               phone:
 *                 type: string
 *               category:
 *                 type: string
 *                 description: Id of the related category
 *               socialNetworks:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     link:
 *                       type: string
 *                     icon:
 *                       type: string
 *               image:
 *                 type: object
 *                 properties:
 *                   format:
 *                     type: string
 *                   data:
 *                     type: string
 *                     format: binary
 *             required:
 *               - name
 *               - phone
 *               - category
 *               - socialNetworks
 *               - image
 *     responses:
 *       200:
 *         description: Created expert
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 expert:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     category:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                     socialNetworks:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                           link:
 *                             type: string
 *                           icon:
 *                             type: string
 *                     image:
 *                       type: string
 *                     createdAt:
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
exports.panelContactUsRouter.post('/expert', (0, auth_1.default)('admin'), addExpert_1.default);
/**
 * @swagger
 * /panel/site-info/contact-us/expert/{expertId}:
 *   get:
 *     tags:
 *       - Contact us | Panel
 *     summary: Get an expert
 *     description: Get an expert by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: expertId
 *         in: path
 *         required: true
 *         description: The ID of the expert
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The expected expert
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 expert:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     category:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                     socialNetworks:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                           link:
 *                             type: string
 *                           icon:
 *                             type: string
 *                     image:
 *                       type: string
 *                     createdAt:
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
exports.panelContactUsRouter.get('/expert/:expertId', (0, auth_1.default)('admin'), getExpert_1.default);
/**
 * @swagger
 * /panel/site-info/contact-us/expert:
 *   get:
 *     tags:
 *       - Contact us | Panel
 *     summary: Get list of experts
 *     description: Get list of experts
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
 *           enum: ["name", "phone", "createdAt"]
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
 *         description: The expression to filter the name of experts by
 *     responses:
 *       200:
 *         description: List of expert objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 experts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       phone:
 *                         type: string
 *                       category:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                       socialNetworks:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             name:
 *                               type: string
 *                             link:
 *                               type: string
 *                             icon:
 *                               type: string
 *                       image:
 *                         type: string
 *                       createdAt:
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
exports.panelContactUsRouter.get('/expert', (0, auth_1.default)('admin'), getExperts_1.default);
/**
 * @swagger
 * /panel/site-info/contact-us/expert/{expertId}:
 *   patch:
 *     tags:
 *       - Contact us | Panel
 *     summary: Edit an expert
 *     description: Edit an expert by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: expertId
 *         in: path
 *         required: true
 *         description: The ID of the expert
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
 *                   phone:
 *                     type: string
 *                   category:
 *                     type: string
 *                     description: Id of the related category
 *                   socialNetworks:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                         link:
 *                           type: string
 *                         icon:
 *                           type: string
 *                   image:
 *                     type: object
 *                     properties:
 *                       format:
 *                         type: string
 *                       data:
 *                         type: string
 *                         format: binary
 *     responses:
 *       200:
 *         description: Updated expert
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 expert:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     category:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                     socialNetworks:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                           link:
 *                             type: string
 *                           icon:
 *                             type: string
 *                     image:
 *                       type: string
 *                     createdAt:
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
exports.panelContactUsRouter.patch('/expert/:expertId', (0, auth_1.default)('admin'), editExpert_1.default);
/**
 * @swagger
 * /panel/site-info/contact-us/expert/delete:
 *   post:
 *     tags:
 *       - Contact us | Panel
 *     summary: Delete experts by id
 *     description: Delete experts by id
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
 *         description: The experts deleted.
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
exports.panelContactUsRouter.post('/expert/delete', (0, auth_1.default)('admin'), deleteExperts_1.default);
//---------------------------------------------------------------------------
/**
 * @swagger
 * /website/site-info/contact-us/page-content:
 *   get:
 *     tags:
 *       - Contact us | Website
 *     summary: Get contact us page content
 *     description: Get contact us page content
 *     responses:
 *       200:
 *         description: contact us page content
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pageContent:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                     content:
 *                       type: string
 *                     quotation:
 *                       type: object
 *                       properties:
 *                         content:
 *                           type: string
 *                         name:
 *                           type: string
 *                         role:
 *                           type: string
 *                         image:
 *                           type: string
 *                     image:
 *                       type: string
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
exports.websiteContactUsRouter.get('/page-content', getPageContent_1.default);
/**
 * @swagger
 * /website/site-info/contact-us/question-and-answer/{questionAndAnswerId}:
 *   get:
 *     tags:
 *       - Contact us | Website
 *     summary: Get a question and answer
 *     description: Get a question and answer by id
 *     parameters:
 *       - name: questionAndAnswerId
 *         in: path
 *         required: true
 *         description: The ID of the question and answer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The expected question and answer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 questionAndAnswer:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     question:
 *                       type: string
 *                     answer:
 *                       type: string
 *                     createdAt:
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
exports.websiteContactUsRouter.get('/question-and-answer/:questionAndAnswerId', getQuestionAndAnswer_1.default);
/**
 * @swagger
 * /website/site-info/contact-us/question-and-answer:
 *   get:
 *     tags:
 *       - Contact us | Website
 *     summary: Get list of question and answers
 *     description: Get list of question and answers
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
 *           enum: ["question", "createdAt"]
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
 *         description: The expression to filter the question of question and answers by
 *     responses:
 *       200:
 *         description: List of question and answer objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 questionAndAnswers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       question:
 *                         type: string
 *                       answer:
 *                         type: string
 *                       createdAt:
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
exports.websiteContactUsRouter.get('/question-and-answer', getQuestionAndAnswers_1.default);
/**
 * @swagger
 * /website/site-info/contact-us/expert/{expertId}:
 *   get:
 *     tags:
 *       - Contact us | Website
 *     summary: Get an expert
 *     description: Get an expert by id
 *     parameters:
 *       - name: expertId
 *         in: path
 *         required: true
 *         description: The ID of the expert
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The expected expert
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 expert:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     category:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                     socialNetworks:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                           link:
 *                             type: string
 *                           icon:
 *                             type: string
 *                     image:
 *                       type: string
 *                     createdAt:
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
exports.websiteContactUsRouter.get('/expert/:expertId', getExpert_1.default);
/**
 * @swagger
 * /website/site-info/contact-us/expert:
 *   get:
 *     tags:
 *       - Contact us | Website
 *     summary: Get list of experts
 *     description: Get list of experts
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
 *           enum: ["name", "phone", "createdAt"]
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
 *         description: The expression to filter the name of experts by
 *     responses:
 *       200:
 *         description: List of expert objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 experts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       phone:
 *                         type: string
 *                       category:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                       socialNetworks:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             name:
 *                               type: string
 *                             link:
 *                               type: string
 *                             icon:
 *                               type: string
 *                       image:
 *                         type: string
 *                       createdAt:
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
exports.websiteContactUsRouter.get('/expert', getExperts_1.default);
/**
 * @swagger
 * /website/site-info/contact-us/expert/category/{categoryId}:
 *   get:
 *     tags:
 *       - Contact us | Website
 *     summary: Get list of experts by category id
 *     description: Get list of experts by category id
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         description: The ID of the category to filter the experts by
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
 *           enum: ["name", "phone", "createdAt"]
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
 *         description: The expression to filter the name of experts by
 *     responses:
 *       200:
 *         description: List of expert objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 experts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       phone:
 *                         type: string
 *                       category:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                       socialNetworks:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             name:
 *                               type: string
 *                             link:
 *                               type: string
 *                             icon:
 *                               type: string
 *                       image:
 *                         type: string
 *                       createdAt:
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
exports.websiteContactUsRouter.get('/expert/category/:categoryId', getExpertsByCategoryId_1.default);
