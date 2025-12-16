import { z } from "zod";

/**
 * Schema for validating lead creation input from public forms.
 * Only includes user-provided fields; type and statut are set server-side.
 */
export const LeadCreateInputSchema = z.object({
    nom: z.string().min(1, "Le nom est requis"),
    prenom: z.string().min(1, "Le prénom est requis"),
    email: z.string().email("Email invalide"),
    telephone: z.string().optional(),
    societe: z.string().optional(),
    message: z.string().optional(),
});

export type LeadCreateInput = z.infer<typeof LeadCreateInputSchema>;

/**
 * Full lead schema matching the database structure.
 */
export const LeadSchema = z.object({
    id: z.string().uuid(),
    type: z.enum(["lead", "contact"]),
    nom: z.string().nullable(),
    prenom: z.string().nullable(),
    email: z.string().nullable(),
    telephone: z.string().nullable(),
    societe: z.string().nullable(),
    statut: z.string().nullable(),
    user_id: z.string().uuid().nullable(),
    created_at: z.string(),
    updated_at: z.string(),
});

export type Lead = z.infer<typeof LeadSchema>;

/**
 * API response shape for lead creation.
 */
export const LeadCreateResponseSchema = z.object({
    lead_id: z.string().uuid(),
});

export type LeadCreateResponse = z.infer<typeof LeadCreateResponseSchema>;
