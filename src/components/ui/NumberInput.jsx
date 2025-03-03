const NumberInput = ({ label, name, step = "1", register, errors }) => {
  return (
    <div className="text-gray-700">
      <label className="block mb-1">{label}</label>
      <input
        type="number"
        step={step}
        {...register(name, { valueAsNumber: true })} // Convert value to number
        className="border rounded p-2 w-full"
      />
      {errors[name] && <p className="text-red-500">{errors[name].message}</p>}
    </div>
  );
};

export default NumberInput;
