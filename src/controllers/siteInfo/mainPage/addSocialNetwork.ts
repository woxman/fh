import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../../helper'
import siteInfoService from "../../../db/models/siteInfo/siteInfoMainPage.service"
import { allowedImageFormats } from '../../../utils/constants'

const addSocialNetwork = async (req: Request, res: Response) => {
  const validationSchema = yup.object().shape({
    name: yup.string().required(),
    link: yup.string().required(),
    show: yup.boolean().required(),
    icon: yup.object({
      format: yup.string().oneOf(allowedImageFormats).required(),
      data: yup.mixed<Buffer>().required()
    }),
  })

	const handle = async () => {
    const { name, link, show, icon } = req.body

    const socialNetwork = {
      name: name.trim(),
      link: link.trim(),
      show,
      icon
    }


		return await siteInfoService.addSocialNetwork(socialNetwork)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default addSocialNetwork
