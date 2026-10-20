import mongoose from "mongoose";

const waitlistEntrySchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export const WaitlistEntry = mongoose.model(
  "WaitlistEntry",
  waitlistEntrySchema,
);
