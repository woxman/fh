import { ObjectId as objectId } from 'mongoose'
import Product, { IProduct } from './product'
import { IResponse } from "../../../controllers/helper"
import { statusCodes, errorMessages, websiteName } from "../../../utils/constants"
import Subcategory from '../subcategory/subcategory'
import Factory, { IFactory } from '../factory/factory'
import User from '../user/user'
import SiteInfo from '../siteInfo/siteInfo'
import imageService from '../image/image.service'

const addProduct = async (
  subcategoryId: string, 
  newProduct: {
    factory: string
    name: string
    description: string
    properties: {
      name: string
      value: string
    }[]
    unit: string
    weight: string
    price?: number
    tags: string[]
    images: {
      format: string
      data: Buffer
    }[]
  }
): Promise<IResponse> => {
  try {
    const { 
      factory: factoryId,
      name,
      description,
      properties,
      unit,
      weight,
      price,
      tags,
      images
    } = newProduct

    // Check if the subcategory exists
    const subcategory = await Subcategory.findById(subcategoryId)
      .populate('properties.property', 'name values').exec()

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
    const factory = await Factory.findById(factoryId).exec()
    if(!factory) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.badRequest,
          message: errorMessages.factoryService.noSuchFactory
        }
      }
    }

    const propertiesToSave: {
      name: string
      value: string
    }[] = []
    
    // Check if all subcategory properties and proper value exist in properties
    const propertiesExist = subcategory.properties.every((subcategoryProperty) => {
      const existingProperty = properties.find((property) => {
        if('name' in subcategoryProperty.property) {
          if(property.name == subcategoryProperty.property.name && subcategoryProperty.property.values.includes(property.value)) {
            return true
          }
        }
      })

      if(existingProperty) {
        propertiesToSave.push({
          name: existingProperty.name,
          value: existingProperty.value
        })

        return true
      }
    })
    
    if(!propertiesExist) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.badRequest,
          message: errorMessages.productService.invalidProperty
        }
      }
    }

    const imagesToSave: string[] = []
    // storing images
    for(let image of images) {
      const result = await imageService.storeImage(image.format, image.data)

      if(result.success && result.imageUrl) {
        imagesToSave.push(result.imageUrl)
      } else {
        return {
          success: false,
          error: {
            message: errorMessages.shared.ise,
            statusCode: statusCodes.ise
          }
        }
      }
    }

    // generating url slug off of name and a random number
    const namePart = name.split(' ').join('-')
    const randomPart = (Math.floor(100000 + Math.random() * 900000)).toString()
    const urlSlug = namePart + '-' + randomPart

    const priceHistory = price ? [{
      price,
      date: Math.floor(Date.now() / 1000)
    }] : []

    // Creating the new product
    let addedProduct = await Product.create({
      subcategory: subcategoryId,
      factory: factoryId,
      name,
      urlSlug,
      description,
      properties: propertiesToSave,
      unit,
      weight,
      price,
      priceHistory,
      tags,
      images: imagesToSave
    })

    addedProduct = await addedProduct.populate({
      path: 'subcategory',
      select: '_id name category',
      populate: {
        path: 'category',
        select: '_id name'
      }
    })
    addedProduct = await addedProduct.populate('factory', '_id name')
    
    return {
      success: true,
      outputs: {
        product: addedProduct
      }
    }

  } catch(error) {
    console.log('Error while creating the new product: ', error)
    return {
      success: false,
      error: {
        statusCode: statusCodes.ise,
        message: errorMessages.shared.ise
      }
    }
  }
}

// ----------------------------------------------------------------------------

const getProduct = async (productUrlSlug: string): Promise<IResponse> => {
  try {
    // Find and return the product    
    const product = await Product.findOne({urlSlug:productUrlSlug})
      .populate({
        path: 'subcategory',
        select: '_id name category urlSlug',
        populate: {
          path: 'category',
          select: '_id name urlSlug'
        }
      })
      .populate('factory', '_id name')
      .exec()      
    if(!product) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.notFound,
          message: errorMessages.shared.notFound
        }
      }
    }

    // Finding alternative products
    let complementaryProducts
    if('_id' in product.subcategory) {
      const filter = {
        subcategory: product.subcategory._id
      }
      const projection = {
        _id: 1,
        name: 1,
        description: 1,
        price: 1,
        images: 1
      }
      complementaryProducts = await Product.find(filter, projection).exec()
      complementaryProducts = shuffle(complementaryProducts).slice(0, 5)
      product.complementaryProducts = complementaryProducts
      console.log(complementaryProducts)
      console.log(product)
    }

    return {
      success: true,
      outputs: {
        product: {
          ...product.toObject(),
          complementaryProducts
        }
      }
    }

  } catch(error) {
    console.log('Error while getting the product: ', error)
    return {
      success: false,
      error: {
        statusCode: statusCodes.ise,
        message: errorMessages.shared.ise
      }
    }
  }
}

