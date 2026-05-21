import mongoose from "mongoose";

export enum LeadStatus {
    NEW = "new",
    CONTACTED = "contacted",
    QUALIFIED = "qualified",
    LOST = "lost"
}

export enum LeadSource {
    WEBSITE = "website",
    INSTAGRAM = "instagram",
    REFFERAL = "referral"
}

export interface ILead {
    name: string;
    email: string;
    status: LeadStatus;
    source: LeadSource;
    createdBy: mongoose.Types.ObjectId;
}
