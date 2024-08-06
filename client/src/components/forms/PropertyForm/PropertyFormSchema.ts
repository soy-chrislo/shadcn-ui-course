import { z } from "zod";

export const propertyFormSchema = z.object({
	name: z.string(),
	neighbourhoodId: z.number(),
	communeId: z.number(),
});
