export enum ButtonTheme {
  Primary = "primary",
  Secondary = "secondary",
  Line = "line",
}

export enum ButtonSize {
  Small = "Small",
  Medium = "Medium",
  Large = "Large",
}

export interface ButtonProps {
  onClick?: () => void;
  label: string;
  type?: "button" | "submit" | "reset";
  theme?: ButtonTheme;
  size?: ButtonSize;
  rounded?: boolean;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: string;
}
