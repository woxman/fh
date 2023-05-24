import { Router } from 'express'

import auth from "../../../middlewares/auth"
import updateLogo from './updateLogo'
import getLogo from './getLogo'
import updateNewsAndBanner from './updateNewsAndBanner'
import getNewsAndBanner from './getNewsAndBanner'
import addSocialNetwork from './addSocialNetwork'
import getSocialNetwork from './getSocialNetwork'
import getSocialNetworks from './getSocialNetworks'
import editSocialNetwork from './editSocialNetwork'
import deleteSocialNetwork from './deleteSocialNetwork'
import addOrderStep from './addOrderStep'
import addGalleryStep from './addGalleryStep'
import getOrderStep from './getOrderStep'
import getGalleryStep from './getGalleryStep'
import getOrderSteps from './getOrderSteps'
import getGallerySteps from './getGallerySteps'
import editOrderStep from './editOrderStep'
import editGalleryStep from './editGalleryStep'
import deleteOrderStep from './deleteOrderStep'
import deleteGalleryStep from './deleteGalleryStep'
import updateFooter from './updateFooter'
import getFooter from './getFooter'
import updateSpecialProducts from './updateSpecialProducts'
import getSpecialProducts from './getSpecialProducts'

export const panelMainPageRouter = Router()
export const websiteMainPageRouter = Router()

/**
 * @swagger
 * tags:
 * - name: Main page | Panel
 *   description: Main page routes for panel
 * - name: Main page | Website
 *   description: Main page routes for website
 */