// ----------------------------------------------------------------------------

const getProducts = async (
  options: {
    limit?: number,
    skip?: number,
    sortBy?: string,
    sortOrder?: string,
    search?: string,
    access?:string,
    factory?:string
  }
): Promise<IResponse> => {
  try {    
    const { limit, skip, sortBy, sortOrder, search , access , factory } = options
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
      filter.name = { $regex: search }
    }
        
    // Fetch the subcategories
    let qr={
      path: 'subcategory',
      select: '_id name category code factory',
      match: {},
      populate: [
        {
          path: 'category',
          select: '_id name',
        },
        {
          path: 'factory',
          select: '_id name'
        }
      ]
    }
    if(access != "all"){
      const coder = access?.split(",")
      qr.match = { 'code': { $in: coder } }
    }        
    if (factory != "all") {
      console.log(factory)
      qr.match = { "factory.name": "هفت الماس" };
    }
           
    let products = await Product.find(filter, {}, queryOptions)
    .populate(qr)
    .populate('factory', '_id name')
    .exec();
    products = products.filter(product => product.subcategory)
  
    let counts = await Product.find(filter, {}, {})
    .populate(qr)
    .populate('factory', '_id name')
    .exec();
    counts = counts.filter(count => count.subcategory)

    return {
      success: true,
      outputs: { 
        count:counts.length,
        products
      }
    }

  } catch(error) {
    console.log('Error while getting the subcategories: ', error)
    return {
      success: false,
      error: {
        statusCode: statusCodes.ise,
        message: errorMessages.shared.ise
      }
    }
  }
}

// ----------------------------------------------------------------------------

const getProductsBySubcategoryId = async (
  subcategoryId: string,
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

    const filter: { [key: string]: any } = { subcategory: subcategoryId }
    if(search) {
      filter.name = { $regex: search }
    }
    
    // Fetch the subcategories
    const count = await Product.countDocuments(filter)
    let products = await Product.find(filter, {}, queryOptions)
      .populate({
        path: 'subcategory',
        select: '_id name category',
        populate: {
          path: 'category',
          select: '_id name'
        }
      })
      .populate('factory', '_id name')
      .exec()

    return {
      success: true,
      outputs: { 
        count,
        products
      }
    }

  } catch(error) {
    console.log('Error while getting the products by subcategory id: ', error)
    return {
      success: false,
      error: {
        statusCode: statusCodes.ise,
        message: errorMessages.shared.ise
      }
    }
  }
}

// ----------------------------------------------------------------------------

const getProductsByFactoryId = async (
  factoryId: string,
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

    const filter: { [key: string]: any } = { factory: factoryId }
    if(search) {
      filter.name = { $regex: search }
    }
    
    // Fetch the subcategories
    const count = await Product.countDocuments(filter)
    let products = await Product.find(filter, {}, queryOptions)
      .populate({
        path: 'subcategory',
        select: '_id name category',
        populate: {
          path: 'category',
          select: '_id name'
        }
      })
      .populate('factory', '_id name')
      .exec()

    return {
      success: true,
      outputs: { 
        count,
        products
      }
    }

  } catch(error) {
    console.log('Error while getting the products by factory id: ', error)
    return {
      success: false,
      error: {
        statusCode: statusCodes.ise,
        message: errorMessages.shared.ise
      }
    }
  }
}

// ----------------------------------------------------------------------------

