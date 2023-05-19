
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import { allowedImageFormats } from '../../utils/constants'
import categoryService from "../../db/models/category/category.service"

const editCategory = async (req: Request, res: Response) => {
  
  const validationSchema = yup.object().shape({
    updates: yup.object({
      name: yup.string(),
      urlSlug: yup.string(),
      description: yup.string(),
      icon: yup.object({
        format: yup.string().oneOf(allowedImageFormats),
        data: yup.mixed<Buffer>()
      })
    }).required()
  })

	const handle = async () => {
    const { categoryId } = req.params
    
    const allowedUpdates = ['name', 'icon', 'description', 'urlSlug']
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

		return await categoryService.editCategory(categoryId, updates)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default editCategory
