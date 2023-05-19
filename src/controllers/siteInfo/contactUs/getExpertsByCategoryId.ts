import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../../helper'
import siteInfoService from "../../../db/models/siteInfo/siteInfoContactUs.service"

const getExpertsByCategoryId = async (req: Request, res: Response) => {
  const queryValidationSchema = yup.object().shape({
    limit: yup.string(),
    skip: yup.string(),
    sortBy: yup.string().oneOf(["name", "phone", "category", "createdAt"]),
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

		return await siteInfoService.getExpertsByCategoryId(categoryId, options)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, handle, extractOutput, queryValidationSchema })
}

export default getExpertsByCategoryId
