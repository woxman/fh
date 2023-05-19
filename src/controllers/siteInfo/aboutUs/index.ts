import { Router } from 'express'

import auth from "../../../middlewares/auth"

import updatePageContent from './updatePageContent'
import getPageContent from './getPageContent'
import addProject from './addProject'
import getProject from './getProject'
import getProjects from './getProjects'
import editProject from './editProject'
import deleteProjects from './deleteProjects'

export const panelAboutUsRouter = Router()
export const websiteAboutUsRouter = Router()

/**
 * @swagger
 * tags:
 * - name: About us | Panel
 *   description: About us routes for panel
 * - name: About us | Website
 *   description: About us routes for website
 */


/**
 * @swagger
 * /panel/site-info/about-us/page-content:
 *   put:
 *     tags:
 *       - About us | Panel
 *     summary: Update about us page content
 *     description: Update about us page content
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
 *               content:
 *                 type: string
 *               quotation:
 *                 type: object
 *                 properties:
 *                   content:
 *                     type: string
 *                   name:
 *                     type: string
 *                   role:
 *                     type: string
 *                   image:
 *                     oneOf:
 *                       - type: object
 *                         properties:
 *                           format:
 *                             type: string
 *                           data:
 *                             type: string
 *                             format: binary
 *                       - type: string
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
 *               - title
 *               - content
 *               - quotation
 *               - image
 *     responses:
 *       200:
 *         description: about us page content
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
panelAboutUsRouter.put('/page-content', auth('admin'), updatePageContent)



/**
 * @swagger
 * /panel/site-info/about-us/page-content:
 *   get:
 *     tags:
 *       - About us | Panel
 *     summary: Get about us page content
 *     description: Get about us page content
 *     security:
 *       - adminBearerAuth: []
 *     responses:
 *       200:
 *         description: about us page content
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
panelAboutUsRouter.get('/page-content', auth('admin'), getPageContent)



/**
 * @swagger
 * /panel/site-info/about-us/project:
 *   post:
 *     tags:
 *       - About us | Panel
 *     summary: Add a project
 *     description: Add a project
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
 *               description:
 *                 type: string
 *               image:
 *                 type: object
 *                 properties:
 *                   format:
 *                     type: string
 *                   data:
 *                     type: string
 *                     format: binary
 *             required:
 *               - title
 *               - description
 *               - image
 *     responses:
 *       200:
 *         description: Created project
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 project:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
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
panelAboutUsRouter.post('/project', auth('admin'), addProject)



/**
 * @swagger
 * /panel/site-info/about-us/project/{projectId}:
 *   get:
 *     tags:
 *       - About us | Panel
 *     summary: Get a project
 *     description: Get a project by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: projectId
 *         in: path
 *         required: true
 *         description: The ID of the project
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The expected project
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 project:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
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
panelAboutUsRouter.get('/project/:projectId', auth('admin'), getProject)



/**
 * @swagger
 * /panel/site-info/about-us/project:
 *   get:
 *     tags:
 *       - About us | Panel
 *     summary: Get list of projects
 *     description: Get list of projects
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
 *           enum: ["title", "createdAt"]
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
 *         description: The expression to filter the title of projects by
 *     responses:
 *       200:
 *         description: List of project objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 projects:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
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
panelAboutUsRouter.get('/project', auth('admin'), getProjects)



/**
 * @swagger
 * /panel/site-info/about-us/project/{projectId}:
 *   patch:
 *     tags:
 *       - About us | Panel
 *     summary: Edit a project
 *     description: Edit a project by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: projectId
 *         in: path
 *         required: true
 *         description: The ID of the project
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
 *                   description:
 *                     type: string
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
 *         description: Updated project
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 project:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
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
panelAboutUsRouter.patch('/project/:projectId', auth('admin'), editProject)



/**
 * @swagger
 * /panel/site-info/about-us/project/delete:
 *   post:
 *     tags:
 *       - About us | Panel
 *     summary: Delete projects by id
 *     description: Delete projects by id
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
 *         description: The projects deleted.
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
panelAboutUsRouter.post('/project/delete', auth('admin'), deleteProjects)




//---------------------------------------------------------------------------



/**
 * @swagger
 * /website/site-info/about-us/page-content:
 *   get:
 *     tags:
 *       - About us | Website
 *     summary: Get about us page content
 *     description: Get about us page content
 *     responses:
 *       200:
 *         description: about us page content
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
websiteAboutUsRouter.get('/page-content', getPageContent)



/**
 * @swagger
 * /website/site-info/about-us/project/{projectId}:
 *   get:
 *     tags:
 *       - About us | Website
 *     summary: Get a project
 *     description: Get a project by id
 *     parameters:
 *       - name: projectId
 *         in: path
 *         required: true
 *         description: The ID of the project
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The expected project
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 project:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
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
 websiteAboutUsRouter.get('/project/:projectId', getProject)



/**
 * @swagger
 * /website/site-info/about-us/project:
 *   get:
 *     tags:
 *       - About us | Website
 *     summary: Get list of projects
 *     description: Get list of projects
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
 *           enum: ["title", "createdAt"]
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
 *         description: The expression to filter the title of projects by
 *     responses:
 *       200:
 *         description: List of project objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 projects:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
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
 websiteAboutUsRouter.get('/project', getProjects)