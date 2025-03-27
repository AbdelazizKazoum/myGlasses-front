export const statusOptions = [
  { value: "", label: "Select status..." },
  { value: "pending", label: "Pending" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

export const selectStyles = {
  control: (provided, state) => ({
    ...provided,
    borderColor: "#ccc",
    color: "#333",
    "&:hover": {
      borderColor: "#eab308",
    },
    boxShadow: state.isFocused ? "0 0 0 1px #eab308" : "none",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#fff",
    color: "#333",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#eab308"
      : state.isFocused
      ? "#f0f0f0"
      : "#fff",
    color: state.isSelected ? "#fff" : "#333",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#333",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#aaa",
  }),
};
