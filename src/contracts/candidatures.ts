import { z } from "zod";

/**
 * Candidature contract skeleton.
 * TODO: Define schema fields during feature implementation.
 */
export const CandidatureSchema = z.object({});

export type Candidature = z.infer<typeof CandidatureSchema>;

/**
 * Candidature creation input schema.
 * TODO: Add required fields during feature implementation.
 */
export const CandidatureCreateInputSchema = z.object({});

export type CandidatureCreateInput = z.infer<typeof CandidatureCreateInputSchema>;
