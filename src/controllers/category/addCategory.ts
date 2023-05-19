
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import categoryService from "../../db/models/category/category.service"
import { allowedImageFormats } from '../../utils/constants'

const addCategory = async (req: Request, res: Response) => {
  
  const validationSchema = yup.object().shape({
    name: yup.string().required(),
    urlSlug: yup.string().required(),
    description: yup.string().required(),
    icon: yup.object({
      data: yup.mixed<Buffer>().required(),
      format: yup.string().oneOf(allowedImageFormats).required()
    }).required()
  })

	const handle = async () => {
    const { name, urlSlug, description, icon } = req.body

    const newCategory = {
      name: name.trim(),
      urlSlug: urlSlug.trim(),
      description,
      icon
    }

		return await categoryService.addCategory(newCategory)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default addCategory
