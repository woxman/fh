import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../../helper'
import siteInfoService from "../../../db/models/siteInfo/siteInfoContactUs.service"

const editQuestionAndAnswer = async (req: Request, res: Response) => {
  const validationSchema = yup.object().shape({
    updates: yup.object().shape({
      question: yup.string(),
      answer: yup.string()
    }).required()
  })

	const handle = async () => {
    const { questionAndAnswerId } = req.params

    const allowedUpdates = ["question", "answer"]

    const questionAndAnswerUpdates: { [key: string]: any} = {}

    Object.keys(req.body.updates || {}).forEach((update) => {
      if(allowedUpdates.includes(update)) {

        if(["question"].includes(update)) {
          questionAndAnswerUpdates[update] = req.body.updates[update].trim()

        } else {
          questionAndAnswerUpdates[update] = req.body.updates[update]
        }
      }
    })


		return await siteInfoService.editQuestionAndAnswer(questionAndAnswerId, questionAndAnswerUpdates)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default editQuestionAndAnswer
