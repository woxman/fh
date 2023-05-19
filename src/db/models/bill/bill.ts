import mongoose, { Document, Schema, ObjectId as objectId } from "mongoose"
const ObjectId = mongoose.Types.ObjectId

export interface IBill extends Document {
  validUntil: number
  products: {
    product: objectId
    count: number
    price: number
    totalPrice: number
  }[]
  shippingCost: number
  valueAddedPercentage: number
  totalDiscount: number
  totalPrice: number
  totalSum: number
  payment: {
    method: string
    onlinePaymentSteps: {
      paidAmount: number
      trackingNumber: string
      paymentTime: number
    }[]
    bankPayment: {
      paidAmount: number
      originAccount: string
      trackingNumber: string
      images: string[]
      disapprovalMessage: string
    }
  }
  createAt: Date
  updatedAt: Date
}

const billSchema = new Schema<IBill>({
  validUntil: {
    type: Number,
    required: true
  },
  products: [{
    _id: false,
    product: {
      type: ObjectId,
      ref: 'Product',
      required: true
    },
    count: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    }
  }],
  shippingCost: {
    type: Number,
    required: true
  },
  valueAddedPercentage: {
    type: Number,
    required: true
  },
  totalDiscount: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  totalSum: {
    type: Number,
    required: true
  },
  payment: {
    method: {
      type: String
    },
    onlinePaymentSteps: [{
      paidAmount: {
        type: Number
      },
      trackingNumber: {
        type: String
      },
      paymentTime: {
        type: Number
      }
    }],
    bankPayment: {
      paidAmount: {
        type: Number
      },
      originAccount: {
        type: Number
      },
      trackingNumber: {
        type: Number
      },
      images: [{
        type: String
      }],
      disapprovalMessage: {
        type: Number
      },
    }
    
  }
}, {
  timestamps: true
})

billSchema.methods.toJSON = function() {
  const bill = this
  const billObject = bill.toObject()
  
  // Converting timestamps to unix time
  if(billObject.createdAt) {
    billObject.createdAt = Math.floor(new Date(billObject.createdAt).getTime() / 1000)
  }
  if(billObject.updatedAt) {
    billObject.updatedAt = Math.floor(new Date(billObject.updatedAt).getTime() / 1000)
  }

  return billObject
}

const Bill = mongoose.model<IBill>('Bill', billSchema)

export default Bill