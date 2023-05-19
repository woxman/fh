import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../../helper'
import siteInfoService from "../../../db/models/siteInfo/siteInfoContactUs.service"

const addQuestionAndAnswer = async (req: Request, res: Response) => {
  const validationSchema = yup.object().shape({
    question: yup.string().required(),
    answer: yup.string().required(),
  })

	const handle = async () => {
    const { question, answer } = req.body

    const questionAndAnswer = {
      question: question.trim(),
      answer
    }

		return await siteInfoService.addQuestionAndAnswer(questionAndAnswer)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default addQuestionAndAnswer
