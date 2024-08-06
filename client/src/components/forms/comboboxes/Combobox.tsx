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
import { cn } from "@/lib/utils";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { CommandEmpty } from "cmdk";
import { Check, ChevronsUpDown } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

export function Combobox({
	form,
	fieldName,
	itemName,
	items,
	description,
}: {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	form: UseFormReturn<any>;
	fieldName: string;
	itemName: string;
	items: { id: number; nombre: string }[];
	description: string;
}) {
	return (
		<FormField
			control={form.control}
			name={fieldName}
			render={({ field }) => (
				<FormItem>
					<FormLabel>
						{`${itemName[0].toLocaleUpperCase()}${itemName.slice(1)}`}:
					</FormLabel>
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
										? items.find((commune) => commune.id === field.value)
												?.nombre
										: `Seleccione ${itemName}`}
									<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
								</Button>
							</FormControl>
						</PopoverTrigger>
						<PopoverContent>
							<Command>
								<CommandInput placeholder={`Buscar ${itemName}...`} />
								<CommandList>
									<CommandEmpty>No hay elementos</CommandEmpty>
									<CommandGroup>
										{items.map((item) => (
											<CommandItem
												value={item.nombre}
												key={item.id}
												onSelect={() => {
													form.setValue(fieldName, item.id);
												}}
											>
												<Check
													className={cn(
														"mr-2 h-4 w-4",
														item.id === field.value
															? "opacity-100"
															: "opacity-0",
													)}
												/>
												{item.nombre}
											</CommandItem>
										))}
									</CommandGroup>
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>
					<FormDescription>{description}</FormDescription>
				</FormItem>
			)}
		/>
	);
}
