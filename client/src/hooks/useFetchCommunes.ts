import { useCallback, useState } from "react";
import { z } from "zod";

interface Commune {
	id: number;
	name: string;
	neighbourhoodIds: number[];
}

const communeSchema = z.object({
	id: z.number(),
	name: z.string(),
	neighbourhoodIds: z.array(z.number()),
});

const communesSchema = z.array(communeSchema);

export function useFetchCommunes() {
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [communes, setCommunes] = useState<Commune[]>([]);

	const fetchCommunes = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			const request = await fetch("http://localhost:3000/comunas");
			const response = await request.json();

			const parsedCommunes = communesSchema.parse(response);
			setCommunes(parsedCommunes);
		} catch (error) {
			if (error instanceof z.ZodError) {
				setError(error.errors[0].message);
			}
			if (error instanceof Error) setError(error.message);
		} finally {
			setLoading(false);
		}
	}, []);

	return { error, loading, communes, fetchCommunes };
}
