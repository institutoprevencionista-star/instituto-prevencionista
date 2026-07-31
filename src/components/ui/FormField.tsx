import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

const FIELD_CLASSES =
  "w-full rounded-md border border-black/20 bg-white px-3 py-2 text-sm text-brand-black placeholder:text-black/40 focus:border-brand-green-700 focus:outline-none focus:ring-1 focus:ring-brand-green-700";

function FieldWrapper({
  label,
  name,
  error,
  required,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-brand-black">
        {label}
        {required && <span className="text-brand-green-700"> *</span>}
      </label>
      {children}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

export function TextField({
  label,
  name,
  error,
  required,
  ...props
}: {
  label: string;
  name: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <FieldWrapper label={label} name={name} error={error} required={required}>
      <input id={name} name={name} required={required} className={FIELD_CLASSES} {...props} />
    </FieldWrapper>
  );
}

export function TextAreaField({
  label,
  name,
  error,
  required,
  ...props
}: {
  label: string;
  name: string;
  error?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <FieldWrapper label={label} name={name} error={error} required={required}>
      <textarea
        id={name}
        name={name}
        required={required}
        rows={4}
        className={FIELD_CLASSES}
        {...props}
      />
    </FieldWrapper>
  );
}

export function ConsentCheckbox({ error }: { error?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="consentimento" className="flex items-start gap-2 text-sm text-brand-black">
        <input
          id="consentimento"
          name="consentimento"
          type="checkbox"
          required
          className="mt-0.5 h-4 w-4 rounded border-black/30 text-brand-green-700 focus:ring-brand-green-700"
        />
        <span>
          Autorizo o Instituto Prevencionista a usar meus dados para me contatar, conforme a{" "}
          <a href="/politica-privacidade" className="underline hover:text-brand-green-700">
            Política de Privacidade
          </a>
          . *
        </span>
      </label>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
