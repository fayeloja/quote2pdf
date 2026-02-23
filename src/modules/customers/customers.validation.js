const { z } = require("zod");

// Reusable UUID validator
const paramsSchema = z.object({
  id: z.string().uuid("Invalid Customer ID format"),
});

exports.createCustomerSchema = z.object({
  body: z.object({
    first_name: z.string().trim().min(1, "First name is required"),
    last_name: z.string().trim().min(1, "Last name is required"),
    // email is often optional for local tradesmen,
    // but if you want it mandatory, keep it like this:
    email: z.string().trim().email("Invalid email address").toLowerCase(),
    phone: z
      .string()
      .trim()
      .min(7, "Phone number must be at least 7 characters"),
    address: z.string().trim().optional(),
    company_name: z.string().trim().optional(),
    city: z.string().trim().optional(),
    state: z.string().trim().optional(),
    country: z.string().trim().default("Nigeria"),
  }),
});

exports.updateCustomerSchema = z.object({
  params: paramsSchema, // Validates the /:id in the URL
  body: z
    .object({
      first_name: z.string().trim().min(1).optional(),
      last_name: z.string().trim().min(1).optional(),
      email: z.string().trim().email().toLowerCase().optional(),
      phone: z.string().trim().min(7).optional(),
      address: z.string().trim().optional(),
      company_name: z.string().trim().optional(),
      city: z.string().trim().optional(),
      state: z.string().trim().optional(),
      country: z.string().trim().optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field must be provided for update",
    }),
});
