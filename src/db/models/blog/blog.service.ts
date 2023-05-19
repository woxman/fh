import Blog, { IBlog } from "./blog"
import Category from "../category/category"
import imageService from "../image/image.service"
import { IResponse } from "../../../controllers/helper"
import { statusCodes, errorMessages } from "../../../utils/constants"
import { ObjectId as objectId } from "mongoose"

const addBlog = async (
  newBlog: {
    title: string
    summary: string
    author: string
    content: string
    show: boolean
    tags: string[]
    category: string
    cover?: {
      format: string
      data: Buffer
    }
  }
): Promise<IResponse> => {
  try {
    const { title, summary, author, content, show, tags, category, cover } = newBlog

    // checking title availability
    const existingBlog = await Blog.findOne({ title }).exec()
    if(existingBlog) {
      return {
        success: false,
        error: {
          message: errorMessages.blogService.titleAlreadyTaken,
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

    let createdBlog = await Blog.create({
      title,
      summary,
      author,
      content,
      show,
      tags,
      category,
      cover: coverUrl
    })
    createdBlog = await createdBlog.populate('category', '_id name')

    return {
      success: true,
      outputs: {
        blog: createdBlog
      }
    }

  } catch(error) {
    console.log('Error while creating a new blog: ', error)
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

const getBlog = async (blogId: string): Promise<IResponse> => {
  try {
    const update = {
      $inc: {
        view: 1
      }
    }
    const blog = await Blog.findByIdAndUpdate(blogId, update, { new: true })
      .populate('category', '_id name').exec()

    if(!blog) {
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
        blog
      }
    }

  } catch(error) {
    console.log('Error while getting blog: ', error)
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

const getBlogs = async (
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
    
    // Fetch the blogs
    const count = await Blog.countDocuments(filter)

    let blogs = await Blog.find(filter, {}, queryOptions)
      .populate('category', '_id name').exec()

    return {
      success: true,
      outputs: {
        blogs,
        count
      }
    }

  } catch(error) {
    console.log('Error while getting blogs: ', error)
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

const getBlogsByCategoryId = async (
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
    const filter: { [key: string]: any } = { category: categoryId }
    if(search) {
      filter.title = { $regex: search }
    }
    
    // Fetch the blogs
    const count = await Blog.countDocuments(filter)
    let blogs = await Blog.find(filter, {}, queryOptions)
      .populate('category', '_id name').exec()

    return {
      success: true,
      outputs: {
        blogs,
        count
      }
    }

  } catch(error) {
    console.log('Error while getting blogs: ', error)
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

const getBlogsByTag = async (
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
    
    // Fetch the blogs
    const count = await Blog.countDocuments(filter)
    let blogs = await Blog.find(filter, {}, queryOptions)
      .populate('category', '_id name').exec()

    return {
      success: true,
      outputs: {
        blogs,
        count
      }
    }

  } catch(error) {
    console.log('Error while getting blogs: ', error)
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

const editBlog = async (
  blogId: string,
  updates: {
    title?: string
    summary?: string
    author?: string
    content?: string
    show?: boolean
    tags?: string[]
    category?: string
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
    const blog = await Blog.findById(blogId).exec()

    if(!blog) {
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
      const existingBlog = await Blog.findOne({ title: updates.title }).exec()

      if(existingBlog) {
        return {
          success: false,
          error: {
            message: errorMessages.blogService.titleAlreadyTaken,
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
    if(updates.cover) {
      await imageService.updateImage(blog.cover, updates.cover.format, updates.cover.data)
      delete updates.cover
    }
    
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, updates, { new: true })
      .populate('category', '_id name').exec()

    console.log(updatedBlog)
    return {
      success: true,
      outputs: {
        blog: updatedBlog
      }
    }

  } catch(error) {
    console.log('Error while editing a blog: ', error)
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

const deleteBlogs = async (idList: string[]): Promise<IResponse> => {
  try {
    // deleting blogs and their cover image
    for(const id of idList) {
      const blog = await Blog.findByIdAndDelete(id)

      if(blog) {
        await imageService.deleteImage(blog.cover)
      }
    }

    return {
      success: true
    }
  } catch(error) {
    console.log('Error while deleting blogs: ', error)

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
    // Fetch the blogs
    const blogs = await Blog.find({}).exec()

    const tags: string[] = []
    blogs.forEach((blog) => {
      blog.tags.forEach((tag) => {
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

export default {
  addBlog,
  getBlog,
  getBlogs,
  getBlogsByCategoryId,
  getBlogsByTag,
  editBlog,
  deleteBlogs,
  getTags
}