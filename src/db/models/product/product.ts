import mongoose, { Document, Schema, ObjectId as objectId } from "mongoose"
const ObjectId = mongoose.Types.ObjectId

export interface IProduct extends Document {
  subcategory: objectId | {
    _id: objectId
    name: string
  }
  factory: objectId | {
    _id: objectId
    name: string
  }
  name: string
  urlSlug: string
  description: string
  properties: {
    name: string
    value: string
  }[]
  unit: string
  price: number
  priceHistory: {
    price: number
    date: number
  }[]
  tags: string[]
  images: string[]
  averageRating: number
  ratingsCount: number
  ratings: {
    user: objectId
    rating: number
  }[]
  complementaryProducts: IProduct[]
  createAt: Date
  updatedAt: Date
}

const productSchema = new Schema<IProduct>({
  subcategory: {
    type: ObjectId,
    ref: 'Subcategory',
    required: true
  },
  factory: {
    type: ObjectId,
    ref: 'Factory',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  urlSlug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  properties: [{
    _id: false,
    name: {
      type: String,
      trim: true
    },
    value: {
      type: String
    },
    order: {
      type: Number
    }
  }],
  unit: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    default: 0
  },
  priceHistory: [{
    _id: false,
    price: {
      type: Number,
      required: true
    },
    date: {
      type: Number,
      required: true
    }
  }],
  tags: [{
    _id: false,
    type: String,
    trim: true
  }],
  images: [{
    _id: false,
    type: String,
  }],
  averageRating: {
    type: Number,
    default: 0
  },
  ratingsCount: {
    type: Number,
    default: 0
  },
  ratings: [{
    user: {
      type: ObjectId,
      ref: "User"
    },
    rating: {
      type: Number,
      required: true
    }
  }]
}, {
  timestamps: true
})

productSchema.methods.toJSON = function() {
  const product = this
  const productObject = product.toObject()
  
  // Converting timestamps to unix time
  if(productObject.createAt) {
    productObject.createdAt = Math.floor(new Date(productObject.createdAt).getTime() / 1000)
  }
  if(productObject.updatedAt) {
    productObject.updatedAt = Math.floor(new Date(productObject.updatedAt).getTime() / 1000)
  }

  return productObject
}

const Product = mongoose.model<IProduct>('Product', productSchema)

export default Product