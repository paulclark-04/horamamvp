import { z } from "zod";

/**
 * Interaction contract skeleton.
 * TODO: Define schema fields during feature implementation.
 */
export const InteractionSchema = z.object({});

export type Interaction = z.infer<typeof InteractionSchema>;

/**
 * Interaction creation input schema.
 * TODO: Add required fields during feature implementation.
 */
export const InteractionCreateInputSchema = z.object({});

export type InteractionCreateInput = z.infer<typeof InteractionCreateInputSchema>;
