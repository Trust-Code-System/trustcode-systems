import { z } from "zod";

export const serviceOptions = [
  { value: "product-web-engineering", label: "Product & Web Engineering" },
  { value: "ecommerce-development", label: "E-Commerce Development" },
  { value: "cloud-devops", label: "Cloud & DevOps Engineering" },
  { value: "ai-integration", label: "AI Integration & Automation" },
  { value: "cybersecurity-soc", label: "Cybersecurity & SOC Services" },
  { value: "it-support-managed", label: "IT Support & Managed Services" },
  { value: "training-mentorship", label: "Training & Technical Mentorship" },
  { value: "not-sure", label: "Not sure yet — help me scope it" },
] as const;

export const budgetOptions = [
  "Under $2k",
  "$2k–$5k",
  "$5k–$15k",
  "$15k+",
  "Retainer / ongoing",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.string().trim().email("Please enter a valid email address."),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  service: z.string().trim().min(1, "Please choose a service.").max(80),
  budget: z.string().trim().max(40).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more — at least 10 characters.")
    .max(4000),
  // Honeypot: must stay empty.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
