import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
}

export default function CustomSelect({ options, value, onChange, placeholder, required }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find(o => o.value === value);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Hidden native select for form validation */}
      {required && (
        <select
          required
          value={value}
          onChange={() => {}}
          className="absolute inset-0 opacity-0 pointer-events-none"
          tabIndex={-1}
        >
          <option value="">{placeholder}</option>
          {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={placeholder}
        className={`w-full rounded-lg border px-4 py-3 text-[15px] text-left flex items-center justify-between transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#307abe] ${
          isOpen
            ? "border-[#307abe] ring-2 ring-[#307abe]/10 bg-white"
            : value
              ? "border-gray-200 bg-white text-foreground"
              : "border-gray-200 bg-white text-gray-300"
        }`}
      >
        <span className={value ? "text-foreground" : "text-gray-400"}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      <div
        role="listbox"
        aria-label={placeholder}
        className={`absolute z-50 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden origin-top ${
          isOpen
            ? "opacity-100 scale-y-100 translate-y-0"
            : "opacity-0 scale-y-95 -translate-y-1 pointer-events-none"
        }`}
        style={{ transition: "opacity 0.2s, transform 0.2s" }}
      >
        {options.map((o, i) => (
          <button
            key={o.value}
            type="button"
            role="option"
            aria-selected={value === o.value}
            onClick={() => { onChange(o.value); setIsOpen(false); }}
            className={`w-full px-4 py-3 text-[14px] text-left transition-colors duration-100 cursor-pointer ${
              value === o.value
                ? "bg-[#307abe]/5 text-foreground font-medium"
                : "text-muted-foreground hover:bg-gray-50 hover:text-foreground"
            } ${i === 0 ? "pt-3.5" : ""} ${i === options.length - 1 ? "pb-3.5" : ""}`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
