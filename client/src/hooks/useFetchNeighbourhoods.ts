import { useCallback, useState } from "react";
import { z } from "zod";

export interface Neighbourhood {
	id: number;
	name: string;
	communeId: number;
}

const neighbourhoodSchema = z.object({
	id: z.number(),
	name: z.string(),
	communeId: z.number(),
});

const neighbourhoodsSchema = z.array(neighbourhoodSchema);

export function useFetchNeighbourhoods() {
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [neighbourhoods, setNeighbourhoods] = useState<Neighbourhood[]>([]);

	const fetchNeighbourhoods = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			const request = await fetch("http://localhost:3000/barrios");
			const response = await request.json();

			const parsedNeighbourhoods = neighbourhoodsSchema.parse(response);
			setNeighbourhoods(parsedNeighbourhoods);
		} catch (error) {
			if (error instanceof z.ZodError) {
				setError(error.errors[0].message);
			}
			if (error instanceof Error) setError(error.message);
		} finally {
			setLoading(false);
		}
	}, []);

	return { error, loading, neighbourhoods, fetchNeighbourhoods };
}
