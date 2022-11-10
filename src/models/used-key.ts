import mongoose, {  Document, Schema } from 'mongoose';

export interface IUsedKey extends Document {
  value: string;

}

const UsedKeySchema:Schema = new Schema<IUsedKey>(
  {
 
    value: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.UsedKeys || mongoose.model('UsedKeys', UsedKeySchema);
