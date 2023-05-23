import { Request, Response } from 'express'

import { handleRequest } from '../../helper'
import siteInfoService from "../../../db/models/siteInfo/siteInfoMainPage.service"

const getGalleryStep = async (req: Request, res: Response) => {
	const handle = async () => {
    const { galleryStepId } = req.params

		return await siteInfoService.getGalleryStep(galleryStepId)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, handle, extractOutput })
}

export default getGalleryStep
