export const statusOptions = [
  { value: "", label: "Tous les statuts" },
  { value: "en attente", label: "En attente" },
  { value: "expédiée", label: "Expédiée" },
  { value: "livrée", label: "Livrée" },
  { value: "annulée", label: "Annulée" },
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
