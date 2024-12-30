import { cn } from "../../utils";

interface FieldProps {
  children: React.ReactNode;
  id: string;
  label: string;
  labelClassName?: string;
  error: { message: string } | undefined;
}

export default function Field({
  children,
  id,
  label,
  labelClassName,
  error,
}: FieldProps) {
  return (
    <div className="space-y-1">
      <div className="relative">
        {children}
        <label
          htmlFor={id}
          className={cn(
            "absolute -top-[11px] left-[29px] block select-none text-sm text-neutral-500 transition-all",
            "before:absolute before:left-0 before:right-0 before:top-[11px] before:h-px before:bg-neutral-950",
            { "text-red-500": error },
            labelClassName
          )}
        >
          <span className="relative z-10">{label}</span>
        </label>
      </div>
      {error && <p className="ml-7 text-sm text-red-500">{error.message}</p>}
    </div>
  );
}
