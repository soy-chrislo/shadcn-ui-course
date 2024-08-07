import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useFetchCommunes } from "@/hooks/useFetchCommunes";
import {
	type Neighbourhood,
	useFetchNeighbourhoods,
} from "@/hooks/useFetchNeighbourhoods";
import { propertyFormSchema } from "./PropertyFormSchema";
import { Combobox } from "../comboboxes/Combobox";

export function PropertyForm() {
	const { communes, fetchCommunes } = useFetchCommunes();
	const { neighbourhoods, fetchNeighbourhoods } = useFetchNeighbourhoods();

	const [filteredNeighbourhoods, setFilteredNeighbourhoods] = useState<
		Neighbourhood[]
	>([]);
	const [communeId, setCommuneId] = useState<number>(0);
	const [neighbourhoodId, setNeighbourhoodId] = useState<number>(0);

	useEffect(() => {
		fetchCommunes();
		fetchNeighbourhoods();
	}, [fetchCommunes, fetchNeighbourhoods]);

	const form = useForm<z.infer<typeof propertyFormSchema>>({
		resolver: zodResolver(propertyFormSchema),
		defaultValues: {
			name: "",
			neighbourhoodId: 0,
			communeId: 0,
		},
	});

	useEffect(() => {
		const filtered = neighbourhoods.filter(
			(neighbourhood) => neighbourhood.communeId === communeId,
		);
		setFilteredNeighbourhoods(filtered);
		form.setValue("neighbourhoodId", 0);
	}, [communeId, neighbourhoods, form.setValue]);

	useEffect(() => {
		const neighbourhood = neighbourhoods.find(
			(neighbourhood) => neighbourhood.id === neighbourhoodId,
		);
		if (!neighbourhood) return;

		form.setValue("communeId", neighbourhood.communeId);
	}, [neighbourhoodId, neighbourhoods, form.setValue]);

	const onSubmit = (values: z.infer<typeof propertyFormSchema>) => {
		console.log({ values });
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nombre de propiedad</FormLabel>
							<FormControl>
								<Input placeholder="Nombre de propiedad" {...field} />
							</FormControl>
							<FormDescription>
								Especifique el nombre de la propiedad a crear.
							</FormDescription>
						</FormItem>
					)}
				/>
				<Combobox
					form={form}
					fieldName="communeId"
					itemName="comuna"
					items={communes}
					onChange={(id) => setCommuneId(id)}
					description="Seleccione la comuna de la propiedad"
				/>
				<Combobox
					form={form}
					fieldName="neighbourhoodId"
					itemName="barrio"
					items={
						filteredNeighbourhoods.length
							? filteredNeighbourhoods
							: neighbourhoods
					}
					onChange={(id) => setNeighbourhoodId(id)}
					description="Seleccione el barrio de la propiedad"
				/>
				<Button className="mt-3" type="submit">
					Crear propiedad
				</Button>
			</form>
		</Form>
	);
}
