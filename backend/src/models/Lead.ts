import mongoose, { Schema, Document } from "mongoose";

import {
  ILead,
  LeadStatus,
  LeadSource,
} from "../interfaces/lead.interface";

export interface ILeadDocument extends ILead, Document {}

const leadSchema = new Schema<ILeadDocument>(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    status: {
      type: String,

      enum: Object.values(LeadStatus),

      default: LeadStatus.NEW,
    },

    source: {
      type: String,

      enum: Object.values(LeadSource),

      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Lead = mongoose.model<ILeadDocument>(
  "Lead",
  leadSchema
);

export default Lead;