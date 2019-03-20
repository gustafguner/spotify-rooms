export interface InputProps {
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: ((event: React.FocusEvent<HTMLInputElement>) => void);
  value?: string | number | string[];
}
