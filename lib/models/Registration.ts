
// import mongoose, { Schema, models, model } from 'mongoose'

// const MemberSchema = new Schema(
//   {
//     name: { type: String, required: true },
//     whatsapp: { type: String, required: true },
//     year: { type: String, required: true },
//   },
//   { _id: false }
// )

// const RegistrationSchema = new Schema(
//   {
//     collegeName: { type: String, required: true },
//     teamName: { type: String, required: true },

//     leader: {
//       name: { type: String, required: true },
//       email: { type: String, required: true },
//       whatsapp: { type: String, required: true },
//       phone: { type: String, required: true },
//       year: { type: String, required: true },
//       idImageUrl: { type: String }, // uploaded ID photo (optional)
//     },

//     teamSize: { type: Number, enum: [2, 3], required: true, default: 2 },
//     members: {
//       type: [MemberSchema],
//       validate: [(arr: any[]) => arr.length >= 2 && arr.length <= 3, 'Team must have 2–3 members'],
//       required: true,
//     },

//     // up to 2 events
//     events: {
//       type: [String],
//       enum: ['gen-ai', 'agentic-ai', 'no-code'],
//       validate: [(arr: any[]) => arr.length >= 1 && arr.length <= 2, 'Pick 1–2 events'],
//       required: true,
//     },

//     payment: {
//       amount: { type: Number, required: true }, // 150 or 300
//       transactionId: { type: String },
//       screenshotUrl: { type: String },
//     },
//   },
//   { timestamps: true }
// )

// const Registration =
//   models.Registration || model('Registration', RegistrationSchema)

// export default Registration
// lib/models/Registration.ts
import { Schema, model, models } from 'mongoose'

const MemberSchema = new Schema(
  {
    name: { type: String, required: true },
    whatsapp: { type: String, required: true },
    year: { type: String, required: true },
  },
  { _id: false }
)

const RegistrationSchema = new Schema(
  {
    collegeName: { type: String, required: true },
    teamName: { type: String, required: true },

    leader: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      whatsapp: { type: String, required: true },
      phone: { type: String, required: true },
      year: { type: String, required: true },
      idImageUrl: { type: String }, // optional: Cloudinary URL
    },

    teamSize: { type: Number, enum: [2, 3], required: true, default: 2 },

    members: {
      type: [MemberSchema],
      validate: [(arr: any[]) => arr.length >= 2 && arr.length <= 3, 'Team must have 2–3 members'],
      required: true,
    },

    // 1–2 events
    events: {
      type: [String],
      enum: ['gen-ai', 'agentic-ai', 'no-code'],
      validate: [(arr: any[]) => arr.length >= 1 && arr.length <= 2, 'Pick 1–2 events'],
      required: true,
    },

    payment: {
      amount: { type: Number, required: true }, // 150 or 300
      transactionId: { type: String },
      screenshotUrl: { type: String }, // optional: Cloudinary URL
    },
  },
  { timestamps: true }
)

const Registration = models.Registration || model('Registration', RegistrationSchema)
export default Registration
