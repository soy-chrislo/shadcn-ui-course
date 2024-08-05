import { useForm } from "react-hook-form";
import { propertyFormSchema } from "./PropertyFormSchema";
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

export function PropertyForm() {
	const form = useForm<z.infer<typeof propertyFormSchema>>({
		resolver: zodResolver(propertyFormSchema),
		defaultValues: {
			name: "",
			neighbourhood: "Barrio1",
			commune: "Comuna2",
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
				<FormField
					control={form.control}
					name="commune"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Comuna</FormLabel>
							<FormControl>
								<section>
									<select {...field}>
										<option value="Comuna1">Comuna1</option>
										<option value="Comuna2">Comuna2</option>
									</select>
								</section>
							</FormControl>
							<FormDescription>
								Seleccione la comuna de la propiedad.
							</FormDescription>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="neighbourhood"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Barrio</FormLabel>
							<FormControl>
								<section>
									<select {...field}>
										<option value="Barrio1">Barrio1</option>
										<option value="Barrio2">Barrio2</option>
									</select>
								</section>
							</FormControl>
							<FormDescription>
								Seleccione el barrio de la propiedad.
							</FormDescription>
						</FormItem>
					)}
				/>
				<Button type="submit">Crear propiedad</Button>
			</form>
		</Form>
	);
}
