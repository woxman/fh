import SiteInfo from "./siteInfo"
import imageService from "../image/image.service"
import { IResponse } from "../../../controllers/helper"
import { statusCodes, errorMessages, websiteName } from "../../../utils/constants"
import mongoose, { ObjectId as objectId } from "mongoose"
import Subcategory from "../subcategory/subcategory"
import Factory from "../factory/factory"

const ObjectId = mongoose.Types.ObjectId

const updateLogo = async (
  logo: { 
    format: string,
    data: Buffer
  }
): Promise<IResponse> => {
  try {

    const result = await imageService.storeImage(logo.format, logo.data)

    if(!result.success) {
      return {
        success: false,
        error: {
          message: errorMessages.shared.ise,
          statusCode: statusCodes.ise
        }
      }
    }

    const update = { 
      $set: { 
        'mainPage.logo': result.imageUrl 
      }
    }

    const updatedSiteInfo = await SiteInfo.findOneAndUpdate({ websiteName }, update, { new: true })

    return {
      success: true,
      outputs: {
        logo: updatedSiteInfo?.mainPage.logo
      }
    }

  } catch(error) {
    console.log('Error while updating site logo: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//--------------------------------------------------------------------------------

const getLogo = async (): Promise<IResponse> => {
  try {
    const siteInfo = await SiteInfo.findOne({ websiteName }).exec()

    if(!siteInfo?.mainPage.logo) {
      return {
        success: false,
        error: {
          message: errorMessages.shared.notFound,
          statusCode: statusCodes.notFound
        }
      }
    }

    return {
      success: true,
      outputs: {
        logo: siteInfo?.mainPage.logo
      }
    }

  } catch(error) {
    console.log('Error while getting site logo: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//--------------------------------------------------------------------------------

const addSocialNetwork = async (
  newSocialNetwork: {
    name: string,
    link: string,
    show: boolean,
    icon: {
      format: string,
      data: Buffer
    }
  }
): Promise<IResponse> => {

  try {
    const { name, link, show, icon } = newSocialNetwork

    // checking name availability

    const filter = {
      websiteName,
      'mainPage.socialNetworks.name': name
    }

    const existingSocialNetwork = await SiteInfo.findOne(filter).exec()

    if(existingSocialNetwork) {
      return {
        success: false,
        error: {
          message: errorMessages.siteInfo.nameIsTaken,
          statusCode: statusCodes.badRequest
        }
      }
    }

    const result = await imageService.storeImage(icon.format, icon.data)

    if(!result.success) {
      return {
        success: false,
        error: {
          message: errorMessages.siteInfo.imageProblem,
          statusCode: statusCodes.ise
        }
      }
    }

    const update = { 
      $push: { 
        'mainPage.socialNetworks': {
          name,
          link,
          show,
          icon: result.imageUrl
        }
      }
    }

    const updatedSiteInfo = await SiteInfo.findOneAndUpdate({ websiteName }, update, { new: true })

    const addedSocialNetwork = updatedSiteInfo?.mainPage.socialNetworks.find((socialNetwork) => {
      return socialNetwork.name == name
    })

    return {
      success: true,
      outputs: {
        socialNetwork: addedSocialNetwork
      }
    }

  } catch(error) {
    console.log('Error while adding social network: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//--------------------------------------------------------------------------------

const getSocialNetworks = async (): Promise<IResponse> => {
  try {
    const siteInfo = await SiteInfo.findOne({ websiteName }).exec()

    return {
      success: true,
      outputs: {
        socialNetworks: siteInfo?.mainPage.socialNetworks
      }
    }

  } catch(error) {
    console.log('Error while getting social networks: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//--------------------------------------------------------------------------------

const getSocialNetwork = async (socialNetworkId: string): Promise<IResponse> => {
  try {
    const filter = {
      websiteName,
      'mainPage.socialNetworks._id': new ObjectId(socialNetworkId)
    }
    const siteInfo = await SiteInfo.findOne(filter).exec()

    if(!siteInfo) {
      return {
        success: false,
        error: {
          message: errorMessages.shared.notFound,
          statusCode: statusCodes.notFound
        }
      }
    }

    const socialNetwork = siteInfo.mainPage.socialNetworks.find((socialNetwork) => {
      return socialNetwork._id.toString() == socialNetworkId
    })

    return {
      success: true,
      outputs: {
        socialNetwork
      }
    }

  } catch(error) {
    console.log('Error while getting social network: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//--------------------------------------------------------------------------------

const deleteSocialNetwork = async (socialNetworkId: string): Promise<IResponse> => {
  try {
    const filter = {
      websiteName,
      'mainPage.socialNetworks._id': new ObjectId(socialNetworkId)
    }

    const update = {
      $pull: { 'mainPage.socialNetworks': { _id: new ObjectId(socialNetworkId) }}
    }
    const siteInfo = await SiteInfo.findOneAndUpdate(filter, update).exec()

    const imageUrl = siteInfo?.mainPage.socialNetworks.find((socialNetwork) => {
      return socialNetwork._id.toString() == socialNetworkId
    })?.icon

    if(imageUrl) {
      await imageService.deleteImage(imageUrl)

      // delete social network from experts that have this social network
      const siteInfo = await SiteInfo.findOne({ websiteName }).exec()
      if(!siteInfo) {
        return {
          success: true
        }
      }
      const experts = siteInfo.contactUs.experts

      experts.forEach((expert, index) => {
        experts[index].socialNetworks = experts[index].socialNetworks.filter((socialNetwork) => {
          return socialNetwork.icon != imageUrl
        })
      })
      const update = {
        'contactUs.experts': experts
      }
      await SiteInfo.findOneAndUpdate({ websiteName }, update).exec()
    }

    return {
      success: true
    }

  } catch(error) {
    console.log('Error while deleting social network: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//--------------------------------------------------------------------------------

const editSocialNetwork = async (
  socialNetworkId: string,
  updates: {
    name?: string
    link?: string
    show?: boolean
    icon?: {
      format: string
      data: Buffer
    }
  }
): Promise<IResponse> => {

  try {

    if(Object.keys(updates).length == 0) {
      return {
        success: false,
        error: {
          message: errorMessages.shared.noChanges,
          statusCode: statusCodes.badRequest
        }
      }
    }

    const filter = {
      websiteName,
      'mainPage.socialNetworks._id': new ObjectId(socialNetworkId)
    }

    const siteInfo = await SiteInfo.findOne(filter).exec()

    if(!siteInfo) {
      return {
        success: false,
        error: {
          message: errorMessages.shared.notFound,
          statusCode: statusCodes.notFound
        }
      }
    }

    if(updates.name) {
      // checking step availability

      const filter = {
        websiteName,
        'mainPage.socialNetworks.name': updates.name
      }

      const existingSocialNetwork = await SiteInfo.findOne(filter).exec()

      if(existingSocialNetwork) {
        return {
          success: false,
          error: {
            message: errorMessages.siteInfo.nameIsTaken,
            statusCode: statusCodes.badRequest
          }
        }
      }
    }

    // Store new image in database
    if(updates.icon) {
      const iconUrl = siteInfo.mainPage.socialNetworks.find((socialNetwork) => {
        return socialNetwork._id.toString() == socialNetworkId
      })?.icon

      if(iconUrl) {
        await imageService.updateImage(iconUrl, updates.icon.format, updates.icon.data)
      }

      delete updates.icon
    }

    const update: { [key: string]: any} = {}

    const updatesValues = Object.values(updates)

    Object.keys(updates).forEach((u, i) => {
      update[`mainPage.socialNetworks.$[i].${u}`] = updatesValues[i]
    })
    const arrayFilters = [{'i._id': socialNetworkId}]

    const updatedSiteInfo = await SiteInfo.findOneAndUpdate(filter, update, { arrayFilters, new: true }).exec()

    const updatedSocialNetwork = updatedSiteInfo?.mainPage.socialNetworks.find((socialNetwork) => {
      return socialNetwork._id.toString() == socialNetworkId
    })

    return {
      success: true,
      outputs: {
        socialNetwork: updatedSocialNetwork
      }
    }
  } catch(error) {
    console.log('Error while editing a social network: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//--------------------------------------------------------------------------------

const addOrderStep = async (
  newOrderStep: {
    step: number
    title: string
    description: string
    image: {
      format: string
      data: Buffer
    }
  }
): Promise<IResponse> => {

  try {
    const { step, title, description, image } = newOrderStep

    // checking step availability
    const filter = {
      websiteName,
      'mainPage.orderSteps.step': step
    }

    const existingOrderStep = await SiteInfo.findOne(filter).exec()

    if(existingOrderStep) {
      return {
        success: false,
        error: {
          message: errorMessages.siteInfo.stepExists,
          statusCode: statusCodes.badRequest
        }
      }
    }

    const result = await imageService.storeImage(image.format, image.data)

    if(!result.success) {
      return {
        success: false,
        error: {
          message: errorMessages.siteInfo.imageProblem,
          statusCode: statusCodes.ise
        }
      }
    }

    const update = { 
      $push: { 
        'mainPage.orderSteps': {
          step,
          title,
          description,
          image: result.imageUrl
        }
      }
    }

    const updatedSiteInfo = await SiteInfo.findOneAndUpdate({ websiteName }, update, { new: true })

    const addedOrderStep = updatedSiteInfo?.mainPage.orderSteps.find((orderStep) => {
      return orderStep.step == step
    })

    return {
      success: true,
      outputs: {
        orderStep: addedOrderStep
      }
    }

  } catch(error) {
    console.log('Error while adding order step: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------

const addGalleryStep = async (
  newOrderStep: {
    step: number
    link: string
    which: string
    image: {
      format: string
      data: Buffer
    }
  }
): Promise<IResponse> => {

  try {
    const { step, link, which, image } = newOrderStep

    // checking step availability
    const filter = {
      websiteName,
      'mainPage.gallerySteps.step': step
    }

    const existingGalleryStep = await SiteInfo.findOne(filter).exec()

    if(existingGalleryStep) {
      return {
        success: false,
        error: {
          message: errorMessages.siteInfo.stepExists,
          statusCode: statusCodes.badRequest
        }
      }
    }

    const result = await imageService.storeImage(image.format, image.data)

    if(!result.success) {
      return {
        success: false,
        error: {
          message: errorMessages.siteInfo.imageProblem,
          statusCode: statusCodes.ise
        }
      }
    }

    const update = { 
      $push: { 
        'mainPage.gallerySteps': {
          step,
          link,
          which,
          image: result.imageUrl
        }
      }
    }

    const updatedSiteInfo = await SiteInfo.findOneAndUpdate({ websiteName }, update, { new: true })

    const addedGalleryStep = updatedSiteInfo?.mainPage.gallerySteps.find((galleryStep) => {
      return galleryStep.step == step
    })

    return {
      success: true,
      outputs: {
        galleryStep: addedGalleryStep
      }
    }
  } catch(error) {
    console.log('Error while adding order step: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}
//--------------------------------------------------------------------------------

const getOrderSteps = async (): Promise<IResponse> => {
  try {
    const siteInfo = await SiteInfo.findOne({ websiteName }).exec()

    return {
      success: true,
      outputs: {
        orderSteps: siteInfo?.mainPage.orderSteps
      }
    }

  } catch(error) {
    console.log('Error while getting order steps: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------

const getGallerySteps = async (): Promise<IResponse> => {
  try {
    const siteInfo = await SiteInfo.findOne({ websiteName }).exec()

    return {
      success: true,
      outputs: {
        gallerySteps: siteInfo?.mainPage.gallerySteps
      }
    }

  } catch(error) {
    console.log('Error while getting order steps: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//--------------------------------------------------------------------------------

const getOrderStep = async (orderStepId: string): Promise<IResponse> => {
  try {
    const filter = {
      websiteName,
      'mainPage.orderSteps._id': new ObjectId(orderStepId)
    }
    const siteInfo = await SiteInfo.findOne(filter).exec()

    if(!siteInfo) {
      return {
        success: false,
        error: {
          message: errorMessages.shared.notFound,
          statusCode: statusCodes.notFound
        }
      }
    }

    const orderStep = siteInfo.mainPage.orderSteps.find((orderStep) => {
      return orderStep._id.toString() == orderStepId
    })

    return {
      success: true,
      outputs: {
        orderStep
      }
    }

  } catch(error) {
    console.log('Error while getting order step: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------

const getGalleryStep = async (galleryStepId: string): Promise<IResponse> => {
  try {
    const filter = {
      websiteName,
      'mainPage.gallerySteps._id': new ObjectId(galleryStepId)
    }
    const siteInfo = await SiteInfo.findOne(filter).exec()

    if(!siteInfo) {
      return {
        success: false,
        error: {
          message: errorMessages.shared.notFound,
          statusCode: statusCodes.notFound
        }
      }
    }

    const galleryStep = siteInfo.mainPage.gallerySteps.find((galleryStep) => {
      return galleryStep._id.toString() == galleryStepId
    })

    return {
      success: true,
      outputs: {
        galleryStep
      }
    }

  } catch(error) {
    console.log('Error while getting order step: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//--------------------------------------------------------------------------------

const deleteOrderStep = async (orderStepId: string): Promise<IResponse> => {
  try {
    const filter = {
      websiteName,
      'mainPage.orderSteps._id': new ObjectId(orderStepId)
    }

    const update = {
      $pull: { 'mainPage.orderSteps': { _id: new ObjectId(orderStepId) }}
    }
    const siteInfo = await SiteInfo.findOneAndUpdate(filter, update).exec()

    const imageUrl = siteInfo?.mainPage.orderSteps.find((orderStep) => {
      return orderStep._id.toString() == orderStepId
    })?.image

    if(imageUrl) {
      await imageService.deleteImage(imageUrl)
    }

    return {
      success: true
    }

  } catch(error) {
    console.log('Error while deleting order step: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//--------------------------------------------------------------------------------

const editOrderStep = async (
  orderStepId: string,
  updates: {
    step?: number
    title?: string
    description?: string
    image?: {
      format: string
      data: Buffer
    }
  }
): Promise<IResponse> => {

  try {
    if(Object.keys(updates).length == 0) {
      return {
        success: false,
        error: {
          message: errorMessages.shared.noChanges,
          statusCode: statusCodes.badRequest
        }
      }
    }

    const filter = {
      websiteName,
      'mainPage.orderSteps._id': new ObjectId(orderStepId)
    }

    const siteInfo = await SiteInfo.findOne(filter).exec()

    if(!siteInfo) {
      return {
        success: false,
        error: {
          message: errorMessages.shared.notFound,
          statusCode: statusCodes.notFound
        }
      }
    }

    if(updates.step) {
      // checking step availability

      const filter = {
        websiteName,
        'mainPage.orderSteps.step': updates.step
      }

      const existingOrderStep = await SiteInfo.findOne(filter).exec()

      if(existingOrderStep) {
        return {
          success: false,
          error: {
            message: errorMessages.siteInfo.stepExists,
            statusCode: statusCodes.badRequest
          }
        }
      }
    }

    // Store new image in database
    if(updates.image) {
      const imageUrl = siteInfo.mainPage.orderSteps.find((orderStep) => {
        return orderStep._id.toString() == orderStepId
      })?.image

      if(imageUrl) {
        await imageService.updateImage(imageUrl, updates.image.format, updates.image.data)
      }

      delete updates.image
    }

    const update: { [key: string]: any} = {}

    const updatesValues = Object.values(updates)

    Object.keys(updates).forEach((u, i) => {
      update[`mainPage.orderSteps.$[i].${u}`] = updatesValues[i]
    })

    const arrayFilters = [{'i._id': orderStepId}]

    const updatedSiteInfo = await SiteInfo.findOneAndUpdate(filter, update, { arrayFilters, new: true }).exec()

    const updatedOrderStep = updatedSiteInfo?.mainPage.orderSteps.find((orderStep) => {
      return orderStep._id.toString() == orderStepId
    })

    return {
      success: true,
      outputs: {
        orderStep: updatedOrderStep
      }
    }
  } catch(error) {
    console.log('Error while editing an order step: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//--------------------------------------------------------------------------------

const updateFooter = async (
  newFooter: {
    content: string
    email: string
    phone: string
    address: string
    workHours: string
    images: Array<string | {
      format: string,
      data: Buffer
    }>
  }
): Promise<IResponse> => {

  try {
    const { content, email, phone, address, workHours, images } = newFooter

    const siteInfo = await SiteInfo.findOne({ websiteName }).exec()

    const existingImages = siteInfo?.mainPage.footer.images || []

    const updatedImages = []

    // deleting images that no longer exist
    for(let image of existingImages) {
      if(!images.includes(image)) {
        await imageService.deleteImage(image)
      }
    }

    // storing new images
    for(let image of images) {
      if(typeof(image) !== "string") {
        const result = await imageService.storeImage(image.format, image.data)

        if(result.success && result.imageUrl) {
          updatedImages.push(result.imageUrl)
        } else {
          return {
            success: false,
            error: {
              message: errorMessages.shared.ise,
              statusCode: statusCodes.ise
            }
          }
        }
      } else {
        if(existingImages.includes(image)) {
          updatedImages.push(image)
        }
      }
    }

    const update = { 
      $set: { 
        'mainPage.footer': {
          content,
          email,
          phone,
          address,
          workHours,
          images: updatedImages
        }
      }
    }

    const updatedSiteInfo = await SiteInfo.findOneAndUpdate({ websiteName }, update, { new: true })

    const updatedFooter = updatedSiteInfo?.mainPage.footer

    return {
      success: true,
      outputs: {
        footer: updatedFooter
      }
    }

  } catch(error) {
    console.log('Error while updating footer: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//--------------------------------------------------------------------------------

const getFooter = async (): Promise<IResponse> => {
  try {
    const siteInfo = await SiteInfo.findOne({ websiteName }).exec()

    return {
      success: true,
      outputs: {
        footer: siteInfo?.mainPage.footer
      }
    }

  } catch(error) {
    console.log('Error while getting footer: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//--------------------------------------------------------------------------------

const updateNewsAndBanner = async (
  newsAndBanner: {
    news: string
    banner: string | {
      format: string,
      data: Buffer
    }
  }
): Promise<IResponse> => {

  try {
    let { news, banner } = newsAndBanner

    const siteInfo = await SiteInfo.findOne({ websiteName }).exec()

    const existingBanner = siteInfo?.mainPage.newsAndBanner.banner

    if(typeof(banner) !== "string") {

      // storing new banner
      const result = await imageService.storeImage(banner.format, banner.data)

      if(result.success && result.imageUrl) {
        banner = result.imageUrl
      } else {
        return {
          success: false,
          error: {
            message: errorMessages.shared.ise,
            statusCode: statusCodes.ise
          }
        }
      }

      // deleting old banner
      if(existingBanner) {
        await imageService.deleteImage(existingBanner)
      }
      
    } else {
      if(existingBanner !== banner) {
        return {
          success: false,
          error: {
            message: errorMessages.siteInfo.imageMismatch,
            statusCode: statusCodes.badRequest
          }
        }
      }
    }
    

    const update = { 
      $set: { 
        'mainPage.newsAndBanner': {
          news,
          banner
        }
      }
    }

    const updatedSiteInfo = await SiteInfo.findOneAndUpdate({ websiteName }, update, { new: true })

    const updatedNewsAndBanner = updatedSiteInfo?.mainPage.newsAndBanner

    return {
      success: true,
      outputs: {
        newsAndBanner: updatedNewsAndBanner
      }
    }

  } catch(error) {
    console.log('Error while updating newsAndBanner: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//--------------------------------------------------------------------------------

const getNewsAndBanner = async (): Promise<IResponse> => {
  try {
    const siteInfo = await SiteInfo.findOne({ websiteName }).exec()

    return {
      success: true,
      outputs: {
        newsAndBanner: siteInfo?.mainPage.newsAndBanner
      }
    }

  } catch(error) {
    console.log('Error while getting newsAndBanner: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//--------------------------------------------------------------------------------

const updateSpecialProducts = async (
  specialProducts: {
    subcategory: string
    factory: string
    products: string[]
  }[]
): Promise<IResponse> => {

  try {
    const siteInfo = await SiteInfo.findOne({ websiteName }).exec()

    for (const specialProduct of specialProducts) {
      // Check if the subcategory exists
      const subcategory = await Subcategory.findById(specialProduct.subcategory)
        .populate('products', '_id factory').exec()
        
      if(!subcategory) {
        return {
          success: false,
          error: {
            statusCode: statusCodes.notFound,
            message: errorMessages.subcategoryService.noSuchSubcategory
          }
        }
      }

      // Check if the factory exists
      const factory = await Factory.findById(specialProduct.factory).exec()
      if(!factory) {
        return {
          success: false,
          error: {
            statusCode: statusCodes.notFound,
            message: errorMessages.factoryService.noSuchFactory
          }
        }
      }

      const productsExist = specialProduct.products.every((product) => {
        const existingProduct = subcategory.products.find((subcategoryProduct) => {
          if(subcategoryProduct._id.toString() == product && subcategoryProduct.factory.toString() == specialProduct.factory) {
            return true
          }
        })
        if(existingProduct) {
          return true
        }
      })

      if(!productsExist) {
        return {
          success: false,
          error: {
            statusCode: statusCodes.notFound,
            message: errorMessages.orderService.notAllProductsExist
          }
        }
      }
    }

    const update = { 
      $set: { 
        'mainPage.specialProducts': specialProducts
      }
    }

    const updatedSiteInfo = await SiteInfo.findOneAndUpdate({ websiteName }, update, { new: true })
      .populate('mainPage.specialProducts.subcategory', '_id name')
      .populate('mainPage.specialProducts.factory', '_id name')
      .populate('mainPage.specialProducts.products', '_id name').exec()

    const updatedSpecialProducts = updatedSiteInfo?.mainPage.specialProducts

    return {
      success: true,
      outputs: {
        specialProducts: updatedSpecialProducts
      }
    }

  } catch(error) {
    console.log('Error while updating special products: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//--------------------------------------------------------------------------------

const getSpecialProducts = async (): Promise<IResponse> => {
  try {
    const siteInfo = await SiteInfo.findOne({ websiteName })
      .populate('mainPage.specialProducts.subcategory', '_id name')
      .populate('mainPage.specialProducts.factory', '_id name')
      .populate('mainPage.specialProducts.products', '_id name priceHistory').exec()

    return {
      success: true,
      outputs: {
        specialProducts: siteInfo?.mainPage.specialProducts
      }
    }

  } catch(error) {
    console.log('Error while getting specialProducts: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

export default {
  updateLogo,
  getLogo,
  addSocialNetwork,
  getSocialNetwork,
  getSocialNetworks,
  deleteSocialNetwork,
  editSocialNetwork,
  addOrderStep,
  addGalleryStep,
  getOrderSteps,
  getGallerySteps,
  getOrderStep,
  getGalleryStep,
  deleteOrderStep,
  editOrderStep,
  updateFooter,
  getFooter,
  updateNewsAndBanner,
  getNewsAndBanner,
  updateSpecialProducts,
  getSpecialProducts
}