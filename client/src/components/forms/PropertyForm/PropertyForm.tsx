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
import { useEffect } from "react";
import { useFetchCommunes } from "@/hooks/useFetchCommunes";
import { useFetchNeighbourhoods } from "@/hooks/useFetchNeighbourhoods";
import { propertyFormSchema } from "./PropertyFormSchema";
import { Combobox } from "../comboboxes/Combobox";

export function PropertyForm() {
	const { communes, fetchCommunes } = useFetchCommunes();
	const { neighbourhoods, fetchNeighbourhoods } = useFetchNeighbourhoods();

	useEffect(() => {
		fetchCommunes();
		fetchNeighbourhoods();
	}, [fetchCommunes, fetchNeighbourhoods]);

	const form = useForm<z.infer<typeof propertyFormSchema>>({
		resolver: zodResolver(propertyFormSchema),
		defaultValues: {
			name: "",
			neighbourhoodId: neighbourhoods.length ? neighbourhoods[0].id : 1,
			communeId: communes.length ? communes[0].id : 0,
		},
	});

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
					description="Seleccione la comuna de la propiedad"
				/>
				<Combobox
					form={form}
					fieldName="neighbourhoodId"
					itemName="barrio"
					items={neighbourhoods}
					description="Seleccione el barrio de la propiedad"
				/>
				<Button type="submit">Crear propiedad</Button>
			</form>
		</Form>
	);
}
