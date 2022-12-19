import mongoose, { Document, Schema } from 'mongoose'
import { IUser } from '../../types'

export type UserType = IUser & Document

const UserSchema: Schema = new Schema<UserType>({
  name: {
    type: String,
    required: [true, 'name must be provided'],
    minlength: 3,
    maxlength: 50

  },
  email: {
    type: String,
    required: [true, 'email must be provided'],
    match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide valid email'],
    unique: true,
    lowercase: true

  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 8
  },
  role: {
    type: String,
    enum: ['admin', 'member'],
    default: 'member'
  }

})

export default mongoose.models.Pastes || mongoose.model('User', UserSchema)
