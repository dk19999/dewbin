import { Types } from 'mongoose'

enum Exposure {
  PUBLIC,
  PRIVATE,
  UNLISTED,
}

interface IPaste {
  title?: string
  body: string
  link: string
  exposure?: Exposure
  syntaxLanguage: string
  createdBy?: Types.ObjectId
  expireAt?: Date
}

interface IUser {
  name: string
  email: string
  password: string
  role: string
}
