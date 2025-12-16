import { z } from "zod";

/**
 * Public candidature input contract (text fields only).
 * `statut` and `cv_url` are enforced server-side.
 */
const OptionalTrimmedString = z.preprocess(
    (value) => {
        if (typeof value !== "string") return value;
        const trimmed = value.trim();
        return trimmed.length === 0 ? undefined : trimmed;
    },
    z.string().optional()
);

const OptionalUuid = z.preprocess(
    (value) => {
        if (typeof value !== "string") return value;
        const trimmed = value.trim();
        return trimmed.length === 0 ? undefined : trimmed;
    },
    z.string().uuid("UUID invalide").optional()
);

export const CandidatureCreateInputSchema = z
    .object({
        nom: z.string().trim().min(1, "Le nom est requis"),
        prenom: OptionalTrimmedString,
        email: z.string().trim().email("Email invalide"),
        offre_id: OptionalUuid,
    })
    .strict();

export type CandidatureCreateInput = z.infer<typeof CandidatureCreateInputSchema>;

export const CandidatureSchema = CandidatureCreateInputSchema;

export type Candidature = z.infer<typeof CandidatureSchema>;
