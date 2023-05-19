import SiteInfo from "./siteInfo"
import Category from "../category/category"
import imageService from "../image/image.service"
import { IResponse } from "../../../controllers/helper"
import { statusCodes, errorMessages, websiteName } from "../../../utils/constants"
import mongoose, { ObjectId as objectId } from "mongoose"

const ObjectId = mongoose.Types.ObjectId

const updatePageContent = async (
  newPageContent: {
    email: string
    phone: string
    address: string
    workHours: string
    image: string | {
      format: string
      data: Buffer
    }
  }
): Promise<IResponse> => {

  try {
    let { email, phone, address, workHours, image } = newPageContent

    const siteInfo = await SiteInfo.findOne({ websiteName }).exec()

    const existingImage = siteInfo?.contactUs.pageContent.image

    // checking image
    if(typeof(image) !== "string") {

      // storing new image
      const result = await imageService.storeImage(image.format, image.data)

      if(result.success && result.imageUrl) {
        // changing value of image to new value
        image = result.imageUrl
      } else {
        return {
          success: false,
          error: {
            message: errorMessages.shared.ise,
            statusCode: statusCodes.ise
          }
        }
      }

      // deleting old image
      if(existingImage) {
        await imageService.deleteImage(existingImage)
      }
      
    } else {
      if(existingImage !== image) {
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
        'contactUs.pageContent': {
          email,
          phone,
          address,
          workHours,
          image
        }
      }
    }

    const updatedSiteInfo = await SiteInfo.findOneAndUpdate({ websiteName }, update, { new: true })

    const updatedPageContent = updatedSiteInfo?.contactUs.pageContent

    return {
      success: true,
      outputs: {
        pageContent: updatedPageContent
      }
    }

  } catch(error) {
    console.log('Error while updating contact us page content: ', error)

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

const getPageContent = async (): Promise<IResponse> => {
  try {
    const siteInfo = await SiteInfo.findOne({ websiteName }).exec()

    return {
      success: true,
      outputs: {
        pageContent: siteInfo?.contactUs.pageContent
      }
    }

  } catch(error) {
    console.log('Error while getting contact us page content: ', error)

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

const addQuestionAndAnswer = async (
  newQuestionAndAnswer: {
    question: string,
    answer: string,
  }
): Promise<IResponse> => {

  try {
    const { question, answer } = newQuestionAndAnswer

    // checking title availability
    const filter = {
      websiteName,
      'contactUs.questionAndAnswers.question': question
    }

    const existingQuestionAndAnswer = await SiteInfo.findOne(filter).exec()

    if(existingQuestionAndAnswer) {
      return {
        success: false,
        error: {
          message: errorMessages.siteInfo.questionIsRepetitious,
          statusCode: statusCodes.badRequest
        }
      }
    }

    const update = { 
      $push: { 
        'contactUs.questionAndAnswers': {
          question,
          answer,
        }
      }
    }

    const updatedSiteInfo = await SiteInfo.findOneAndUpdate({ websiteName }, update, { new: true })

    const addedQuestionAndAnswer = updatedSiteInfo?.contactUs.questionAndAnswers.find((questionAndAnswer) => {
      return questionAndAnswer.question == question
    })

    return {
      success: true,
      outputs: {
        questionAndAnswer: addedQuestionAndAnswer
      }
    }

  } catch(error) {
    console.log('Error while adding questionAndAnswer: ', error)

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

const getQuestionAndAnswer = async (questionAndAnswerId: string): Promise<IResponse> => {
  try {
    const filter = {
      websiteName,
      'contactUs.questionAndAnswers._id': new ObjectId(questionAndAnswerId)
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

    const questionAndAnswer = siteInfo.contactUs.questionAndAnswers.find((questionAndAnswer) => {
      return questionAndAnswer._id.toString() == questionAndAnswerId
    })

    return {
      success: true,
      outputs: {
        questionAndAnswer
      }
    }

  } catch(error) {
    console.log('Error while getting questionAndAnswer: ', error)

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

const getQuestionAndAnswers = async (
  options: {
    limit?: number,
    skip?: number,
    sortBy?: string,
    sortOrder?: string,
    search?: string
  }
): Promise<IResponse> => {

  try {
    const { limit, skip, sortBy, sortOrder, search } = options

    const siteInfo = await SiteInfo.findOne({ websiteName }).exec()

    let questionAndAnswers = siteInfo?.contactUs.questionAndAnswers || []

    // Sort questionAndAnswers
    if(sortBy) {
      // This is for ts type error
      // Because of yup validation sortBy always has a valid value
      if(sortBy == 'question' || sortBy == 'createdAt') {
        questionAndAnswers.sort((a, b) => {
          if(a[sortBy] > b[sortBy]) {
            return sortOrder == 'desc' ? -1 : 1
  
          } else if(a[sortBy] < b[sortBy]) {
            return sortOrder == 'desc' ? 1 : -1
  
          } else {
            return 0
          }
        })
      }
    }

    if(search) {
      questionAndAnswers = questionAndAnswers.filter((questionAndAnswer) => {
        return questionAndAnswer.question.includes(search)
      })
    }

    const count = questionAndAnswers.length

    if(skip) {
      questionAndAnswers = questionAndAnswers.slice(skip)
    }

    if(limit) {
      questionAndAnswers = questionAndAnswers.slice(0, limit)
    }
    
    return {
      success: true,
      outputs: {
        questionAndAnswers,
        count
      }
    }

  } catch(error) {
    console.log('Error while getting questionAndAnswers: ', error)

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

const editQuestionAndAnswer = async (
  questionAndAnswerId: string,
  updates: {
    question?: string
    answer?: string
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
      'contactUs.questionAndAnswers._id': new ObjectId(questionAndAnswerId)
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

    if(updates.question) {
      // checking step availability

      const filter = {
        websiteName,
        'contactUs.questionAndAnswers.question': updates.question
      }

      const existingQuestionAndAnswer = await SiteInfo.findOne(filter).exec()

      if(existingQuestionAndAnswer) {
        return {
          success: false,
          error: {
            message: errorMessages.siteInfo.questionIsRepetitious,
            statusCode: statusCodes.badRequest
          }
        }
      }
    }

    const update: { [key: string]: any} = {}

    const updatesValues = Object.values(updates)

    Object.keys(updates).forEach((u, i) => {
      update[`contactUs.questionAndAnswers.$[i].${u}`] = updatesValues[i]
    })
    const arrayFilters = [{'i._id': questionAndAnswerId}]

    const updatedSiteInfo = await SiteInfo.findOneAndUpdate(filter, update, { arrayFilters, new: true }).exec()

    const updatedQuestionAndAnswer = updatedSiteInfo?.contactUs.questionAndAnswers.find((questionAndAnswer) => {
      return questionAndAnswer._id.toString() == questionAndAnswerId
    })

    return {
      success: true,
      outputs: {
        questionAndAnswer: updatedQuestionAndAnswer
      }
    }
  } catch(error) {
    console.log('Error while editing a questionAndAnswer: ', error)

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

const deleteQuestionAndAnswers = async (idList: string[]): Promise<IResponse> => {
  try {

    // deleting question and answers and their image
    for(const id of idList) {
      const update = {
        $pull: {
          'contactUs.questionAndAnswers': {
            _id: new ObjectId(id)
          }
        }
      }
      await SiteInfo.findOneAndUpdate({ websiteName }, update)
    }

    return {
      success: true
    }
  } catch(error) {
    console.log('Error while deleting questionAndAnswers: ', error)

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

const addExpert = async (
  newExpert: {
    name: string
    phone: string
    category: string
    socialNetworks: {
      name: string
      link: string
      icon: string
    }[]
    image: {
      format: string
      data: Buffer
    }
  }
): Promise<IResponse> => {
  try {
    const { name, phone, category, socialNetworks, image } = newExpert

    // checking name availability
    const nameCheckingFilter = {
      websiteName,
      'contactUs.experts.name': name
    }
    const existingExpertWithThisName = await SiteInfo.findOne(nameCheckingFilter).exec()
    if(existingExpertWithThisName) {
      return {
        success: false,
        error: {
          message: errorMessages.siteInfo.nameIsTaken,
          statusCode: statusCodes.badRequest
        }
      }
    }

    // checking category existence
    const categoryExists = await Category.findById(category).exec()
    if(!categoryExists) {
      return {
        success: false,
        error: {
          message: errorMessages.categoryService.noSuchCategory,
          statusCode: statusCodes.badRequest
        }
      }
    }

    // checking if all of social networks exist
    const siteInfo = await SiteInfo.findOne({ websiteName }).exec()
    if(siteInfo) {
      const siteInfoSocialNetworks = siteInfo.mainPage.socialNetworks
      const allSocialNetworksExist = socialNetworks.every((socialNetwork) => {
        const existingSocialNetwork = siteInfoSocialNetworks.find((s) => {
          return s.icon == socialNetwork.icon
        })
        if(existingSocialNetwork) {
          return true
        }
      })

      if(!allSocialNetworksExist) {
        return {
          success: false,
          error: {
            message: errorMessages.shared.ise,
            statusCode: statusCodes.ise
          }
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
        'contactUs.experts': {
          name,
          phone,
          category,
          socialNetworks,
          image: result.imageUrl
        }
      }
    }

    const updatedSiteInfo = await SiteInfo.findOneAndUpdate({ websiteName }, update, { new: true })
      .populate('contactUs.experts.category', '_id name').exec()

    const addedExpert = updatedSiteInfo?.contactUs.experts.find((expert) => {
      return expert.name == name
    })

    return {
      success: true,
      outputs: {
        expert: addedExpert
      }
    }

  } catch(error) {
    console.log('Error while adding expert: ', error)

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

const getExpert = async (expertId: string): Promise<IResponse> => {
  try {
    const filter = {
      websiteName,
      'contactUs.experts._id': new ObjectId(expertId)
    }
    const siteInfo = await SiteInfo.findOne(filter)
      .populate('contactUs.experts.category', '_id name').exec()

    if(!siteInfo) {
      return {
        success: false,
        error: {
          message: errorMessages.shared.notFound,
          statusCode: statusCodes.notFound
        }
      }
    }

    const expert = siteInfo.contactUs.experts.find((expert) => {
      return expert._id.toString() == expertId
    })

    return {
      success: true,
      outputs: {
        expert
      }
    }

  } catch(error) {
    console.log('Error while getting expert: ', error)

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

const getExperts = async (
  options: {
    limit?: number,
    skip?: number,
    sortBy?: string,
    sortOrder?: string,
    search?: string
  }
): Promise<IResponse> => {

  try {
    const { limit, skip, sortBy, sortOrder, search } = options

    const siteInfo = await SiteInfo.findOne({ websiteName })
      .populate('contactUs.experts.category', '_id name').exec()

    let experts = siteInfo?.contactUs.experts || []

    // Sort experts
    if(sortBy) {
      // This is for ts type error
      // Because of yup validation sortBy always has a valid value
      if(sortBy == 'name' || sortBy == 'phone' || sortBy == 'createdAt') {
        experts.sort((a, b) => {
          if(a[sortBy] > b[sortBy]) {
            return sortOrder == 'desc' ? -1 : 1
  
          } else if(a[sortBy] < b[sortBy]) {
            return sortOrder == 'desc' ? 1 : -1
  
          } else {
            return 0
          }
        })
      }
    }

    if(search) {
      experts = experts.filter((expert) => {
        return expert.name.includes(search)
      })
    }

    const count = experts.length

    if(skip) {
      experts = experts.slice(skip)
    }

    if(limit) {
      experts = experts.slice(0, limit)
    }

    return {
      success: true,
      outputs: {
        experts,
        count
      }
    }

  } catch(error) {
    console.log('Error while getting experts: ', error)
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

const getExpertsByCategoryId = async (
  categoryId: string,
  options: {
    limit?: number,
    skip?: number,
    sortBy?: string,
    sortOrder?: string,
    search?: string
  }
): Promise<IResponse> => {
  try {
    const { limit, skip, sortBy, sortOrder, search } = options

    const siteInfo = await SiteInfo.findOne({ websiteName })
      .populate('contactUs.experts.category', '_id name').exec()

    let experts = siteInfo?.contactUs.experts.filter((expert) => {
      if (expert.category && '_id' in expert.category) {
        return expert.category._id.toString() === categoryId
      } else return false
    }) || []

    // Sort experts
    if(sortBy) {
      // This is for ts type error
      // Because of yup validation sortBy always has a valid value
      if(sortBy == 'name' || sortBy == 'phone' || sortBy == 'createdAt') {
        experts.sort((a, b) => {
          if(a[sortBy] > b[sortBy]) {
            return sortOrder == 'desc' ? -1 : 1
  
          } else if(a[sortBy] < b[sortBy]) {
            return sortOrder == 'desc' ? 1 : -1
  
          } else {
            return 0
          }
        })
      }
    }

    if(search) {
      experts = experts.filter((expert) => {
        return expert.name.includes(search)
      })
    }
    if(skip) {
      experts = experts.slice(skip)
    }
    if(limit) {
      experts = experts.slice(0, limit)
    }

    const count = experts.length

    return {
      success: true,
      outputs: {
        experts,
        count
      }
    }

  } catch(error) {
    console.log('Error while getting experts by category id: ', error)

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

const editExpert = async (
  expertId: string,
  updates: {
    name?: string
    phone?: string
    category?: string
    socialNetworks?: {
      name: string
      link: string
      icon: string
    }
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
      'contactUs.experts._id': new ObjectId(expertId)
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
      // checking name availability
      const filter = {
        websiteName,
        'contactUs.experts.name': updates.name
      }
      const existingExpert = await SiteInfo.findOne(filter).exec()
      if(existingExpert) {
        return {
          success: false,
          error: {
            message: errorMessages.siteInfo.nameIsTaken,
            statusCode: statusCodes.badRequest
          }
        }
      }
    }

    if(updates.category) {
      // checking category existence
      const categoryExists = await Category.findById(updates.category).exec()
      if(!categoryExists) {
        return {
          success: false,
          error: {
            message: errorMessages.categoryService.noSuchCategory,
            statusCode: statusCodes.badRequest
          }
        }
      }
    }

    // Store new image in database
    if(updates.image) {
      const imageUrl = siteInfo.contactUs.experts.find((expert) => {
        return expert._id.toString() == expertId
      })?.image

      if(imageUrl) {
        await imageService.updateImage(imageUrl, updates.image.format, updates.image.data)
      }

      delete updates.image
    }

    const update: { [key: string]: any} = {}

    const updatesValues = Object.values(updates)

    Object.keys(updates).forEach((u, i) => {
      update[`contactUs.experts.$[i].${u}`] = updatesValues[i]
    })
    const arrayFilters = [{'i._id': expertId}]

    const updatedSiteInfo = await SiteInfo.findOneAndUpdate(filter, update, { arrayFilters, new: true })
      .populate('contactUs.experts.category', '_id name').exec()

    const updatedExpert = updatedSiteInfo?.contactUs.experts.find((expert) => {
      return expert._id.toString() == expertId
    })

    return {
      success: true,
      outputs: {
        expert: updatedExpert
      }
    }

  } catch(error) {
    console.log('Error while editing a expert: ', error)
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

const deleteExperts = async (idList: string[]): Promise<IResponse> => {
  try {

    // deleting experts and their image
    for(const id of idList) {
      const update = {
        $pull: {
          'contactUs.experts': {
            _id: new ObjectId(id)
          }
        }
      }
      const siteInfo = await SiteInfo.findOneAndUpdate({ websiteName }, update)

      const deletedExpert = siteInfo?.contactUs.experts.find((expert) => {
        return expert._id.toString() == id
      })

      if(deletedExpert) {
        await imageService.deleteImage(deletedExpert.image)
      }
    }

    return {
      success: true
    }
  } catch(error) {
    console.log('Error while deleting experts: ', error)

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
  updatePageContent,
  getPageContent,
  addQuestionAndAnswer,
  getQuestionAndAnswer,
  getQuestionAndAnswers,
  editQuestionAndAnswer,
  deleteQuestionAndAnswers,
  addExpert,
  getExpert,
  getExperts,
  getExpertsByCategoryId,
  editExpert,
  deleteExperts
}