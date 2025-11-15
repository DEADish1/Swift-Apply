import { InputHTMLAttributes, forwardRef } from "react";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = "", label, id, ...props }, ref) => {
    const checkboxId = id || props.name;

    return (
      <div className="flex items-center">
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${className}`}
          {...props}
        />
        <label htmlFor={checkboxId} className="ml-2 block text-sm text-gray-700">
          {label}
        </label>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
export type { CheckboxProps };
