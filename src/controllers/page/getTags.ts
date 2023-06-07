
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import pageService from "../../db/models/page/page.service"

const getTags = async (req: Request, res: Response) => {
	const handle = async () => {

		return await pageService.getTags()
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, handle, extractOutput })
}

export default getTags
