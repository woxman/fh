import mongoose, { Schema, Document, ObjectId as objectId } from "mongoose"

export interface IImage extends Document {
  format: string,
  data: Buffer
}

const imageSchema = new Schema<IImage>({
  format: {
    type: String,
    required: true
  },
  data: {
    type: Buffer,
    required: true
  }
})

const Image = mongoose.model<IImage>("Image", imageSchema)

export default Image
