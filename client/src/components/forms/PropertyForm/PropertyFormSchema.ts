import { z } from "zod";

const barriosOptions = ["Barrio1", "Barrio2"] as const;
const comunasOptions = ["Comuna1", "Comuna2"] as const;

export const propertyFormSchema = z.object({
	name: z.string(),
	neighbourhood: z.enum(barriosOptions),
	commune: z.enum(comunasOptions),
});
