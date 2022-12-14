import mongoose, { Schema } from 'mongoose'

const PasteSchema: Schema = new Schema(
  {
    title: {
      type: String
    },
    body: {
      type: String,
      required: true
    },
    link: {
      type: String
    },
    exposure: {
      type: String,
      enum: ['PUBLIC', 'PRIVATE', 'UNLISTED'],
      default: 'PUBLIC'
    },
    syntaxLanguage: {
      type: String,
      required: true
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    expireAt: {
      type: Date
    }
  },
  { timestamps: true }
)

export default mongoose.models.Pastes || mongoose.model('Pastes', PasteSchema)
