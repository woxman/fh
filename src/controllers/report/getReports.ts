import * as yup from 'yup'
import { Request, Response } from 'express'

import { handleRequest } from '../helper'
import reportService from "../../db/models/report/report.service"

const getReports = async (req: Request, res: Response) => {

  const queryValidationSchema = yup.object().shape({
    limit: yup.string(),
    skip: yup.string(),
    sortBy: yup.string().oneOf(['event', 'createdAt']),
    sortOrder: yup.string().oneOf(['asc', 'desc'])
  })
  
	const handle = async () => {
    const { limit, skip, sortBy, sortOrder } = req.query
    
    const options = {
      limit: limit ? Number(limit) : undefined,
      skip: skip ? Number(skip) : undefined,
      sortBy: sortBy?.toString(),
      sortOrder: sortOrder?.toString()
    }

		return await reportService.getReports(options)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, queryValidationSchema, handle, extractOutput })
}

export default getReports
