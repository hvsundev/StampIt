export enum ButtonTheme {
  Primary = "Primary",
  Secondary = "Secondary",
  Line = "Line",
}

export interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  theme?: ButtonTheme;
  rounded?: boolean;
  disabled?: boolean;
  loading?: boolean;
}
