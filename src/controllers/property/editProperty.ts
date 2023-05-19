
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import propertyService from "../../db/models/property/property.service"

const editProperty = async (req: Request, res: Response) => {
  
  const validationSchema = yup.object().shape({
    updates: yup.object({
      name: yup.string(),
      values: yup.array().of(yup.string())
    }).required()
  })

	const handle = async () => {
    const { propertyId } = req.params

    const allowedUpdates = ['name', 'values']
    const updates: { [key: string]: any } = {}

    Object.keys(req.body.updates || {}).forEach((update) => {
      if(allowedUpdates.includes(update)) {
        if(['name'].includes(update)) {
          updates[update] = req.body.updates[update].trim()

        } else {
          updates[update] = req.body.updates[update]
        }
      }
    })

		return await propertyService.editProperty(propertyId, updates)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default editProperty
