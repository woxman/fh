
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import pageService from "../../db/models/page/page.service"
import { allowedImageFormats } from '../../utils/constants'

const addPage = async (req: Request, res: Response) => {
  const validationSchema = yup.object().shape({
    title: yup.string().required(),
    summary: yup.string().required(),
    author: yup.string().required(),
    content: yup.string().required(),
    show: yup.boolean().required(),
    tags: yup.array().of(yup.string()),
    categorys: yup.array().of(yup.string()),
    cover: yup.object({
      format: yup.string().oneOf(allowedImageFormats),
      data: yup.mixed<Buffer>()
    }),
  })

	const handle = async () => {
    const { title, summary, author, content, show, tags, categorys, cover } = req.body

    const newPage = {
      title: title.trim(),
      summary,
      author: author.trim(),
      content,
      show,
      tags,
      categorys,
      cover
    }

		return await pageService.addPage(newPage)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default addPage