const getFactoriesProductsBySubcategoryUrlSlug = async (
  subcategoryUrlSlug: string,
  options: {
    limit?: number
    skip?: number
  }
): Promise<IResponse> => {
  try {
    // Check if the product exists
    const subcategory = await Subcategory.findOne({urlSlug:subcategoryUrlSlug}).exec()
    if(!subcategory) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.notFound,
          message: errorMessages.shared.notFound
        }
      }
    }
    
    const { limit, skip } = options
    
    // Fetch the products
    let subcategoryProducts = await Product.find({ subcategory: subcategory._id })
      .populate({
        path: 'subcategory',
        select: '_id name category',
        populate: {
          path: 'category',
          select: '_id name'
        }
      })
      .populate('factory', '_id name')
      .exec()

    let factoriesProducts: {
      factory: IFactory
      products: IProduct[]
    }[] = []

    for(const product of subcategoryProducts) {
      // Checking if this product's factory exists in factoriesProducts list
      const factoryProductsIndex = factoriesProducts.findIndex((factoryProducts) => {
        if('_id' in product.factory) {
          return factoryProducts.factory._id.toString() == product.factory._id.toString()
        }
      })

      if(factoryProductsIndex !== -1) {
        // Add product to existing factory if factory exists
        factoriesProducts[factoryProductsIndex].products.push(product)
      } else {
        // Add factory and product if factory does not exist
        if('_id' in product.factory) {
          const factory = await Factory.findById(product.factory._id).exec()
          if(factory) {
            factoriesProducts.push({
              factory,
              products: [product]
            })
          }
        }
      }
    }

    const count = factoriesProducts.length

    if(skip) {
      factoriesProducts = factoriesProducts.slice(skip)
    }

    if(limit) {
      factoriesProducts = factoriesProducts.slice(0, limit)
    }

    return {
      success: true,
      outputs: { 
        count,
        factoriesProducts
      }
    }

  } catch(error) {
    console.log('Error while getting the factories products by subcategory id: ', error)
    return {
      success: false,
      error: {
        statusCode: statusCodes.ise,
        message: errorMessages.shared.ise
      }
    }
  }
}

// ----------------------------------------------------------------------------

const editProduct = async (
  productId: string,
  updates: { 
    name?: string, 
    factory?: string
    urlSlug?: string,
    description?: string,
    properties?: {
      name: string
      value: string
    }[]
    unit?: string
    weight?: string
    price?: number
    priceHistory?: {
      price: number
      date: number
    }[]
    tags?: string[]
    images?: Array<string | {
      format: string
      data: Buffer
    }>
  }
): Promise<IResponse> => {
  try {
    // Make sure the record exists
    const product = await Product.findById(productId).exec()
    if(!product) {
      return {
        success:false,
        error: {
          statusCode: statusCodes.notFound,
          message: errorMessages.shared.notFound
        }
      }
    }

    // Make sure there are changes in updates
    if((Object.keys(updates)).length === 0) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.badRequest,
          message: errorMessages.shared.noChanges
        }
      }
    }

    // Make sure the factory exists
    if(updates.factory){
      const factoryExists = await Factory.findById(updates.factory).exec()
      if(!factoryExists) {
        return {
          success: false,
          error: {
            message: errorMessages.factoryService.noSuchFactory,
            statusCode: statusCodes.badRequest
          }
        }
      }
    }

    const subcategory = await Subcategory.findById(product.subcategory)
      .populate('properties.property', 'name values').exec()

    if(!subcategory) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.notFound,
          message: errorMessages.shared.notFound
        }
      }
    }

    if(updates.properties) {
      const propertiesToSave: {
        name: string
        value: string
      }[] = []
      updates.properties
      
      // Check if all subcategory properties and proper value exist in properties
      const propertiesExist = subcategory.properties.every((subcategoryProperty) => {
        const existingProperty = updates.properties?.find((property) => {
          if('name' in subcategoryProperty.property) {
            if(property.name == subcategoryProperty.property.name && subcategoryProperty.property.values.includes(property.value)) {
              return true
            }
          }
        })
  
        if(existingProperty) {
          propertiesToSave.push({
            name: existingProperty.name,
            value: existingProperty.value
          })
  
          return true
        }
      })
      
      if(!propertiesExist) {
        return {
          success: false,
          error: {
            statusCode: statusCodes.badRequest,
            message: errorMessages.productService.invalidProperty
          }
        }
      }

      updates.properties = propertiesToSave
    }

    if(updates.images) {
      const existingImages = product.images
      const updatedImages = []
      // deleting images that no longer exist
      for(let image of existingImages) {
        if(!updates.images.includes(image)) {
          await imageService.deleteImage(image)
        }
      }

      // storing new images
      for(let image of updates.images) {
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

      updates.images = updatedImages
    }

    if(updates.name) {
      // generating url slug off of name and a random number
      const namePart = updates.name.split(' ').join('-')
      const randomPart = (Math.floor(100000 + Math.random() * 900000)).toString()
      updates.urlSlug = namePart + randomPart
    }

    if(updates.price) {
      // Adding new price to price history
      const priceHistory = product.priceHistory
      priceHistory.push({
        price: updates.price,
        date: Math.floor(Date.now() / 1000)
      })
      updates.priceHistory = priceHistory
    }

    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, { new: true })
      .populate({
        path: 'subcategory',
        select: '_id name category',
        populate: {
          path: 'category',
          select: '_id name'
        }
      })
      .populate('factory', '_id name')
      .exec()

    return {
      success: true,
      outputs: {
        updatedProduct
      }
    }

  } catch(error) {
    console.log('Error while updating the product: ', error)
    return {
      success: false,
      error: {
        statusCode: statusCodes.ise,
        message: errorMessages.shared.ise
      }
    }
  }
}

