
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import pageService from "../../db/models/page/page.service"

const deletePage = async (req: Request, res: Response) => {
  const validationSchema = yup.object().shape({
    idList: yup.array().of(yup.string()).required()
  })

	const handle = async () => {
    const { idList } = req.body

		return await pageService.deletePages(idList)
	}

	return handleRequest({ req, res, validationSchema, handle })
}

export default deletePage
