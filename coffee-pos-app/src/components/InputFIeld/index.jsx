import React from "react";

export default function InputField({
  id,
  label,
  name,
  onChange,
  onBlur,
  error,
  value,
  placeholder,
  type = "text",
}) {
  return (
    <div className="form-group">
      <label className="text-xl font-bold mb-3 block" htmlFor={id}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        placeholder={placeholder}
        className={[
          "px-5 py-4 w-full rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-transparent outline-none",
          error && "border-red-500",
        ].join(" ")}
      />
      <span className="block text-red-500">{error}</span>
    </div>
  );
}
