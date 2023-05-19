import { Router } from 'express'

import { panelMainPageRouter, websiteMainPageRouter } from "./mainPage"
import { panelAboutUsRouter, websiteAboutUsRouter } from "./aboutUs"
import { panelContactUsRouter, websiteContactUsRouter } from "./contactUs"

export const panelSiteInfoRouter = Router()
export const websiteSiteInfoRouter = Router()

panelSiteInfoRouter.use('/main-page', panelMainPageRouter)
panelSiteInfoRouter.use('/about-us', panelAboutUsRouter)
panelSiteInfoRouter.use('/contact-us', panelContactUsRouter)

websiteSiteInfoRouter.use('/main-page', websiteMainPageRouter)
websiteSiteInfoRouter.use('/about-us', websiteAboutUsRouter)
websiteSiteInfoRouter.use('/contact-us', websiteContactUsRouter)


