import { Button } from "@/components/ui/button";
import {
	Command,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Popover } from "@/components/ui/popover";
import { useFetchCommunes } from "@/hooks/useFetchCommunes";
import { cn } from "@/lib/utils";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { CommandEmpty } from "cmdk";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { z } from "zod";
import type { propertyFormSchema } from "../PropertyForm/PropertyFormSchema";

export function CommuneCombobox({
	form,
}: { form: UseFormReturn<z.infer<typeof propertyFormSchema>> }) {
	const { fetchCommunes, communes } = useFetchCommunes();

	useEffect(() => {
		fetchCommunes();
	}, [fetchCommunes]);

	return (
		<FormField
			control={form.control}
			name="communeId"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Comuna:</FormLabel>
					<Popover>
						<PopoverTrigger asChild>
							<FormControl>
								<Button
									variant="outline"
									role="combobox"
									className={cn(
										"w-[200px] justify-between",
										!field.value && "text-muted-foreground",
									)}
								>
									{field.value
										? communes.find((commune) => commune.id === field.value)
												?.nombre
										: "Selecciona barrio"}
									<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
								</Button>
							</FormControl>
						</PopoverTrigger>
						<PopoverContent>
							<Command>
								<CommandInput placeholder="Buscar comuna..." />
								<CommandList>
									<CommandEmpty>No hay elementos</CommandEmpty>
									<CommandGroup>
										{communes.map((commune) => (
											<CommandItem
												value={commune.nombre}
												key={commune.id}
												onSelect={() => {
													form.setValue("communeId", commune.id);
												}}
											>
												<Check
													className={cn(
														"mr-2 h-4 w-4",
														commune.id === field.value
															? "opacity-100"
															: "opacity-0",
													)}
												/>
												{commune.nombre}
											</CommandItem>
										))}
									</CommandGroup>
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>
					<FormDescription>
						Seleccione la comuna de la propiedad.
					</FormDescription>
				</FormItem>
			)}
		/>
	);
}
