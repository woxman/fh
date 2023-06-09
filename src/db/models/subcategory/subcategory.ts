import mongoose, { Document, Schema, ObjectId as objectId } from "mongoose"
const ObjectId = mongoose.Types.ObjectId

interface ISubcategory extends Document {  
  category: objectId | {
    _id: objectId
    name: string
  }
  factory: objectId | {
    _id: objectId
    name: string
  }
  name: string
  urlSlug: string
  code: string
  description: string
  properties: {
    property: objectId | {
      _id: string
      name: string
      values: string[]
    }
    order: number
  }[]
  products: { // This is a virtual field
    _id: objectId,
    factory: objectId
  }[]
  createAt: Date
  updatedAt: Date
}

const subcategorySchema = new Schema<ISubcategory>({
  category: {
    type: ObjectId,
    ref: 'Category',
    required: true
  },
  factory: {
    type: ObjectId,
    ref: 'Factory',
  },
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  urlSlug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  code: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  properties: [{
    _id: false,
    property: {
      type: ObjectId,
      ref: 'Property'
    },
    order: {
      type: Number
    }
  }]
}, {
  timestamps: true
})

subcategorySchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'subcategory'
})

subcategorySchema.methods.toJSON = function() {
  const subcategory = this
  const subcategoryObject = subcategory.toObject()
  
  // Converting timestamps to unix time
  if(subcategoryObject.createAt) {
    subcategoryObject.createdAt = Math.floor(new Date(subcategoryObject.createdAt).getTime() / 1000)
  }
  if(subcategoryObject.updatedAt) {
    subcategoryObject.updatedAt = Math.floor(new Date(subcategoryObject.updatedAt).getTime() / 1000)
  }

  return subcategoryObject
}

const Subcategory = mongoose.model<ISubcategory>('Subcategory', subcategorySchema)

export default Subcategory