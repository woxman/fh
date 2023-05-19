import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../../helper'
import siteInfoService from "../../../db/models/siteInfo/siteInfoMainPage.service"
import { allowedImageFormats } from '../../../utils/constants'

const editSocialNetwork = async (req: Request, res: Response) => {
  const validationSchema = yup.object().shape({
    updates: yup.object().shape({
      name: yup.string(),
      link: yup.string(),
      show: yup.boolean(),
      icon: yup.object({
        format: yup.string().oneOf(allowedImageFormats),
        data: yup.mixed<Buffer>()
      }),
    }).required()
  })

	const handle = async () => {
    const { socialNetworkId } = req.params

    const allowedUpdates = ["name", "link", "show", "icon"]

    const socialNetworkUpdates: { [key: string]: any} = {}

    Object.keys(req.body.updates || {}).forEach((update) => {
      if(allowedUpdates.includes(update)) {

        if(["name", "link"].includes(update)) {
          socialNetworkUpdates[update] = req.body.updates[update].trim()

        } else {
          socialNetworkUpdates[update] = req.body.updates[update]
        }
      }
    })


		return await siteInfoService.editSocialNetwork(socialNetworkId, socialNetworkUpdates)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default editSocialNetwork
