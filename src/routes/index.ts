import { Router } from 'express'

import { panelAdminRouter } from '../controllers/admin'
import { panelUserRouter, websiteUserRouter } from '../controllers/user'
import { panelCategoryRouter, websiteCategoryRouter } from '../controllers/category'
import { panelSubcategoryRouter, websiteSubcategoryRouter } from '../controllers/subcategory'
import { panelPropertyRouter, websitePropertyRouter } from '../controllers/property'
import { panelFactoryRouter, websiteFactoryRouter } from '../controllers/factory'
import { panelProductRouter, websiteProductRouter } from '../controllers/product'
import { panelBillRouter, websiteBillRouter } from '../controllers/bill'
import { panelBlogRouter, websiteBlogRouter } from '../controllers/blog'
import { panelSiteInfoRouter, websiteSiteInfoRouter } from "../controllers/siteInfo"
import { panelOrderRouter, websiteOrderRouter } from '../controllers/order'
import { panelReportRouter } from '../controllers/report'
import { imageRouter } from "../controllers/image"

const mainRouter = Router()

mainRouter.use('/panel/admin', panelAdminRouter)
mainRouter.use('/panel/user', panelUserRouter)
mainRouter.use('/website/user', websiteUserRouter)
mainRouter.use('/website/user', panelUserRouter)
mainRouter.use('/panel/category', panelCategoryRouter)
mainRouter.use('/website/category', websiteCategoryRouter)
mainRouter.use('/panel/subcategory', panelSubcategoryRouter)
mainRouter.use('/website/subcategory', websiteSubcategoryRouter)
mainRouter.use('/panel/property', panelPropertyRouter)
mainRouter.use('/website/property', websitePropertyRouter)
mainRouter.use('/panel/factory', panelFactoryRouter)
mainRouter.use('/website/factory', websiteFactoryRouter)
mainRouter.use('/panel/product', panelProductRouter)
mainRouter.use('/website/product', websiteProductRouter)/*TTT*/
mainRouter.use('/panel/bill', panelBillRouter)
mainRouter.use('/website/bill', websiteBillRouter)
mainRouter.use('/panel/blog', panelBlogRouter)
mainRouter.use('/website/blog', websiteBlogRouter)/*TTT*/
mainRouter.use('/panel/site-info', panelSiteInfoRouter)
mainRouter.use('/website/site-info', websiteSiteInfoRouter)
mainRouter.use('/panel/order', panelOrderRouter)
mainRouter.use('/website/order', websiteOrderRouter)
mainRouter.use('/panel/report', panelReportRouter)
mainRouter.use('/image', imageRouter)

export default mainRouter