/**
 * @swagger
 * /panel/site-info/main-page/logo:
 *   put:
 *     tags:
 *       - Main page | Panel
 *     summary: Update site logo
 *     description: Update site logo
 *     security:
 *       - adminBearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               logo:
 *                 type: object
 *                 properties:
 *                   format:
 *                     type: string
 *                   data:
 *                     type: string
 *                     format: binary
 *             required:
 *               - logo
 *     responses:
 *       200:
 *         description: Logo url
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 logo:
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
panelMainPageRouter.put('/logo', auth('admin'), updateLogo)



/**
 * @swagger
 * /panel/site-info/main-page/logo:
 *   get:
 *     tags:
 *       - Main page | Panel
 *     summary: get site logo url
 *     description: get site logo url
 *     security:
 *       - adminBearerAuth: []
 *     responses:
 *       200:
 *         description: Logo url
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 logo:
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
panelMainPageRouter.get('/logo', auth('admin'), getLogo)



/**
 * @swagger
 * /panel/site-info/main-page/news-and-banner:
 *   put:
 *     tags:
 *       - Main page | Panel
 *     summary: Update main page news and banner
 *     description: Update main page news and banner
 *     security:
 *       - adminBearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               news:
 *                 type: string
 *               banner:
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
 *               - news
 *               - banner
 *     responses:
 *       200:
 *         description: main page news and banner
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 newsAndBanner:
 *                   type: object
 *                   properties:
 *                     news:
 *                       type: string
 *                     banner:
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
panelMainPageRouter.put('/news-and-banner', auth('admin'), updateNewsAndBanner)



/**
 * @swagger
 * /panel/site-info/main-page/news-and-banner:
 *   get:
 *     tags:
 *       - Main page | Panel
 *     summary: Get main page news and banner
 *     description: Get main page news and banner
 *     security:
 *       - adminBearerAuth: []
 *     responses:
 *       200:
 *         description: main page news and banner
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 newsAndBanner:
 *                   type: object
 *                   properties:
 *                     news:
 *                       type: string
 *                     banner:
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
panelMainPageRouter.get('/news-and-banner', auth('admin'), getNewsAndBanner)



/**
 * @swagger
 * /panel/site-info/main-page/social-network:
 *   post:
 *     tags:
 *       - Main page | Panel
 *     summary: Add a social network
 *     description: Add a social network
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
 *               link:
 *                 type: string
 *               show:
 *                 type: boolean
 *               icon:
 *                 type: object
 *                 properties:
 *                   format:
 *                     type: string
 *                   data:
 *                     type: string
 *                     format: binary
 *             required:
 *               - name
 *               - link
 *               - show
 *               - icon
 *     responses:
 *       200:
 *         description: Created social networks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 socialNerworks:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     link:
 *                       type: string
 *                     show:
 *                       type: boolean
 *                     icon:
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
panelMainPageRouter.post('/social-network', auth('admin'), addSocialNetwork)



/**
 * @swagger
 * /panel/site-info/main-page/social-network/{socialNerworkId}:
 *   get:
 *     tags:
 *       - Main page | Panel
 *     summary: Get a social network
 *     description: Get a social network by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: socialNerworkId
 *         in: path
 *         required: true
 *         description: The ID of the social nerwork
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The expected social network
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 socialNerwork:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     link:
 *                       type: string
 *                     show:
 *                       type: boolean
 *                     icon:
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
panelMainPageRouter.get('/social-network/:socialNetworkId', auth('admin'), getSocialNetwork)



/**
 * @swagger
 * /panel/site-info/main-page/social-network:
 *   get:
 *     tags:
 *       - Main page | Panel
 *     summary: Get all social networks
 *     description: Get all social networks
 *     security:
 *       - adminBearerAuth: []
 *     responses:
 *       200:
 *         description: List of the social networks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 socialNerworks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       link:
 *                         type: string
 *                       show:
 *                         type: boolean
 *                       icon:
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
panelMainPageRouter.get('/social-network', auth('admin'), getSocialNetworks)



/**
 * @swagger
 * /panel/site-info/main-page/social-network/{socialNetworkId}:
 *   patch:
 *     tags:
 *       - Main page | Panel
 *     summary: Edit a social network
 *     description: Edit a social network by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: socialNerworkId
 *         in: path
 *         required: true
 *         description: The ID of the social nerwork
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
 *                   link:
 *                     type: string
 *                   show:
 *                     type: boolean
 *                   icon:
 *                     type: object
 *                     properties:
 *                       format:
 *                         type: string
 *                       data:
 *                         type: string
 *                         format: binary
 *     responses:
 *       200:
 *         description: Updated social network
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 socialNerwork:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     link:
 *                       type: string
 *                     show:
 *                       type: boolean
 *                     icon:
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
panelMainPageRouter.patch('/social-network/:socialNetworkId', auth('admin'), editSocialNetwork)



/**
 * @swagger
 * /panel/site-info/main-page/social-network/{socialNerworkId}:
 *   delete:
 *     tags:
 *       - Main page | Panel
 *     summary: Delete a social network
 *     description: Delete a social network by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: socialNerworkId
 *         in: path
 *         required: true
 *         description: The ID of the social nerwork
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The social network deleted
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
panelMainPageRouter.delete('/social-network/:socialNetworkId', auth('admin'), deleteSocialNetwork)


//Herer Start
/**
 * @swagger
 * /panel/site-info/main-page/order-step:
 *   post:
 *     tags:
 *       - Main page | Panel
 *     summary: Add an order step
 *     description: Add an order step
 *     security:
 *       - adminBearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               step:
 *                 type: number
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
 *               - step
 *               - title
 *               - description
 *               - image
 *     responses:
 *       200:
 *         description: Created order step
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderStep:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     step:
 *                       type: string
 *                     title:
 *                       type: string
 *                     description:
 *                       type: boolean
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
panelMainPageRouter.post('/order-step', auth('admin'), addOrderStep)

/**
 * @swagger
 * /panel/site-info/main-page/gallery-step:
 *   post:
 *     tags:
 *       - Main page | Panel
 *     summary: Add an gallery
 *     description: Add an gallery
 *     security:
 *       - adminBearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               step:
 *                 type: number
 *               link:
 *                 type: string
 *               which:
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
 *               - step
 *               - which
 *               - image
 *     responses:
 *       200:
 *         description: Created gallery
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderStep:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     step:
 *                       type: string
 *                     link:
 *                       type: string
 *                     which:
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
panelMainPageRouter.post('/gallery-step', auth('admin'), addGalleryStep)


/**
 * @swagger
 * /panel/site-info/main-page/order-step/{orderStepId}:
 *   get:
 *     tags:
 *       - Main page | Panel
 *     summary: Get an order step
 *     description: Get an order step by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: orderStepId
 *         in: path
 *         required: true
 *         description: The ID of the order step
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The expected order step
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderStep:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     step:
 *                       type: string
 *                     title:
 *                       type: string
 *                     description:
 *                       type: boolean
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
panelMainPageRouter.get('/order-step/:orderStepId', auth('admin'), getOrderStep)

/**
 * @swagger
 * /panel/site-info/main-page/gallery-step/{galleryStepId}:
 *   get:
 *     tags:
 *       - Main page | Panel
 *     summary: Get an order step
 *     description: Get an gallery step by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: orderStepId
 *         in: path
 *         required: true
 *         description: The ID of the gallery step
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The expected gallery step
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderStep:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     step:
 *                       type: string
 *                     link:
 *                       type: string
 *                     which:
 *                       type: boolean
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
panelMainPageRouter.get('/gallery-step/:galleryStepId', auth('admin'), getGalleryStep)


/**
 * @swagger
 * /panel/site-info/main-page/order-step:
 *   get:
 *     tags:
 *       - Main page | Panel
 *     summary: Get all order steps
 *     description: Get all order steps
 *     security:
 *       - adminBearerAuth: []
 *     responses:
 *       200:
 *         description: List of the order steps
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderSteps:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       step:
 *                         type: string
 *                       title:
 *                         type: string
 *                       description:
 *                         type: boolean
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
panelMainPageRouter.get('/order-step', auth('admin'), getOrderSteps)

/**
 * @swagger
 * /panel/site-info/main-page/gallery-step:
 *   get:
 *     tags:
 *       - Main page | Panel
 *     summary: Get all gallery steps
 *     description: Get all gallery steps
 *     security:
 *       - adminBearerAuth: []
 *     responses:
 *       200:
 *         description: List of the gallery steps
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderSteps:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       step:
 *                         type: string
 *                       link:
 *                         type: string
 *                       which:
 *                         type: boolean
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
panelMainPageRouter.get('/gallery-step', auth('admin'), getGallerySteps)


/**
 * @swagger
 * /panel/site-info/main-page/order-step/{orderStepId}:
 *   patch:
 *     tags:
 *       - Main page | Panel
 *     summary: Edit an order step
 *     description: Edit an order step by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: orderStepId
 *         in: path
 *         required: true
 *         description: The ID of the order step
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
 *                   step:
 *                     type: number
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
 *         description: Updated order step
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderStep:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     step:
 *                       type: string
 *                     title:
 *                       type: string
 *                     description:
 *                       type: boolean
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
panelMainPageRouter.patch('/order-step/:orderStepId', auth('admin'), editOrderStep)

/**
 * @swagger
 * /panel/site-info/main-page/gallery-step/{galleryStepId}:
 *   patch:
 *     tags:
 *       - Main page | Panel
 *     summary: Edit an gallery step
 *     description: Edit an gallery step by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: galleryStepId
 *         in: path
 *         required: true
 *         description: The ID of the gallery step
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
 *                   step:
 *                     type: number
 *                   link:
 *                     type: string
 *                   which:
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
 *         description: Updated gallery step
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderStep:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     step:
 *                       type: string
 *                     link:
 *                       type: string
 *                     which:
 *                       type: boolean
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
panelMainPageRouter.patch('/gallery-step/:galleryStepId', auth('admin'), editGalleryStep)

/**
 * @swagger
 * /panel/site-info/main-page/order-step/{orderStepId}:
 *   delete:
 *     tags:
 *       - Main page | Panel
 *     summary: Delete an order step
 *     description: Delete an order step
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: orderStepId
 *         in: path
 *         required: true
 *         description: The ID of the order step
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The order step deleted
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
panelMainPageRouter.delete('/order-step/:orderStepId', auth('admin'), deleteOrderStep)

/**
 * @swagger
 * /panel/site-info/main-page/gallery-step/{galleryStepId}:
 *   delete:
 *     tags:
 *       - Main page | Panel
 *     summary: Delete an gallery step
 *     description: Delete an gallery step
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: galleryStepId
 *         in: path
 *         required: true
 *         description: The ID of the gallery step
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The gallery step deleted
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
panelMainPageRouter.delete('/gallery-step/:galleryStepId', auth('admin'), deleteGalleryStep)
//Herer Stop


/**
 * @swagger
 * /panel/site-info/main-page/footer:
 *   put:
 *     tags:
 *       - Main page | Panel
 *     summary: Update main page footer
 *     description: Update main page footer
 *     security:
 *       - adminBearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               workHours:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   oneOf:
 *                     - type: string
 *                     - type: object
 *                       properties:
 *                         format:
 *                           type: string
 *                         data:
 *                           type: string
 *                           format: binary
 *             required:
 *               - content
 *               - email
 *               - phone
 *               - address
 *               - workHours
 *               - images
 *     responses:
 *       200:
 *         description: main page footer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 footer:
 *                   type: object
 *                   properties:
 *                     content:
 *                       type: string
 *                     email:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     address:
 *                       type: string
 *                     workHours:
 *                       type: string
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
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
panelMainPageRouter.put('/footer', auth('admin'), updateFooter)



/**
 * @swagger
 * /panel/site-info/main-page/footer:
 *   get:
 *     tags:
 *       - Main page | Panel
 *     summary: Get main page footer
 *     description: Get main page footer
 *     security:
 *       - adminBearerAuth: []
 *     responses:
 *       200:
 *         description: main page footer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 footer:
 *                   type: object
 *                   properties:
 *                     content:
 *                       type: string
 *                     email:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     address:
 *                       type: string
 *                     workHours:
 *                       type: string
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
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
panelMainPageRouter.get('/footer', auth('admin'), getFooter)



/**
 * @swagger
 * /panel/site-info/main-page/special-products:
 *   put:
 *     tags:
 *       - Main page | Panel
 *     summary: Update main page special products
 *     description: Update main page special products
 *     security:
 *       - adminBearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               specialProducts:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     subcategory:
 *                       type: string
 *                       description: ID of the related subcategory
 *                     factory:
 *                       type: string
 *                       description: ID of the related factory
 *                     products:
 *                       type: array
 *                       items:
 *                         type: string
 *                         description: ID of the related product
 *             required:
 *               - specialProducts
 *     responses:
 *       200:
 *         description: main page special products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 specialProducts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       subcategory:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                       factory:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                       products:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                             name:
 *                               type: string
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
panelMainPageRouter.put('/special-products', auth('admin'), updateSpecialProducts)



/**
 * @swagger
 * /panel/site-info/main-page/special-products:
 *   get:
 *     tags:
 *       - Main page | Panel
 *     summary: Get main page special products
 *     description: Get main page special products
 *     security:
 *       - adminBearerAuth: []
 *     responses:
 *       200:
 *         description: main page special products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 specialProducts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       subcategory:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                       factory:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                       products:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                             name:
 *                               type: string
 *                             priceHistory:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   price:
 *                                     type: number
 *                                   date:
 *                                     type: number
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
panelMainPageRouter.get('/special-products', auth('admin'), getSpecialProducts)






//---------------------------------------------------------------



/**
 * @swagger
 * /website/site-info/main-page/logo:
 *   get:
 *     tags:
 *       - Main page | Website
 *     summary: get site logo url
 *     description: get site logo url
 *     responses:
 *       200:
 *         description: Logo url
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 logo:
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
websiteMainPageRouter.get('/logo', getLogo)



/**
 * @swagger
 * /website/site-info/main-page/news-and-banner:
 *   get:
 *     tags:
 *       - Main page | Website
 *     summary: Get main page news and banner
 *     description: Get main page news and banner
 *     responses:
 *       200:
 *         description: main page news and banner
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 newsAndBanner:
 *                   type: object
 *                   properties:
 *                     news:
 *                       type: string
 *                     banner:
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
websiteMainPageRouter.get('/news-and-banner', getNewsAndBanner)



/**
 * @swagger
 * /website/site-info/main-page/social-network:
 *   get:
 *     tags:
 *       - Main page | Website
 *     summary: Get all social networks
 *     description: Get all social networks
 *     responses:
 *       200:
 *         description: List of the social networks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 socialNerworks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       link:
 *                         type: string
 *                       show:
 *                         type: boolean
 *                       icon:
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
websiteMainPageRouter.get('/social-network', getSocialNetworks)



/**
 * @swagger
 * /website/site-info/main-page/order-step:
 *   get:
 *     tags:
 *       - Main page | Website
 *     summary: Get all order steps
 *     description: Get all order steps
 *     responses:
 *       200:
 *         description: List of the order steps
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderSteps:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       step:
 *                         type: string
 *                       title:
 *                         type: string
 *                       description:
 *                         type: boolean
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
websiteMainPageRouter.get('/order-step', getOrderSteps)



/**
 * @swagger
 * /website/site-info/main-page/footer:
 *   get:
 *     tags:
 *       - Main page | Website
 *     summary: Get main page footer
 *     description: Get main page footer
 *     responses:
 *       200:
 *         description: main page footer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 footer:
 *                   type: object
 *                   properties:
 *                     content:
 *                       type: string
 *                     email:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     address:
 *                       type: string
 *                     workHours:
 *                       type: string
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
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
websiteMainPageRouter.get('/footer', getFooter)



/**
 * @swagger
 * /website/site-info/main-page/special-products:
 *   get:
 *     tags:
 *       - Main page | Website
 *     summary: Get main page special products
 *     description: Get main page special products
 *     responses:
 *       200:
 *         description: main page special products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 specialProducts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       subcategory:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                       factory:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                       products:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                             name:
 *                               type: string
 *                             priceHistory:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   price:
 *                                     type: number
 *                                   date:
 *                                     type: number
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
websiteMainPageRouter.get('/special-products', getSpecialProducts)
