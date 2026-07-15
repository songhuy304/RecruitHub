"use client";

import * as React from "react";
import { useStore } from "@tanstack/react-form";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  createFormField,
  FormField,
  FormFieldError,
  FormFieldSet,
  useFieldContext,
} from "@/components/ui/form-context";
import { Icons } from "@/components/icons";

export type Option = {
  value: string;
  label: React.ReactNode;
};

interface ComboboxFieldProps {
  label?: React.ReactNode;
  description?: string;
  required?: boolean;
  options: Option[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
}

export function ComboboxField({
  label,
  description,
  required,
  options,
  placeholder = "Select an option",
  searchPlaceholder = "Search...",
  emptyText = "No data found.",
}: ComboboxFieldProps) {
  const field = useFieldContext();

  const value = useStore(field.store, (s) => s.value) as string;
  const isTouched = useStore(field.store, (s) => s.meta.isTouched);
  const isValid = useStore(field.store, (s) => s.meta.isValid);

  const [open, setOpen] = React.useState(false);

  const selected = options.find((item) => item.value === value);

  return (
    <FormFieldSet className="min-w-40">
      <FormField>
        {label && (
          <FieldLabel htmlFor={field.name}>
            {label}
            {required && <span className="text-red-500"> *</span>}
          </FieldLabel>
        )}

        <Popover
          open={open}
          onOpenChange={(nextOpen) => {
            setOpen(nextOpen);

            if (!nextOpen) {
              field.handleBlur();
            }
          }}
        >
          <PopoverTrigger asChild>
            <Button
              id={field.name}
              variant="outline"
              role="combobox"
              aria-expanded={open}
              aria-invalid={isTouched && !isValid}
              className="w-full justify-between font-normal"
            >
              {selected?.label ?? (
                <span className="text-muted-foreground">{placeholder}</span>
              )}

              <Icons.chevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
            <Command>
              <CommandInput placeholder={searchPlaceholder} />

              <CommandList>
                <CommandEmpty>{emptyText}</CommandEmpty>

                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={(currentValue) => {
                        field.handleChange(currentValue);
                        setOpen(false);
                      }}
                    >
                      <Icons.check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === option.value ? "opacity-100" : "opacity-0"
                        )}
                      />

                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {description && <FieldDescription>{description}</FieldDescription>}
      </FormField>

      <FormFieldError />
    </FormFieldSet>
  );
}

export const FormComboboxField = createFormField(ComboboxField);
