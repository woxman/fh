
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import blogService from "../../db/models/blog/blog.service"

const getBlog = async (req: Request, res: Response) => {
	const handle = async () => {
    const { blogId } = req.params

		return await blogService.getBlog(blogId)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, handle, extractOutput })
}

export default getBlog
