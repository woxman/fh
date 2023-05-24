import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import subcategoryService from "../../db/models/subcategory/subcategory.service"

const editSubcategory = async (req: Request, res: Response) => {

  const validationSchema = yup.object().shape({
    updates: yup.object({
      name: yup.string(),
      urlSlug: yup.string(),
      code: yup.string(),
      description: yup.string(),
      properties: yup.array().of(yup.object({
        property: yup.string().length(24),
        order: yup.number()
      })) 
    }).required()
  })

	const handle = async () => {
    const { subcategoryId } = req.params
    const allowedUpdates = ['name', 'description','code', 'urlSlug', 'properties']
    const updates: { [key: string]: any } = {}

    Object.keys(req.body.updates || {}).forEach((update) => {
      if(allowedUpdates.includes(update)) {
        if(['name', 'urlSlug'].includes(update)) {
          updates[update] = req.body.updates[update].trim()
        } else {
          updates[update] = req.body.updates[update]
        }
      }
    })

		return await subcategoryService.editSubcategory(subcategoryId, updates)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default editSubcategory
