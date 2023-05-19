import Image, { IImage } from "./image"
import { ObjectId as objectId } from "mongoose"

const storeImage = async (format: string, data: Buffer): Promise<{success: boolean, imageUrl?: string}> => {
  try {
    const image = await Image.create({format, data})

    const imageUrl = `/image/${image._id.toString()}`

    return {
      success: true,
      imageUrl
    }
  } catch(error) {
    console.log('Error while storing an image: ', error)

    return {
      success: false
    }
  }
}

//----------------------------------------------------------

const getImage = async (id: string): Promise<{success: boolean, image?:IImage}> => {
  try {
    const image = await Image.findById(id).exec()

    if(!image) {
      return {
        success: false
      }
    }

    return {
      success: true,
      image
    }
  } catch(error) {
    console.log('Error while getting an image: ', error)

    return {
      success: false
    }
  }
}

//----------------------------------------------------------

const deleteImage = async (url: string): Promise<{success: boolean}> => {
  try {
    const id = url.replace('/image/', '')
    await Image.findByIdAndDelete(id).exec()

    return {
      success: true
    }
  } catch(error) {
    console.log('Error while deleting an image: ', error)

    return {
      success: false
    }
  }
}

//----------------------------------------------------------

const updateImage = async (url: string, format: string, data: Buffer): Promise<{success: boolean}> => {
  try {
    const id = url.replace('/image/', '')
    await Image.findByIdAndUpdate(id, { format, data }).exec()

    return {
      success: true
    }
  } catch(error) {
    console.log('Error while updating an image: ', error)

    return {
      success: false
    }
  }
}


//----------------------------------------------------------

export default {
  storeImage,
  getImage,
  updateImage,
  deleteImage
}