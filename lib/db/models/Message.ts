import "server-only";
import { Schema, model, models, type InferSchemaType } from "mongoose";

const MessageSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, trim: true, lowercase: true },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
    read: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export type MessageDocument = InferSchemaType<typeof MessageSchema>;

// `models.Message` reuses the compiled model across hot reloads instead of
// throwing "Cannot overwrite `Message` model once compiled".
export const Message = models.Message ?? model("Message", MessageSchema);
