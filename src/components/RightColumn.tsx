export default function RightColumn() {
  return (
    <div className="md:col-span-7 space-y-6">
      <div>
        <div className="flex items-center mb-2">
          <h3 className="text-white">Plugins</h3>
        </div>
        <p className="text-gray-500 text-sm mb-2">No plugins selected yet.</p>
        <button className="px-3 py-1 border border-gray-700 rounded text-sm">Add Plugin</button>
      </div>

      <FormField
        label="Name"
        defaultValue="Subhani"
        type="input"
      />

      <FormField
        label="System"
        defaultValue="A cool dude"
        type="textarea"
        minHeight="min-h-20"
      />

      <FormField
        label="Bio"
        defaultValue="A dude"
        type="textarea"
        minHeight="min-h-16"
      />

      <FormField
        label="Knowledge"
        defaultValue="Knows everything!"
        type="textarea"
        minHeight="min-h-16"
      />

      <FormField
        label="Lore"
        defaultValue="Not much here"
        type="textarea"
        minHeight="min-h-16"
      />
    </div>
  );
}

type FormFieldProps = {
  label: string;
  defaultValue: string;
  type: 'input' | 'textarea';
  minHeight?: string;
}

function FormField({ label, defaultValue, type, minHeight = '' }: FormFieldProps) {
  return (
    <div>
      <div className="flex items-center mb-2">
        <h3 className="text-white mr-1">{label}</h3>
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-gray-500">
          <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
        </svg>
      </div>
      {type === 'input' ? (
        <input
          type="text"
          className="w-full p-2 bg-transparent border border-gray-700 rounded text-white"
          defaultValue={defaultValue}
        />
      ) : (
        <textarea
          className={`w-full p-2 bg-transparent border border-gray-700 rounded text-white ${minHeight}`}
          defaultValue={defaultValue}
        />
      )}
    </div>
  );
} 