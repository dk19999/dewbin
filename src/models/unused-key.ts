import mongoose, { Document, Schema } from "mongoose";

export interface IUnusedKey extends Document {
  value: string;
}

const UnusedKeySchema:Schema = new Schema<IUnusedKey>(
  {
    value: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.UnusedKeys ||
  mongoose.model("UnusedKeys", UnusedKeySchema);
