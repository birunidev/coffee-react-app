import React from "react";

export default function Select({
  id,
  label,
  name,
  onChange,
  onBlue,
  error,
  placeholder,
  options,
}) {
  return (
    <div className="form-group">
      <label className="text-xl font-bold mb-3 block" htmlFor={id}>
        {label}
      </label>
      <select className="px-5 py-4 border-2 border-gray-200 bg-white w-full rounded-xl focus:border-primary-500 focus:ring-transparent outline-none">
        <option value="">Choose option</option>
        {options.map((option, index) => {
          return (
            <option key={index} value={option.value}>
              {option.title}
            </option>
          );
        })}
      </select>
    </div>
  );
}
