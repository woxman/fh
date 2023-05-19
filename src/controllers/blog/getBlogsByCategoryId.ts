
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import blogService from "../../db/models/blog/blog.service"

const getBlogsByCategoryId = async (req: Request, res: Response) => {

  const queryValidationSchema = yup.object().shape({
    limit: yup.string(),
    skip: yup.string(),
    sortBy: yup.string().oneOf(["title", "view", "author", "createdAt", "updatedAt"]),
    sortOrder: yup.string().oneOf(['asc', 'desc']),
    search: yup.string(),
  })
  
	const handle = async () => {
    const { categoryId } = req.params
    const { limit, skip, sortBy, sortOrder, search } = req.query

    const options = {
      limit: limit ? Number(limit) : undefined,
      skip: skip ? Number(skip) : undefined,
      sortBy: sortBy?.toString(),
      sortOrder: sortOrder?.toString(),
      search: search?.toString()
    }

		return await blogService.getBlogsByCategoryId(categoryId, options)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, queryValidationSchema, handle, extractOutput })
}

export default getBlogsByCategoryId
