
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import pageService from "../../db/models/page/page.service"

const getPage = async (req: Request, res: Response) => {
	const handle = async () => {
    const { pageId } = req.params

		return await pageService.getPage(pageId)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, handle, extractOutput })
}

export default getPage
