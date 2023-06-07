import Page, { IPage } from "./page"
import imageService from "../image/image.service"
import { IResponse } from "../../../controllers/helper"
import { statusCodes, errorMessages } from "../../../utils/constants"
import { ObjectId as objectId } from "mongoose"

const addPage = async (
  newPage: {
    title: string
    summary: string
    author: string
    content: string
    show: boolean
    tags: string[]
    categorys: string[]
    cover?: {
      format: string
      data: Buffer
    }
  }
): Promise<IResponse> => {
  try {
    const { title, summary, author, content, show, tags, categorys, cover } = newPage

    // checking title availability
    const existingPage = await Page.findOne({ title }).exec()
    if(existingPage) {
      return {
        success: false,
        error: {
          message: errorMessages.pageService.titleAlreadyTaken,
          statusCode: statusCodes.badRequest
        }
      }
    }

    // Storing image in the database
    let coverUrl = null
    if(cover) {
      const result = await imageService.storeImage(cover.format, cover.data)
      if(!result.success) {
        return {
          success: false,
          error: {
            message: errorMessages.siteInfo.imageProblem,
            statusCode: statusCodes.ise
          }
        }
      }

      coverUrl = result.imageUrl
    }

    let createdPage = await Page.create({
      title,
      summary,
      author,
      content,
      show,
      tags,
      categorys,
      cover: coverUrl
    })

    return {
      success: true,
      outputs: {
        page: createdPage
      }
    }

  } catch(error) {
    console.log('Error while creating a new page: ', error)
    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//-------------------------------------------------

const getPage = async (pageId: string): Promise<IResponse> => {
  try {
    const update = {
      $inc: {
        view: 1
      }
    }
    const page = await Page.findByIdAndUpdate(pageId, update, { new: true }).exec()

    if(!page) {
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
        page
      }
    }

  } catch(error) {
    console.log('Error while getting page: ', error)
    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//-------------------------------------------------

const getPages = async (
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

    // Create and fill the query options object
    const queryOptions: { [key: string]: any } = {}
    
    if(limit) {
      queryOptions['limit'] = limit
    }
    if(skip) {
      queryOptions['skip'] = skip
    }
    if(sortBy) {
      queryOptions['sort'] = {}
      queryOptions['sort'][`${sortBy}`] = sortOrder || 'asc'
    }
    const filter: { [key: string]: any } = {}
    if(search) {
      filter.title = { $regex: search }
    }
    
    // Fetch the pages
    const count = await Page.countDocuments(filter)

    let pages = await Page.find(filter, {}, queryOptions).exec()

    return {
      success: true,
      outputs: {
        pages,
        count
      }
    }

  } catch(error) {
    console.log('Error while getting pages: ', error)
    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//-------------------------------------------------

const getPagesByCategory = async (
  categoryValue: string,
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

    // Create and fill the query options object
    const queryOptions: { [key: string]: any } = {}
    
    if(limit) {
      queryOptions['limit'] = limit
    }
    if(skip) {
      queryOptions['skip'] = skip
    }
    if(sortBy) {
      queryOptions['sort'] = {}
      queryOptions['sort'][`${sortBy}`] = sortOrder || 'asc'
    }
    const filter: { [key: string]: any } = { categorys: categoryValue }
    if(search) {
      filter.title = { $regex: search }
    }
    
    // Fetch the pages
    const count = await Page.countDocuments(filter)
    let pages = await Page.find(filter, {}, queryOptions).exec()

    return {
      success: true,
      outputs: {
        pages,
        count
      }
    }

  } catch(error) {
    console.log('Error while getting pages: ', error)
    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//-------------------------------------------------

const getPagesByTag = async (
  tagValue: string,
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

    // Create and fill the query options object
    const queryOptions: { [key: string]: any } = {}
    
    if(limit) {
      queryOptions['limit'] = limit
    }
    if(skip) {
      queryOptions['skip'] = skip
    }
    if(sortBy) {
      queryOptions['sort'] = {}
      queryOptions['sort'][`${sortBy}`] = sortOrder || 'asc'
    }
    const filter: { [key: string]: any } = { tags: tagValue }
    if(search) {
      filter.title = { $regex: search }
    }
    
    // Fetch the pages
    const count = await Page.countDocuments(filter)
    let pages = await Page.find(filter, {}, queryOptions).exec()

    return {
      success: true,
      outputs: {
        pages,
        count
      }
    }

  } catch(error) {
    console.log('Error while getting pages: ', error)
    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//-------------------------------------------------

const editPage = async (
  pageId: string,
  updates: {
    title?: string
    summary?: string
    author?: string
    content?: string
    show?: boolean
    tags?: string[]
    categorys?: string[]
    cover?: {
      format: string
      data: Buffer
    }
  }
): Promise<IResponse> => {
  try {
    // checking adminUpdates object to not be empty
    if(Object.keys(updates).length == 0) {
      return {
        success: false,
        error: {
          message: errorMessages.shared.noChanges,
          statusCode: statusCodes.badRequest
        }
      }
    }
    const page = await Page.findById(pageId).exec()

    if(!page) {
      return {
        success: false,
        error: {
          message: errorMessages.shared.notFound,
          statusCode: statusCodes.notFound
        }
      }
    }

    // checking title availability
    if(updates.title) {
      const existingPage = await Page.findOne({ title: updates.title }).exec()

      if(existingPage) {
        return {
          success: false,
          error: {
            message: errorMessages.pageService.titleAlreadyTaken,
            statusCode: statusCodes.badRequest
          }
        }
      }
    }

    // Store new image in database
    if(updates.cover) {
      await imageService.updateImage(page.cover, updates.cover.format, updates.cover.data)
      delete updates.cover
    }
    
    const updatedPage = await Page.findByIdAndUpdate(pageId, updates, { new: true }).exec()

    /*console.log(updatedPage)*/
    return {
      success: true,
      outputs: {
        page: updatedPage
      }
    }

  } catch(error) {
    console.log('Error while editing a page: ', error)
    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//-------------------------------------------------

const deletePages = async (idList: string[]): Promise<IResponse> => {
  try {
    // deleting pages and their cover image
    for(const id of idList) {
      const page = await Page.findByIdAndDelete(id)

      if(page) {
        await imageService.deleteImage(page.cover)
      }
    }

    return {
      success: true
    }
  } catch(error) {
    console.log('Error while deleting pages: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//-------------------------------------------------

const getTags = async (): Promise<IResponse> => {
  try {
    // Fetch the pages
    const pages = await Page.find({}).exec()

    const tags: string[] = []
    pages.forEach((page) => {
      page.tags.forEach((tag) => {
        if(!tags.includes(tag)) {
          tags.push(tag)
        }
      })
    })

    return {
      success: true,
      outputs: {
        tags
      }
    }

  } catch(error) {
    console.log('Error while getting tags: ', error)
    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//-------------------------------------------------

const getCategorys = async (): Promise<IResponse> => {
  try {
    // Fetch the pages
    const pages = await Page.find({}).exec()

    const categorys: string[] = []
    pages.forEach((page) => {
      page.categorys.forEach((category) => {
        if(!categorys.includes(category)) {
          categorys.push(category)
        }
      })
    })

    return {
      success: true,
      outputs: {
        categorys
      }
    }

  } catch(error) {
    console.log('Error while getting tags: ', error)
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
  addPage,
  getPage,
  getPages,
  getPagesByCategory,
  getPagesByTag,
  editPage,
  deletePages,
  getTags,
  getCategorys
}