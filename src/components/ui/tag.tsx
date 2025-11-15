import { HTMLAttributes, forwardRef } from "react";
import { X } from "lucide-react";

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "success" | "warning" | "danger";
  removable?: boolean;
  onRemove?: () => void;
}

const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ className = "", variant = "default", removable = false, onRemove, children, ...props }, ref) => {
    const variants = {
      default: "bg-gray-100 text-gray-700",
      primary: "bg-blue-100 text-blue-700",
      success: "bg-green-100 text-green-700",
      warning: "bg-yellow-100 text-yellow-700",
      danger: "bg-red-100 text-red-700",
    };

    return (
      <span
        ref={ref}
        className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
        {removable && onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="ml-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full hover:bg-black/10"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </span>
    );
  }
);

Tag.displayName = "Tag";

export { Tag };
export type { TagProps };
