import Bill from './bill'
import Order from '../order/order'
import { IResponse } from "../../../controllers/helper"
import { statusCodes, errorMessages, orderStatuses } from "../../../utils/constants"
import imageService from '../image/image.service'


const addBill = async (
  orderId: string,
  newBill: {
    validUntil: number
    products: {
      product: string
      count: number
      price: number
    }[]
    shippingCost: number
    valueAddedPercentage: number
    totalDiscount: number
  }
): Promise<IResponse> => {
  try {
    const { validUntil, products, shippingCost, valueAddedPercentage, totalDiscount } = newBill

    // Checking for order availability
    const filter = {
      _id: orderId,
      status: {
        $in: [1, 2]
      }
    }
    const order = await Order.findOne(filter).exec()
    if(!order) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.notFound,
          message: errorMessages.billService.orderNotFound
        }
      }
    }

    if(order.bill) {
      // Deleting existing bill
      await Bill.findByIdAndDelete(order.bill).exec()
    }

    // Checking all order products exist in bill
    const existingProducts: {
      product: string
      count: number
      price: number
      totalPrice: number
    }[] = []
    const allProductsExist = order.products.every(({product: productId}) => {
      const existingProduct = products.find((product) => {
        return product.product == productId.toString()
      })
      if(existingProduct) {
        existingProducts.push({
          ... existingProduct,
          totalPrice: existingProduct.count * existingProduct.price
        })
        return true
      }
    })

    if(!allProductsExist) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.badRequest,
          message: errorMessages.orderService.notAllProductsExist
        }
      }
    }

    let totalPrice = 0
    existingProducts.forEach((product) => {
      totalPrice += product.price * product.count
    })

    let totalSum = totalPrice + totalPrice * valueAddedPercentage - totalDiscount

    // Creating the new bill for order
    const addedBill = await Bill.create({
      validUntil,
      products: existingProducts,
      shippingCost,
      valueAddedPercentage,
      totalDiscount,
      totalPrice,
      totalSum
    })

    // Update order status
    const update = {
      status: 2,
      bill: addedBill._id
    }
    const updatedOrder = await Order.findByIdAndUpdate(orderId, update, { new: true })
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
        order: updatedOrder
      }
    }

  } catch(error) {
    console.log('Error while creating the bill: ', error)
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

const editBill = async (
  orderId: string,
  updates: {
    validUntil?: number
    products?: {
      product: string
      count: number
      price: number
    }[]
    shippingCost?: number
    valueAddedPercentage?: number
    totalDiscount?: number
  }
): Promise<IResponse> => {
  try {
    // Make sure the record exists
    const filter = {
      _id: orderId,
      bill: {
        $exists: true
      }
    }
    const order = await Order.findOne(filter).exec()
    if(!order) {
      return {
        success:false,
        error: {
          statusCode: statusCodes.notFound,
          message: errorMessages.billService.orderNotFound
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

    const bill = await Bill.findById(order.bill).exec()

    let totalPrice = 0

    if(updates.products) {
      // Checking all order products exist in bill
      const existingProducts: {
        product: string
        count: number
        price: number
      }[] = []

      const allProductsExist = order.products.every(({product: productId}) => {
        const existingProduct = updates.products?.find((product) => {
          product.product == productId.toString()
        })
        if(existingProduct) {
          existingProducts.push(existingProduct)
          return true
        }
      })

      if(!allProductsExist) {
        return {
          success: false,
          error: {
            statusCode: statusCodes.badRequest,
            message: errorMessages.orderService.notAllProductsExist
          }
        }
      }

      existingProducts.forEach((product) => {
        totalPrice += product.price * product.count
      })
    } else {
      bill?.products.forEach((product) => {
        totalPrice += product.price * product.count
      })
    }



    let totalSum = totalPrice + totalPrice * (updates.valueAddedPercentage || bill?.valueAddedPercentage || 0) - (updates.totalDiscount || bill?.totalDiscount || 0)

    // Update the bill
    await Bill.findByIdAndUpdate(order.bill, {
      ...updates,
      totalPrice,
      totalSum
    }, { new: true }).exec()

    const updatedOrder = await Order.findById(orderId)
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
        order: updatedOrder
      }
    }

  } catch(error) {
    console.log('Error while updating the bill: ', error)
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

const choosePaymentMethod = async (
  userId: string,
  orderId: string,
  paymentMethod: string
): Promise<IResponse> => {
  try {
    // Checking for bill availability
    const filter = {
      _id: orderId,
      owner: userId,
      status: {
        $in: [2, 3, 5]
      },
      bill: {
        $exists: true
      }
    }
    const order = await Order.findOne(filter).exec()
    if(!order) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.notFound,
          message: errorMessages.billService.orderNotFound
        }
      }
    }

    // Update payment method
    const update = {
      'payment.method': paymentMethod
    }
    await Bill.findByIdAndUpdate(order.bill, update).exec()

    const orderUpdate = {
      status: paymentMethod === 'online' ? 3 : 5 
    }
    
    const updatedOrder = await Order.findByIdAndUpdate(orderId, orderUpdate, { new: true })
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
        order: updatedOrder
      }
    }

  } catch(error) {
    console.log('Error while choosing payment method: ', error)
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

const updateBankPayment = async (
  userId: string,
  orderId: string,
  bankPayment: {
    paidAmount: number
    originAccount: string
    trackingNumber: string
    images: {
      format: string
      data: Buffer
    }[]
  }
): Promise<IResponse> => {
  try {
    const { paidAmount, originAccount, trackingNumber, images } = bankPayment

    // Checking for order availability
    const filter = {
      _id: orderId,
      owner: userId,
      status: {
        $in: [5, 7]
      },
      bill: {
        $exists: true
      }
    }
    const order = await Order.findOne(filter).exec()
    if(!order) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.badRequest,
          message: errorMessages.billService.orderNotFound
        }
      }
    }

    // Checking for bill availability
    const billFilter = {
      _id: order.bill,
      'payment.method': 'bank'
    }
    const bill = await Bill.findOne(billFilter).exec()
    if(!bill) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.badRequest,
          message: errorMessages.billService.billNotFound
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
    // Update bank payment
    const update = {
      'payment.bankPayment': {
        paidAmount,
        originAccount,
        trackingNumber,
        images: imagesToSave
      }
    }
    await Bill.findByIdAndUpdate(order.bill, update).exec()

    const orderUpdate = {
      status: 6
    }

    const updatedOrder = await Order.findByIdAndUpdate(orderId, orderUpdate, { new: true })
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
        order: updatedOrder
      }
    }

  } catch(error) {
    console.log('Error while updating bank payment: ', error)
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

const disapproveBankPayment = async (
  orderId: string,
  disapprovalMessage: string
): Promise<IResponse> => {
  try {
    // Checking for order availability
    const filter = {
      _id: orderId,
      status: {
        $in: [6]
      },
      bill: {
        $exists: true
      }
    }
    const order = await Order.findOne(filter).exec()
    if(!order) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.badRequest,
          message: errorMessages.billService.orderNotFound
        }
      }
    }

    // Checking for bill availability
    const billFilter = {
      _id: order.bill,
      'payment.method': 'bank'
    }
    const bill = await Bill.findOne(billFilter).exec()
    if(!bill) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.badRequest,
          message: errorMessages.billService.billNotFound
        }
      }
    }

    // Update bank payment
    const update = {
      'payment.bankPayment.disapprovalMessage': disapprovalMessage
    }
    await Bill.findByIdAndUpdate(order.bill, update).exec()

    const orderUpdate = {
      status: 7
    }

    const updatedOrder = await Order.findByIdAndUpdate(orderId, orderUpdate, { new: true })
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
        order: updatedOrder
      }
    }

  } catch(error) {
    console.log('Error while updating setting bank payment disapproval message: ', error)
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

const deleteBill = async (orderId: string): Promise<IResponse> => {
  try {
    // Checking order existence
    const filter = {
      _id: orderId,
      bill: {
        $exists: true
      }
    }

    const update = {
      bill: null
    }

    const order = await Order.findOneAndUpdate(filter, update).exec()
    if(!order) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.badRequest,
          message: errorMessages.billService.orderNotFound
        }
      }
    }

    // Delete the bill
    const deletedBill = await Bill.findByIdAndDelete(order.bill).exec()

    // Deleting images of the deleted bill
    if(deletedBill && deletedBill.payment && deletedBill.payment.bankPayment) {
      for (const image in deletedBill.payment.bankPayment.images) {
        await imageService.deleteImage(image)
      }
    }

    return {
      success: true
    }

  } catch(error) {
    console.log('Error while deleting the bill: ', error)
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
  addBill,
  editBill,
  choosePaymentMethod,
  updateBankPayment,
  disapproveBankPayment,
  deleteBill
}