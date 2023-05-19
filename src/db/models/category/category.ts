import mongoose, { Document, Schema, ObjectId as objectId } from "mongoose"
const ObjectId = mongoose.Types.ObjectId

interface ICategory extends Document {
  name: string
  urlSlug: string
  description: string
  icon: string
  subcategories: { // This is a virtual field
    _id: objectId
  }[]
  createAt: Date
  updatedAt: Date
}

const categorySchema = new Schema<ICategory>({
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
  description: {
    type: String,
    required: true
  },
  // This is going to be the url of a stored image
  icon: {
    type: String,
    required: true,
  }
}, { 
  timestamps: true
})

categorySchema.virtual('subcategories', {
  ref: 'Subcategory',
  localField: '_id',
  foreignField: 'category'
})

categorySchema.methods.toJSON = function() {
  const category = this
  const categoryObject = category.toObject()
  
  // Converting timestamps to unix time
  if(categoryObject.createAt) {
    categoryObject.createdAt = Math.floor(new Date(categoryObject.createdAt).getTime() / 1000)
  }
  if(categoryObject.updatedAt) {
    categoryObject.updatedAt = Math.floor(new Date(categoryObject.updatedAt).getTime() / 1000)
  }

  return categoryObject
}

const Category = mongoose.model<ICategory>('Category', categorySchema)

export default Category