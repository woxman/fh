import { Request, Response } from 'express'
import fs from "fs"

import imageService from "../../db/models/image/image.service"
import { statusCodes } from '../../utils/constants'

const getImage = async (req: Request, res: Response) => {
  try {
    const { imageId } = req.params

    const result = await imageService.getImage(imageId)

    if(!result.success || !result.image) {
      res.sendStatus(statusCodes.notFound)
      return
    }

    const imageBuffer = result.image?.data
    const imageFormat = result.image?.format

    const fileName = `${imageId}.${imageFormat}`

    fs.writeFileSync('./' + fileName, imageBuffer)

    var options = {
      root: './',
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    }
  
    res.sendFile(fileName, options, (error) => {
      if(fs.existsSync('./' + fileName)) {
        fs.unlinkSync('./' + fileName)
      }
    })


  } catch(error) {
    console.log('Error while getting an image: ', error)
    res.sendStatus(statusCodes.ise)
  }
}

export default getImage
