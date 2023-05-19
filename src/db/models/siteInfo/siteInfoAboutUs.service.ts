import SiteInfo from "./siteInfo"
import imageService from "../image/image.service"
import { IResponse } from "../../../controllers/helper"
import { statusCodes, errorMessages, websiteName } from "../../../utils/constants"
import mongoose, { ObjectId as objectId } from "mongoose"

const ObjectId = mongoose.Types.ObjectId

const updatePageContent = async (
  newPageContent: {
    title: string
    content: string
    quotation: {
      content: string
      name: string
      role: string
      image: string | {
        format: string,
        data: Buffer
      }
    }
    image: string | {
      format: string,
      data: Buffer
    }
  }
): Promise<IResponse> => {

  try {
    let { title, content, quotation, image } = newPageContent

    const siteInfo = await SiteInfo.findOne({ websiteName }).exec()

    const existingImage = siteInfo?.aboutUs.pageContent.image
    const existingQuotationImage = siteInfo?.aboutUs.pageContent.quotation.image

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

    // checking quotation image
    if(typeof(quotation.image) !== "string") {

      // storing new quotation image
      const result = await imageService.storeImage(quotation.image.format, quotation.image.data)

      if(result.success && result.imageUrl) {
        // changing value of image to new value
        quotation.image = result.imageUrl
      } else {
        return {
          success: false,
          error: {
            message: errorMessages.shared.ise,
            statusCode: statusCodes.ise
          }
        }
      }

      // deleting old quotation image
      if(existingQuotationImage) {
        await imageService.deleteImage(existingQuotationImage)
      }
      
    } else {
      if(existingQuotationImage !== quotation.image) {
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
        'aboutUs.pageContent': {
          title,
          content,
          quotation,
          image
        }
      }
    }

    const updatedSiteInfo = await SiteInfo.findOneAndUpdate({ websiteName }, update, { new: true })

    const updatedPageContent = updatedSiteInfo?.aboutUs.pageContent

    return {
      success: true,
      outputs: {
        pageContent: updatedPageContent
      }
    }

  } catch(error) {
    console.log('Error while updating about us page content: ', error)

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
        pageContent: siteInfo?.aboutUs.pageContent
      }
    }

  } catch(error) {
    console.log('Error while getting about us page content: ', error)

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

const addProject = async (
  newProject: {
    title: string,
    description: string,
    image: {
      format: string,
      data: Buffer
    }
  }
): Promise<IResponse> => {

  try {
    const { title, description, image } = newProject

    // checking title availability
    const filter = {
      websiteName,
      'aboutUs.projects.title': title
    }

    const existingProject = await SiteInfo.findOne(filter).exec()

    if(existingProject) {
      return {
        success: false,
        error: {
          message: errorMessages.siteInfo.titleIsTaken,
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
        'aboutUs.projects': {
          title,
          description,
          image: result.imageUrl
        }
      }
    }

    const updatedSiteInfo = await SiteInfo.findOneAndUpdate({ websiteName }, update, { new: true })

    const addedProject = updatedSiteInfo?.aboutUs.projects.find((project) => {
      return project.title == title
    })

    return {
      success: true,
      outputs: {
        project: addedProject
      }
    }

  } catch(error) {
    console.log('Error while adding project: ', error)

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

const getProject = async (projectId: string): Promise<IResponse> => {
  try {
    const filter = {
      websiteName,
      'aboutUs.projects._id': new ObjectId(projectId)
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

    const project = siteInfo.aboutUs.projects.find((project) => {
      return project._id.toString() == projectId
    })

    return {
      success: true,
      outputs: {
        project
      }
    }

  } catch(error) {
    console.log('Error while getting project: ', error)

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

const getProjects = async (
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

    let projects = siteInfo?.aboutUs.projects || []

    // Sort projects
    if(sortBy) {
      // This is for ts type error
      // Because of yup validation sortBy always has a valid value
      if(sortBy == 'title' || sortBy == 'createdAt') {
        projects.sort((a, b) => {
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
      projects = projects.filter((project) => {
        return project.title.includes(search)
      })
    }

    const count = projects.length

    if(skip) {
      projects = projects.slice(skip)
    }

    if(limit) {
      projects = projects.slice(0, limit)
    }
    
    return {
      success: true,
      outputs: {
        projects,
        count
      }
    }

  } catch(error) {
    console.log('Error while getting projects: ', error)

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

const editProject = async (
  projectId: string,
  updates: {
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
      'aboutUs.projects._id': new ObjectId(projectId)
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

    if(updates.title) {
      // checking step availability

      const filter = {
        websiteName,
        'aboutUs.projects.title': updates.title
      }

      const existingProject = await SiteInfo.findOne(filter).exec()

      if(existingProject) {
        return {
          success: false,
          error: {
            message: errorMessages.siteInfo.titleIsTaken,
            statusCode: statusCodes.badRequest
          }
        }
      }
    }

    // Store new image in database
    if(updates.image) {
      const imageUrl = siteInfo.aboutUs.projects.find((project) => {
        return project._id.toString() == projectId
      })?.image

      if(imageUrl) {
        await imageService.updateImage(imageUrl, updates.image.format, updates.image.data)
      }

      delete updates.image
    }

    const update: { [key: string]: any} = {}

    const updatesValues = Object.values(updates)

    Object.keys(updates).forEach((u, i) => {
      update[`aboutUs.projects.$[i].${u}`] = updatesValues[i]
    })
    const arrayFilters = [{'i._id': projectId}]

    const updatedSiteInfo = await SiteInfo.findOneAndUpdate(filter, update, { arrayFilters, new: true }).exec()

    const updatedProject = updatedSiteInfo?.aboutUs.projects.find((project) => {
      return project._id.toString() == projectId
    })

    return {
      success: true,
      outputs: {
        project: updatedProject
      }
    }
  } catch(error) {
    console.log('Error while editing a project: ', error)

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

const deleteProjects = async (idList: string[]): Promise<IResponse> => {
  try {

    // deleting projects and their image
    for(const id of idList) {
      const update = {
        $pull: {
          'aboutUs.projects': {
            _id: new ObjectId(id)
          }
        }
      }
      const siteInfo = await SiteInfo.findOneAndUpdate({ websiteName }, update)

      const deletedProject = siteInfo?.aboutUs.projects.find((project) => {
        return project._id.toString() == id
      })

      if(deletedProject) {
        await imageService.deleteImage(deletedProject.image)
      }
    }

    return {
      success: true
    }
  } catch(error) {
    console.log('Error while deleting projects: ', error)

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
  addProject,
  getProject,
  getProjects,
  editProject,
  deleteProjects
}