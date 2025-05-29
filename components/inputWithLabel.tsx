import * as React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface InputWithLabelProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string; // Texto da label
  labelClassName?: string; // Classes adicionais para estilizar a label
  inputClassName?: string; // Classes adicionais para estilizar o input
  id?: string; // ID do input para conectar com a label
  icon?: React.ReactNode; // Ícone opcional para o input
}

export const InputWithLabel = React.forwardRef<HTMLInputElement, InputWithLabelProps>(
  ({ label, labelClassName, inputClassName, id, icon, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 w-full mb-2">
        <Label
          htmlFor={id}
          className={cn("text-sm font-medium", labelClassName)}
        >
          {label}
        </Label>
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {icon}
            </div>
          )}
          <input
            id={id}
            ref={ref}
            className={cn(
              "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              icon ? "pl-10" : "",
              inputClassName
            )}
            {...props}
          />
        </div>
      </div>
    );
  }
);

InputWithLabel.displayName = "InputWithLabel";
