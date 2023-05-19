
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import propertyService from "../../db/models/property/property.service"

const addProperty = async (req: Request, res: Response) => {
  
  const validationSchema = yup.object().shape({
    name: yup.string().required(),
    values: yup.array().of(yup.string()).required()
  })

	const handle = async () => {
    const { name, values } = req.body

    const newProperty = {
      name: name.trim(),
      values
    }

		return await propertyService.addProperty(newProperty)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default addProperty
