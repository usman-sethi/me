import "server-only";
import { Schema, model, models, type InferSchemaType } from "mongoose";

const ProjectMediaSchema = new Schema(
  {
    src: { type: String, required: true },
    alt: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    publicId: { type: String },
  },
  { _id: false },
);

const ProjectSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    title: { type: String, required: true, trim: true },
    shortDescription: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, required: true },
    problem: { type: String },
    solution: { type: String },
    features: { type: [String], default: [] },
    challenges: { type: String },
    technologies: { type: [String], default: [] },
    category: {
      type: String,
      enum: ["web-app", "tool", "landing-page", "experiment"],
      required: true,
    },
    image: { type: ProjectMediaSchema, required: true },
    video: { type: String },
    githubUrl: { type: String },
    liveUrl: { type: String },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: false },
    seoTitle: { type: String },
    seoDescription: { type: String },
  },
  { timestamps: true },
);

export type ProjectDocument = InferSchemaType<typeof ProjectSchema>;

export const ProjectModel = models.Project ?? model("Project", ProjectSchema);
