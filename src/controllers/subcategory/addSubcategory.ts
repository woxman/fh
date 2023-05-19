
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import subcategoryService from "../../db/models/subcategory/subcategory.service"

const addSubcategory = async (req: Request, res: Response) => {
  
  const validationSchema = yup.object().shape({
    name: yup.string().required(),
    urlSlug: yup.string().required(),
    description: yup.string().required(),
    properties: yup.array().of(yup.object({
      property: yup.string().length(24),
      order: yup.number()
    }))
  })

	const handle = async () => {
    const { name, urlSlug, properties, description } = req.body
    const { categoryId } = req.params

    const newSubcategory = {
      name: name.trim(),
      urlSlug: urlSlug.trim(),
      properties,
      description
    }

		return await subcategoryService.addSubcategory(categoryId, newSubcategory)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default addSubcategory
