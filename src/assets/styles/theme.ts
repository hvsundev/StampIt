const colors = {
  white: "#fff",
  primary: "#3b82f6",
  red: "#ff7b7b",
  paleRed: "#ffcccc",
  paleGray: "#f1f1f1",
  gray: "#e9e9e9",
  deepGray: "#b9b9b9",
};

const opacityColors = {
  primary_20: "rgba(59,130,246,0.2)",
  primary_30: "rgba(59,130,246,0.3)",
  paleGray_50: "rgba(241,241,241,0.5)",
};

const theme = {
  colors,
  opacityColors,
};

export type AppTheme = typeof theme;
export default theme;
