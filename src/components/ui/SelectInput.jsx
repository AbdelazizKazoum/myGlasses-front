// Select Input Component
const SelectInput = ({ label, name, options, register, errors }) => {
  return (
    <div className=" text-gray-700 ">
      <label className="block mb-1">{label}</label>
      <select {...register(name)} className="border p-2 w-full rounded">
        <option value="">Select</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {errors[name] && <p className="text-red-500">{errors[name].message}</p>}
    </div>
  );
};

export default SelectInput;
