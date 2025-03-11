"use client";

export type FormFieldProps = {
  label: string;
  defaultValue: string;
  type: "input" | "textarea";
  minHeight?: string;
  readOnly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export default function FormField({ 
  label, 
  defaultValue, 
  type, 
  minHeight,
  readOnly,
  onChange 
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm text-gray-400">{label}</label>
      {type === "input" ? (
        <input
          type="text"
          defaultValue={defaultValue}
          readOnly={readOnly}
          onChange={onChange}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
        />
      ) : (
        <textarea
          defaultValue={defaultValue}
          readOnly={readOnly}
          onChange={onChange}
          className={`w-full p-2 bg-gray-800 border border-gray-700 rounded text-white ${minHeight || ''}`}
        />
      )}
    </div>
  );
} 