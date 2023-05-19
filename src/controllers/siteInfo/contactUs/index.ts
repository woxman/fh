import { Router } from 'express'

import auth from "../../../middlewares/auth"

import updatePageContent from './updatePageContent'
import getPageContent from './getPageContent'
import addQuestionAndAnswer from './addQuestionAndAnswer'
import getQuestionAndAnswer from './getQuestionAndAnswer'
import getQuestionAndAnswers from './getQuestionAndAnswers'
import editQuestionAndAnswer from './editQuestionAndAnswer'
import deleteQuestionAndAnswers from './deleteQuestionAndAnswers'
import addExpert from './addExpert'
import getExpert from './getExpert'
import getExperts from './getExperts'
import getExpertsByCategoryId from './getExpertsByCategoryId'
import editExpert from './editExpert'
import deleteExperts from './deleteExperts'

export const panelContactUsRouter = Router()
export const websiteContactUsRouter = Router()

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
panelContactUsRouter.put('/page-content', auth('admin'), updatePageContent)



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
panelContactUsRouter.get('/page-content', auth('admin'), getPageContent)



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
panelContactUsRouter.post('/question-and-answer', auth('admin'), addQuestionAndAnswer)



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
panelContactUsRouter.get('/question-and-answer/:questionAndAnswerId', auth('admin'), getQuestionAndAnswer)



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
panelContactUsRouter.get('/question-and-answer', auth('admin'), getQuestionAndAnswers)



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
panelContactUsRouter.patch('/question-and-answer/:questionAndAnswerId', auth('admin'), editQuestionAndAnswer)



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
panelContactUsRouter.post('/question-and-answer/delete', auth('admin'), deleteQuestionAndAnswers)



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
panelContactUsRouter.post('/expert', auth('admin'), addExpert)



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
panelContactUsRouter.get('/expert/:expertId', auth('admin'), getExpert)



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
panelContactUsRouter.get('/expert', auth('admin'), getExperts)



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
panelContactUsRouter.patch('/expert/:expertId', auth('admin'), editExpert)



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
panelContactUsRouter.post('/expert/delete', auth('admin'), deleteExperts)




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
websiteContactUsRouter.get('/page-content', getPageContent)



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
websiteContactUsRouter.get('/question-and-answer/:questionAndAnswerId', getQuestionAndAnswer)



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
websiteContactUsRouter.get('/question-and-answer', getQuestionAndAnswers)



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
websiteContactUsRouter.get('/expert/:expertId', getExpert)



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
websiteContactUsRouter.get('/expert', getExperts)



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
websiteContactUsRouter.get('/expert/category/:categoryId', getExpertsByCategoryId)