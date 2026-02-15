export type InputType =
  | "text"
  | "password"
  | "email"
  | "number"
  | "tel"
  | "url"
  | "search"
  | "date"
  | "time"
  | "datetime-local"
  | "month"
  | "week"
  | "color";

export interface InputProps {
  modelValue?: string | number;
  type?: InputType;
  placeholder?: string;
  label?: string;
  hint?: string;
  disabled?: boolean;
  error?: string;
  iconLeft?: string;
  iconRight?: string;
  id?: string;
  name?: string;
  autocomplete?: string;
  autofocus?: boolean;
  readonly?: boolean;
  required?: boolean;
}

export interface InputEmits {
  (e: "update:modelValue", value: string): void;
  (e: "focus", event: FocusEvent): void;
  (e: "blur", event: FocusEvent): void;
  (e: "input", event: Event): void;
  (e: "change", event: Event): void;
}
