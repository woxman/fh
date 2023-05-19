import { ObjectId as objectId } from 'mongoose'

import Order from './order'
import { IResponse } from "../../../controllers/helper"
import { errorMessages, orderStatuses, statusCodes } from "../../../utils/constants"
import User from '../user/user'
import Product from '../product/product'
import Bill from '../bill/bill'
import billService from '../bill/bill.service'

const addOrder = async (
  userId: string, 
  newOrder: {
    products: {
      product: string
      count: number
    }[]
    phoneNumber: string
    address: string
    fullNameOfReceiverParty: string
    accountNumber: string
    fullNameOfAccountOwner: string
    shabaNumber: string
  }
): Promise<IResponse> => {
  try {
    const { 
      products,
      phoneNumber,
      address,
      fullNameOfReceiverParty,
      accountNumber,
      fullNameOfAccountOwner,
      shabaNumber
    } = newOrder

    // Check if the user exists
    const user = await User.findById(userId)
    if(!user) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.notFound,
          message: errorMessages.userService.noSuchUser
        }
      }
    }
    
    // Check if all the products exist
    let allProductsExist = true
    for(const product of products) {
      const existingProduct = await Product.findById(product.product)
      if(!existingProduct) {
        allProductsExist = false
        break
      }
    }
    
    if(!allProductsExist) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.badRequest,
          message: errorMessages.orderService.invalidProduct
        }
      }
    }

    // Generating a random hex string to be used as tracking code
    const trackingCode = [...Array(12)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')
    // Creating the new order
    let addedOrder = await Order.create({
      owner: user._id,
      status: 1,
      trackingCode,
      products,
      phoneNumber,
      address,
      fullNameOfReceiverParty,
      accountNumber,
      fullNameOfAccountOwner,
      shabaNumber,
    })

    addedOrder = await addedOrder.populate('owner', '_id name')
    addedOrder = await addedOrder.populate({
      path: 'products.product',
      select: '_id name subcategory factory unit price',
      populate: [
        {
          path: 'subcategory',
          select: '_id name'
        },
        {
          path: 'factory',
          select: '_id name'
        }
      ]
    })
    
    return {
      success: true,
      outputs: {
        order: addedOrder
      }
    }

  } catch(error) {
    console.log('Error while creating the new order: ', error)
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

const getOrder = async (orderId: string, userId?: string): Promise<IResponse> => {
  try {
    // Find and return the order
    const filter: { _id: string, owner?: string } = { _id: orderId }
    if(userId) {
      filter.owner = userId
    }

    let order = await Order.findOne(filter)
      .populate('owner', '_id name')
      .populate({
        path: 'products.product',
        select: '_id name subcategory factory unit price',
        populate: [
          {
            path: 'subcategory',
            select: '_id name'
          },
          {
            path: 'factory',
            select: '_id name'
          }
        ]
      })
      .populate({
        path: 'bill',
        populate: {
          path: 'products.product',
          select: '_id name'
        }
      })
      .exec()

    if(!order) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.notFound,
          message: errorMessages.shared.notFound
        }
      }
    }

    return {
      success: true,
      outputs: {
        order
      }
    }
  } catch(error) {
    console.log('Error while getting the order: ', error)
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

const getOrderByTrackingCode = async (trackingCode: string, userId?: string): Promise<IResponse> => {
  try {
    // Find and return the order
    const filter: { trackingCode: string, owner?: string } = { trackingCode }
    if(userId) {
      filter.owner = userId
    }

    const order = await Order.findOne(filter)
      .populate('owner', '_id name')
      .populate({
        path: 'products.product',
        select: '_id name subcategory factory unit price',
        populate: [
          {
            path: 'subcategory',
            select: '_id name'
          },
          {
            path: 'factory',
            select: '_id name'
          }
        ]
      })
      .populate({
        path: 'bill',
        populate: {
          path: 'products.product',
          select: '_id name'
        }
      })
      .exec()

    if(!order) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.notFound,
          message: errorMessages.shared.notFound
        }
      }
    }

    return {
      success: true,
      outputs: {
        order
      }
    }
  } catch(error) {
    console.log('Error while getting the order by tracking code: ', error)
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

const getOrders = async (
  options: {
    limit?: number
    skip?: number
    sortBy?: string
    sortOrder?: string
  }
): Promise<IResponse> => {
  try {
    const { limit, skip, sortBy, sortOrder } = options

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
    
    // Fetch the orders
    const count = await Order.countDocuments(filter)
    const orders = await Order.find(filter, {}, queryOptions)
      .populate('owner', '_id name')
      .populate({
        path: 'products.product',
        select: '_id name subcategory factory unit price',
        populate: [
          {
            path: 'subcategory',
            select: '_id name'
          },
          {
            path: 'factory',
            select: '_id name'
          }
        ]
      })
      .populate({
        path: 'bill',
        populate: {
          path: 'products.product',
          select: '_id name'
        }
      })
      .exec()

    return {
      success: true,
      outputs: { 
        count,
        orders
      }
    }
  } catch(error) {
    console.log('Error while getting the orders: ', error)
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

const getOrdersByUserId = async (
  userId: string,
  options: {
    limit?: number
    skip?: number
    sortBy?: string
    sortOrder?: string
  }
): Promise<IResponse> => {
  try {
    const { limit, skip, sortBy, sortOrder } = options

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

    const filter: { [key: string]: any } = { owner: userId }
    
    // Fetch the orders
    const count = await Order.countDocuments(filter)
    let orders = await Order.find(filter, {}, queryOptions)
      .populate('owner', '_id name')
      .populate({
        path: 'products.product',
        select: '_id name subcategory factory unit price',
        populate: [
          {
            path: 'subcategory',
            select: '_id name'
          },
          {
            path: 'factory',
            select: '_id name'
          }
        ]
      })
      .populate({
        path: 'bill',
        populate: {
          path: 'products.product',
          select: '_id name'
        }
      })
      .exec()

    return {
      success: true,
      outputs: { 
        count,
        orders
      }
    }
  } catch(error) {
    console.log('Error while getting the orders by user id: ', error)
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

const editOrder = async (
  orderId: string,
  updates: {
    status?: number
    products?: {
      product: objectId
      count: number
      stockStatus: {
        enoughInStock: boolean
        numberLeftInStock?: number
        alternativeProduct?: objectId
      }
    }[]
    phoneNumber?: string
    address?: string
    fullNameOfReceiverParty?: string
    accountNumber?: string
    fullNameOfAccountOwner?: string
    shabaNumber?: string
    shippingDates?: number[]
    shippingDate?: number
  },
  userId?: string
): Promise<IResponse> => {

  try {
    // Make sure the record exists
    const filter: { _id: string, owner?: string } = { _id: orderId }
    if(userId) {
      filter.owner = userId
    }

    const order = await Order.findOne(filter).exec()
    if(!order) {
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

    // Trying to avoid invalid updates
    const validUpdates: { [key: number]: Array<string> } = {
      1: ['status', 'products', 'phoneNumber', 'address', 'fullNameOfReceiverParty', 'accountNumber', 'fullNameOfAccountOwner', 'shabaNumber'],
      2: ['status', 'phoneNumber', 'address', 'fullNameOfReceiverParty', 'accountNumber', 'fullNameOfAccountOwner', 'shabaNumber'],
      3: ['status', 'phoneNumber', 'address', 'fullNameOfReceiverParty', 'accountNumber', 'fullNameOfAccountOwner', 'shabaNumber'],
      4: ['status', 'phoneNumber', 'address'],
      5: ['status', 'phoneNumber', 'address', 'fullNameOfReceiverParty', 'accountNumber', 'fullNameOfAccountOwner', 'shabaNumber'],
      6: ['status', 'phoneNumber', 'address', 'shippingDates'],
      7: ['status', 'phoneNumber', 'address', 'fullNameOfReceiverParty', 'accountNumber', 'fullNameOfAccountOwner', 'shabaNumber'],
      8: ['status', 'phoneNumber', 'address', 'shippingDates', 'shippingDate'],
      9: ['status'],
      10:['status'],
      11: ['status'],
      12: ['status'],
      13: []
    }

    const currentStatus = order.status 
    const areUpdatesValid = Object.keys(updates).every((update) => {
      if(!validUpdates[currentStatus].includes(update)) {
        return false
      } else {
        return true
      }
    })
    if(!areUpdatesValid) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.badRequest,
          message: errorMessages.orderService.invalidUpdates
        }
      }
    }

    if(updates.status) {
      // Check if the status update is valid
      const validStatuses: { [key: number]: Array<number> } = {
        1: [2, 13],
        2: [3, 5, 13],
        3: [2, 4, 13],
        4: [6, 13],
        5: [6, 13],
        6: [7, 8, 11, 13],
        7: [6, 13],
        8: [9, 11, 13],
        9: [10, 11, 13],
        10: [12, 13],
        11: [12, 13],
        12: [13],
        13: []
      }
      
      const currentStatus = order.status
      const newStatus = updates.status
      if(!validStatuses[currentStatus].includes(newStatus)) {
        return  {
          success: false,
          error: {
            statusCode: statusCodes.badRequest,
            message: errorMessages.orderService.invalidStatusUpdate
          } 
        }
      }
    }

    if(updates.products) {
      // First checking to see the product id and count match and if they do, update their stock status
      const allNewProductsExistInOrder = updates.products.every((product) => {
        const match = order.products.find((orderProduct) => {
          return (orderProduct.product === product.product && orderProduct.count === product.count)
        })
        
        if(!match) {
          return false
        } else {
          return true
        }
      })

      if(!allNewProductsExistInOrder) {
        return {
          success: false,
          error: {
            statusCode: statusCodes.badRequest,
            message: errorMessages.orderService.notAllProductsExist
          }
        }
      }

      const allOrderProductsExistInUpdates = order.products.every((orderProduct) => {
        const match = updates.products?.find((product) => {
          return (orderProduct.product === product.product && orderProduct.count === product.count)
        })

        if(!match) {
          return false
        } else {
          return true
        }
      })

      if(!allOrderProductsExistInUpdates) {
        return {
          success: false,
          error: {
            statusCode: statusCodes.badRequest,
            message: errorMessages.orderService.productsMismatch
          }
        }
      }
    }

    if(updates.shippingDate) {
      if(!order.shippingDates.includes(updates.shippingDate)) {
        return {
          success: false,
          error: {
            statusCode: statusCodes.badRequest,
            message: errorMessages.orderService.invalidShippingDate
          }
        }
      }
    }

    // Update the order
    const updatedOrder = await Order
      .findOneAndUpdate(filter, updates, { new: true })
      .populate('owner', '_id name')
      .populate({
        path: 'products.product',
        select: '_id name subcategory factory unit price',
        populate: [
          {
            path: 'subcategory',
            select: '_id name'
          },
          {
            path: 'factory',
            select: '_id name'
          }
        ]
      })
      .populate({
        path: 'bill',
        populate: {
          path: 'products.product',
          select: '_id name'
        }
      })
      .exec()

    return {
      success: true,
      outputs: {
        updatedOrder
      }
    }

  } catch(error) {
    console.log('Error while updating the order: ', error)
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

const deleteOrders = async (idList: string[]): Promise<IResponse> => {
  try {
    for(const id of idList) {
      // Deleting the potential bill of the deleted order
      await billService.deleteBill(id)

      // Find and delete the order
      await Order.findOneAndDelete({ _id: id}).exec()
    }

    return {
      success: true
    }

  } catch(error) {
    console.log('Error while deleting the orders: ', error)
    return {
      success: false,
      error: {
        statusCode: statusCodes.ise,
        message: errorMessages.shared.ise
      }
    }
  }
}

//----------------------------------------------------------------------------

const getSiteStatistics = async (startOfTheYear: number): Promise<IResponse> => {
  try {
    const productsCount = await Product.countDocuments()

    const ordersCount = await Order.countDocuments({
      status: 12
    })

    const thisWeekFilter = {
      status: 12,
      updatedAt: {
        $gt: new Date(new Date().getTime() - 604800000),
        $lt: new Date()
      }
    }
    const thisWeekOrders = await Order.find(thisWeekFilter)
      .populate('bill', 'totalSum').exec()

    const thisWeekIncome: {
      totalSum: number
      date: number
    }[] = []
    thisWeekOrders.map((order) => {
      if('totalSum' in order.bill) {
        thisWeekIncome.push({
          totalSum: order.bill.totalSum,
          date: Math.floor(order.updatedAt.getTime() / 1000)
        })
      }
    })
    
    // Get income in the specified year
    const yearFilter = {
      status: 12,
      updatedAt: {
        $gt: new Date(startOfTheYear * 1000),
        $lt: (new Date().getTime() < (startOfTheYear*1000 + 31536000000)) ? new Date() : new Date(startOfTheYear * 1000 + 31536000000)
      }
    }
    const yearOrders = await Order.find(yearFilter)
      .populate('bill', 'totalSum').exec()

    const yearIncome: {
      totalSum: number
      date: number
    }[] = []
    yearOrders.map((order) => {
      if('totalSum' in order.bill) {
        yearIncome.push({
          totalSum: order.bill.totalSum,
          date: Math.floor(order.updatedAt.getTime() / 1000)
        })
      }
    })

    return {
      success: true,
      outputs: { 
        productsCount,
        ordersCount,
        thisWeekIncome,
        yearIncome
      }
    }
  } catch(error) {
    console.log('Error while getting the site statistics: ', error)
    return {
      success: false,
      error: {
        statusCode: statusCodes.ise,
        message: errorMessages.shared.ise
      }
    }
  }
}

export default {
  addOrder,
  getOrder,
  getOrderByTrackingCode,
  getOrders,
  getOrdersByUserId,
  editOrder,
  deleteOrders,
  getSiteStatistics
}