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
import { useEffect, useRef, useState } from "react";
import type { Path, PathValue, UseFormReturn } from "react-hook-form";

interface FormData {
	[key: string]: string | number;
}

export function Combobox<T extends FormData>({
	form,
	fieldName,
	itemName,
	items,
	description,
	onChange,
}: {
	form: UseFormReturn<T>;
	fieldName: Path<T>;
	itemName: string;
	items: { id: PathValue<T, Path<T>>; name: string }[];
	description: string;
	onChange?: (id: number) => void;
}) {
	const buttonRef = useRef<HTMLButtonElement>(null);
	const [buttonWidth, setButtonWidth] = useState<number>(0);

	useEffect(() => {
		if (!buttonRef.current) return;
		setButtonWidth(buttonRef.current.offsetWidth);
	}, []);

	return (
		<FormField
			control={form.control}
			name={fieldName}
			render={({ field }) => (
				<FormItem className="mt-3">
					<FormLabel className="flex">
						{`${itemName[0].toLocaleUpperCase()}${itemName.slice(1)}`}:
					</FormLabel>
					<Popover>
						<PopoverTrigger asChild>
							<FormControl>
								<Button
									ref={buttonRef}
									variant="outline"
									role="combobox"
									className={cn(
										"w-full justify-between",
										!field.value && "text-muted-foreground",
									)}
								>
									{field.value
										? items.find((commune) => commune.id === field.value)?.name
										: `Seleccione ${itemName}`}
									<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
								</Button>
							</FormControl>
						</PopoverTrigger>
						<PopoverContent
							className="p-0"
							style={{ width: buttonWidth ?? 200 }}
						>
							<Command>
								<CommandInput placeholder={`Buscar ${itemName}...`} />
								<CommandList>
									<CommandEmpty>No hay elementos</CommandEmpty>
									<CommandGroup>
										{items.map((item) => (
											<CommandItem
												value={item.name}
												key={item.id}
												onSelect={() => {
													form.setValue(fieldName, item.id);
													onChange?.(Number(item.id.valueOf()));
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
												{item.name}
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
