import type React from "react";
import { useEffect, useState } from "react";

interface Option {
  id: string;
  nombre: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
  defaultValue?: string;
  required?: boolean
}

const SelectV1: React.FC<SelectProps> = ({
  options,
  placeholder = "Seleccione una opción",
  onChange,
  className = "",
  defaultValue = "",
  required = false
}) => {
  // Manage the selected value
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
    onChange(value); // Trigger parent handler
  };

  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);

  return (  
    <select
      required={required}
      className={`h-11 w-full appearance-none rounded-lg border border-gray-300  px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${selectedValue
        ? "text-gray-800 dark:text-white/90"
        : "text-gray-400 dark:text-gray-400"
        } ${className}`}
      value={selectedValue}
      onChange={handleChange}
    >

      {/* Placeholder option */}
      {options.length === 1 ? null :
        <option
          value=""
          disabled
          className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
        >
          {placeholder}
        </option>
      }

      {/* Map over options */}
      {options.map((option) => (
        <option
          key={option.id.toString()}
          value={option.id.toString()}
          className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
        >
          {option.nombre}
        </option>
      ))}
    </select>
  );
};

export default SelectV1;
