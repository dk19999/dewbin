import mongoose, { Schema } from "mongoose";

const PasteSchema: Schema = new Schema(
  {
    title: {
      type: String,
    },
    body: {
      type: String,
      required: true,
    },
    link: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    exposure: {
      type: String,
      enum: ["PUBLIC", "PRIVATE", "UNLISTED"],
      default: "PUBLIC",
    },
    syntaxLanguage: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    expireAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

PasteSchema.pre("find", function () {
  const date = new Date();
  this.where({
    isDeleted: { $ne: true },
    $or: [{ expireAt: { $gte: date } }, { expireAt: null }],
  });
});

PasteSchema.pre("findOne", function () {
  this.where({ isDeleted: { $ne: true } });
});

export default mongoose.models.Pastes || mongoose.model("Pastes", PasteSchema);
