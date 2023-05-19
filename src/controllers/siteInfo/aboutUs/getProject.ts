import { Request, Response } from 'express'

import { handleRequest } from '../../helper'
import siteInfoService from "../../../db/models/siteInfo/siteInfoAboutUs.service"

const getProject = async (req: Request, res: Response) => {
	const handle = async () => {
    const { projectId } = req.params

		return await siteInfoService.getProject(projectId)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, handle, extractOutput })
}

export default getProject