// ----------------------------------------------------------------------------

const deleteProducts = async (idList: string[]): Promise<IResponse> => {
  try {
    const siteInfo = await SiteInfo.findOne({ websiteName })
    let specialProducts = siteInfo?.mainPage.specialProducts
    
    for(const id of idList) {
      // Find and delete the product
      const product = await Product.findByIdAndDelete(id).exec()
      if(product) {
        // Deleting images of deleted product
        for (const image in product.images) {
          await imageService.deleteImage(image)
        }

        // Removing the product from special products
        const index = specialProducts?.findIndex((specialProduct) => {
          return specialProduct.factory === product.factory && specialProduct.subcategory === product.factory
        })
        if(index && index !== -1 && specialProducts) {
          const productIndex = specialProducts[index].products.findIndex((item) => {
            return item == product._id
          })

          if(productIndex !== -1) {
            specialProducts[index].products = specialProducts[index].products.splice(productIndex, 1) 
            await SiteInfo.findByIdAndUpdate({ websiteName }, {
              $set: {
                'mainPage.specialProducts': specialProducts
              }
            })
          }
        }

        // Removing the product from favorite products
        const users = await User.find({ favoriteProducts: product._id }).exec()
        for(const user of users) {
          const productIndex = user.favoriteProducts.findIndex((favoriteProduct) => {
            favoriteProduct === product._id
          })
          if(productIndex !== -1) {
            user.favoriteProducts.splice(productIndex, 1)
            await user.save()
          }
        }
      }
    }

    return {
      success: true
    }

  } catch(error) {
    console.log('Error while deleting the subcategories: ', error)
    return {
      success: false,
      error: {
        statusCode: statusCodes.ise,
        message: errorMessages.shared.ise
      }
    }
  }
}

// ----------------------------------------------------------------------------

const rateProduct = async (
  productId: string,
  rating: number,
  userId: string
): Promise<IResponse> => {
  try {
    // Check if the product exists
    const product = await Product.findById(productId).exec()

    if(!product) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.notFound,
          message: errorMessages.shared.notFound
        }
      }
    }

    const existingRating = product.ratings.find((rating) => {
      rating.user.toString() == userId
    })

    let updatedProduct

    if(existingRating) {
      const ratingsSum = product.averageRating * product.ratingsCount - existingRating.rating + rating
      const averageRating = ratingsSum / product.ratingsCount

      const update = {
        averageRating,
        'ratings.$[i].rating': rating
      }
      const arrayFilters = [{'i.user': userId}]

      updatedProduct = await Product.findByIdAndUpdate(productId, update, { arrayFilters }).exec()
    } else {
      const ratingsSum = product.averageRating * product.ratingsCount + rating
      const averageRating = ratingsSum / ( product.ratingsCount + 1 )

      const update = {
        averageRating,
        ratingsCount: product.ratingsCount + 1,
        $push: {
          ratings: {
            user: userId,
            rating
          }
        }
      }

      updatedProduct = await Product.findByIdAndUpdate(productId, update).exec()
    }
    
    return {
      success: true,
      outputs: {
        product: updatedProduct
      }
    }

  } catch(error) {
    console.log('Error while rating the product: ', error)
    return {
      success: false,
      error: {
        statusCode: statusCodes.ise,
        message: errorMessages.shared.ise
      }
    }
  }
}

// ----------------------------------------------------------------------------

const shuffle = (array: any[]): any[] => {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}


export default {
  addProduct,
  getProduct,
  getProducts,
  getProductsBySubcategoryId,
  getProductsByFactoryId,
  getFactoriesProductsBySubcategoryUrlSlug,
  editProduct,
  deleteProducts,
  rateProduct
}