export const greenInputSx = {
  input: { color: "#fff" },

  "& .MuiInputLabel-root": {
    color: "rgba(255,255,255,0.8)",
  },

  "& .MuiInputLabel-root.Mui-focused": {
    color: "#fff",
  },

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255,255,255,0.6)",
  },

  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#22c55e",
  },

  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#22c55e",
    borderWidth: 2,
  },

  "& .MuiFormHelperText-root": {
    color: "#22c55e",
  },

  "& .MuiFormHelperText-root.Mui-error": {
    color: "#9b581a",
  },
};