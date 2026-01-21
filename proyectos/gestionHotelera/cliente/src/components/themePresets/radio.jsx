export const greenRadioGroupSx = {
  // Label (FormLabel)
  "& .MuiFormLabel-root": {
    color: "rgba(255,255,255,0.8)",
    mb: 1,
    "&.Mui-focused": {
      color: "#fff",
    },
  },

  // Radio icons
  "& .MuiRadio-root": {
    color: "rgba(255,255,255,0.6)",
    "&.Mui-checked": {
      color: "#22c55e",
    },
  },

  // Radio text labels
  "& .MuiFormControlLabel-label": {
    color: "#fff",
  },

  // Helper text
  "& .MuiFormHelperText-root": {
    color: "#22c55e",
  },

  "& .MuiFormHelperText-root.Mui-error": {
    color: "#9b581a",
  },
};
