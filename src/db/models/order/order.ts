import mongoose, { Document, Schema, ObjectId as objectId } from "mongoose"
const ObjectId = mongoose.Types.ObjectId

export interface IOrder extends Document {
  _id: objectId
  owner: objectId
  status: number
  trackingCode: string
  products: {
    product: objectId
    count: number
    stockStatus: {
      enoughInStock: boolean
      numberLeftInStock: number
      alternativeProduct: objectId
    }
  }[]
  phoneNumber: string
  address: string
  fullNameOfReceiverParty: string
  accountNumber: string
  fullNameOfAccountOwner: string
  shabaNumber: string
  bill: objectId | {
    totalSum: number
  }
  shippingDates: number[]
  shippingDate: number
  createAt: Date
  updatedAt: Date
}

const orderSchema = new Schema<IOrder>({
  owner: {
    type: ObjectId,
    ref: 'User',
    required: true
  }, 
  status: {
    type: Number,
    default: 1
  },
  trackingCode: {
    type: String,
    required: true,
    unique: true
  },
  products: [{
    _id: false,
    product: {
      type: ObjectId,
      ref: 'Product'
    },
    count: Number,
    stockStatus: {
      enoughInStock: {
        type: Boolean,
        default: true
      },
      numberLeftInStock: {
        type: Number
      },
      alternativeProduct: {
        type: ObjectId
      }
    }
  }],
  phoneNumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  fullNameOfReceiverParty: {
    type: String,
    required: true
  },
  accountNumber: {
    type: String,
    required: true
  },
  fullNameOfAccountOwner: {
    type: String,
    required: true
  },
  shabaNumber: {
    type: String,
    required: true
  },
  bill: {
    type: ObjectId,
    ref: 'Bill'
  },
  shippingDates: [{
    type: Number
  }],
  shippingDate: {
    type: Number
  }
}, {
  timestamps: true
})

orderSchema.methods.toJSON = function() {
  const order = this
  const orderObject = order.toObject()
  
  // Converting timestamps to unix time
  if(orderObject.createdAt) {
    orderObject.createdAt = Math.floor(new Date(orderObject.createdAt).getTime() / 1000)
  }
  if(orderObject.updatedAt) {
    orderObject.updatedAt = Math.floor(new Date(orderObject.updatedAt).getTime() / 1000)
  }

  return orderObject
}

orderSchema.virtual('alternativeProducts').get(function() {
  const order: IOrder = this

  return (order.products.map(product => {
    return product.stockStatus.alternativeProduct
  })).filter(item => {
    if(item) return true
  })
})

const Order = mongoose.model<IOrder>('Order', orderSchema)

export default Order