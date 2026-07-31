import { useState } from "react";
import { Check, Plus, Trash2, X } from "lucide-react";

export function Field({ label, error, optional, required, className = "", ...props }) {
  return (
    <label className={`mb-5 grid gap-2 ${className}`}>
      <span className="text-xs font-extrabold text-[#33453e] dark:text-[#d9e6e1]">
        {label}
        {required && <b className="ml-1 text-[#d84f45]">*</b>}{" "}
        {optional && (
          <em className="ml-1 font-medium not-italic text-[#98a19e]">
            Optional
          </em>
        )}
      </span>
      <input
        {...props}
        required={required}
        className={`form-control h-[46px] ${error ? "border-[#d9594f]" : ""}`}
      />
      {error && <small className="text-[11px] text-[#cf4c43]">{error}</small>}
    </label>
  );
}

export function TextArea({ label, error, hint, required, ...props }) {
  return (
    <label className="mb-5 grid gap-2">
      <span className="text-xs font-extrabold text-[#33453e] dark:text-[#d9e6e1]">
        {label}
        {required && <b className="ml-1 text-[#d84f45]">*</b>}
      </span>
      <textarea
        {...props}
        required={required}
        className={`form-control resize-y pt-3 leading-6 ${error ? "border-[#d9594f]" : ""}`}
      />
      <div className="flex min-h-[13px] justify-end">
        {error ? (
          <small className="mr-auto text-[11px] text-[#cf4c43]">{error}</small>
        ) : (
          <i className="text-[10px] not-italic text-[#9ca5a1]">{hint}</i>
        )}
      </div>
    </label>
  );
}

export function Checkbox({ checked, onChange, children }) {
  return (
    <label className="mb-5 -mt-1 flex cursor-pointer items-center gap-2 text-xs text-[#53635d] dark:text-[#b8c8c1]">
      <input
        className="hidden"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <i
        className={`grid size-[17px] place-items-center rounded border not-italic ${checked ? "border-brand-light bg-brand-light text-white" : "border-[#b9c6c1] text-transparent"}`}
      >
        <Check size={12} />
      </i>
      {children}
    </label>
  );
}

export function EntryCard({ title, index, canRemove, onRemove, children }) {
  return (
    <section className="form-card">
      <div className="mb-[22px] flex items-center justify-between border-b border-[#e7ebe8] pb-5 dark:border-[#304139]">
        <div className="flex items-center gap-2.5">
          <span className="rounded-md bg-[#fff0ea] p-1.5 font-heading text-[10px] font-extrabold text-[#e16f4e]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-[15px] font-bold">{title}</h3>
        </div>
        {canRemove && (
          <button
            className="grid size-9 place-items-center rounded-lg border border-[#dfe5e1] bg-white text-[#6f7b76] hover:border-[#efb9b5] hover:text-[#c9483e] dark:border-[#3b4d46] dark:bg-[#1a2b25] dark:text-[#a8b7b1]"
            onClick={onRemove}
            type="button"
            aria-label={`Remove ${title}`}
          >
            <Trash2 size={17} />
          </button>
        )}
      </div>
      {children}
    </section>
  );
}

export function AddEntryButton({ children, onClick }) {
  return (
    <button
      className="flex h-12 w-full items-center justify-center gap-2 rounded-[10px] border border-dashed border-[#87af9f] bg-[#eef7f3] font-bold text-[#286c58] hover:bg-[#e0f1ea] dark:border-[#477663] dark:bg-[#142a22] dark:text-[#77c9a9] dark:hover:bg-[#19362b]"
      type="button"
      onClick={onClick}
    >
      <Plus size={18} />
      {children}
    </button>
  );
}

export function TagEditor({
  label,
  items,
  onChange,
  placeholder,
  suggestions = [],
  required = false,
}) {
  const [value, setValue] = useState("");

  const add = (raw = value) => {
    const item = raw.trim();
    if (
      item &&
      !items.some((entry) => entry.toLowerCase() === item.toLowerCase())
    ) {
      onChange([...items, item]);
    }
    setValue("");
  };

  return (
    <div>
      <label className="text-xs font-extrabold text-[#33453e] dark:text-[#d9e6e1]">
        {label}
        {required && <b className="ml-1 text-[#d84f45]">*</b>}
      </label>
      <div className="mt-2 flex min-h-[54px] flex-wrap items-center gap-1.5 rounded-[9px] border border-[#dce3df] p-[7px] focus-within:border-[#3b826d] focus-within:ring-3 focus-within:ring-[#3b826d]/10 dark:border-[#34463f] dark:bg-[#14231e] dark:focus-within:border-[#54b894]">
        {items.map((item) => (
          <span
            className="flex items-center gap-1.5 rounded-md bg-[#def0e8] px-2.5 py-2 text-xs font-bold text-[#22644f] dark:bg-[#24483b] dark:text-[#8bd5b8]"
            key={item}
          >
            {item}
            <button
              className="grid border-0 bg-transparent p-0"
              type="button"
              onClick={() => onChange(items.filter((entry) => entry !== item))}
              aria-label={`Remove ${item}`}
            >
              <X size={13} />
            </button>
          </span>
        ))}
        <input
          className="h-[34px] min-w-[180px] flex-1 border-0 bg-transparent px-2 outline-none"
          value={value}
          placeholder={items.length ? "Add another..." : placeholder}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === ",") {
              event.preventDefault();
              add();
            }
          }}
        />
        <button
          className="flex h-[34px] items-center gap-1 rounded-lg bg-brand px-3 text-xs font-bold text-white"
          type="button"
          onClick={() => add()}
        >
          <Plus size={16} /> Add
        </button>
      </div>
      {!!suggestions.length && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-[11px] text-[#89938f]">Suggested:</span>
          {suggestions
            .filter((item) => !items.includes(item))
            .slice(0, 6)
            .map((item) => (
              <button
                className="rounded-full border border-[#dfe5e1] bg-white px-2.5 py-1 text-[11px] text-[#5c6a65] dark:border-[#3b4d46] dark:bg-[#182720] dark:text-[#b9c7c1]"
                type="button"
                key={item}
                onClick={() => add(item)}
              >
                + {item}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}

export function StepHeader({ eyebrow, title, text }) {
  return (
    <header className="mb-9 max-sm:mb-7">
      <span className="mb-3 block text-[11px] font-extrabold uppercase tracking-[2px] text-[#df7455]">
        {eyebrow}
      </span>
      <h1 className="font-heading text-[32px] font-bold tracking-[-1px] text-[#18362e] max-sm:text-3xl dark:text-[#f0f7f4]">
        {title}
      </h1>
      <p className="mt-2 text-sm leading-6 text-[#74817c] dark:text-[#aabbb4]">
        {text}
      </p>
    </header>
  );
}
