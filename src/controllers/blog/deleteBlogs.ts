
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import blogService from "../../db/models/blog/blog.service"

const deleteBlog = async (req: Request, res: Response) => {
  const validationSchema = yup.object().shape({
    idList: yup.array().of(yup.string()).required()
  })

	const handle = async () => {
    const { idList } = req.body

		return await blogService.deleteBlogs(idList)
	}

	return handleRequest({ req, res, validationSchema, handle })
}

export default deleteBlog
