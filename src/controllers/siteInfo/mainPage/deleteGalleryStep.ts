import { Request, Response } from 'express'

import { handleRequest } from '../../helper'
import siteInfoService from "../../../db/models/siteInfo/siteInfoMainPage.service"

const deleteGalleryStep = async (req: Request, res: Response) => {
	const handle = async () => {
    const { galleryStepId } = req.params

		return await siteInfoService.deleteGalleryStep(galleryStepId)
	}

	return handleRequest({ req, res, handle })
}

export default deleteGalleryStep
