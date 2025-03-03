const CheckboxInput = ({ label, name, register }) => {
  return (
    <div className="flex flex-col justify-center space-x-2 text-gray-700">
      <label className="block mb-1">{label}</label>

      <input
        type="checkbox"
        {...register(name)}
        className="h-8 w-8 rounded border-gray-300 text-primary-500 focus:ring-2 focus:ring-primary-300 transition duration-200"
      />
    </div>
  );
};

export default CheckboxInput;
