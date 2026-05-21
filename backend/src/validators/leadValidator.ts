import { z } from "zod";

export const createLeadSchema = z.object({

  name: z.string().min(2, {
    message: "Name must be at least 2 characters",
  }),

  email: z.email({
    message:"Invalid email address",
  }),

  status: z.enum([
    "new",
    "contacted",
    "qualified",
    "lost",
  ]),

  source: z.enum([
    "website",
    "instagram",
    "referral",
    "other"
  ]),
});