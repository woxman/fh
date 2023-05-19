import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../../helper'
import siteInfoService from "../../../db/models/siteInfo/siteInfoMainPage.service"
import { allowedImageFormats } from '../../../utils/constants'

const editOrderStep = async (req: Request, res: Response) => {
  const validationSchema = yup.object().shape({
    updates: yup.object().shape({
      step: yup.string(),
      title: yup.string(),
      description: yup.string(),
      image: yup.object({
        format: yup.string().oneOf(allowedImageFormats),
        data: yup.mixed<Buffer>()
      }),
    }).required()
  })

	const handle = async () => {
    const { orderStepId } = req.params

    const allowedUpdates = ["step", "title", "description", "image"]

    const orderStepUpdates: { [key: string]: any} = {}

    Object.keys(req.body.updates || {}).forEach((update) => {
      if(allowedUpdates.includes(update)) {

        if(["title"].includes(update)) {
          orderStepUpdates[update] = req.body.updates[update].trim()

        } else {
          orderStepUpdates[update] = req.body.updates[update]
        }
      }
    })

		return await siteInfoService.editOrderStep(orderStepId, orderStepUpdates)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default editOrderStep
