import { Request, Response } from "express"
import  yup from "yup"

import { statusCodes } from '../utils/constants'

export interface IResponse {
  success: boolean,
  outputs?: object,
  error?: {
    message: string,
    statusCode: number
  }
}

interface IHandleRequestOptions {
  req: Request,
  res: Response,
  validationSchema?: yup.AnyObjectSchema,
  queryValidationSchema?: yup.AnyObjectSchema,
  handle: () => Promise<IResponse>,
  extractOutput?: (outputs: object) => object,
}

export async function handleRequest({ req, res, validationSchema, handle, extractOutput, queryValidationSchema }: IHandleRequestOptions) {
	if(validationSchema) {
		try {
			validationSchema.validateSync(req.body)
		} catch(error) {
			res.status(statusCodes.ue).send({ message: (error as Error).message })
			return
		}
	}
	if(queryValidationSchema) {
		try {
			queryValidationSchema.validateSync(req.query)
		} catch(error) {
			res.status(statusCodes.ue).send({ message: (error as Error).message })
			return
		}
	}
	try {
		const result = await handle()
		if(!result.success) {
			res.status(result.error?.statusCode || statusCodes.ise).send({ message: result.error?.message })
			return
		} else {
			if(extractOutput && result.outputs) {
				res.status(statusCodes.ok).send(extractOutput(result.outputs))
			} else {
				res.sendStatus(statusCodes.ok)
			}
		}
	} catch(error) {
		console.error('Error in handling controller: ', error)
		res.sendStatus(statusCodes.ise)
		return
	}
}
