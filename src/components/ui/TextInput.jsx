// Text Input Component
const TextInput = ({ label, name, register, errors }) => {
  return (
    <div className=" text-gray-700  ">
      <label className="block mb-1 ">{label}</label>
      <input {...register(name)} className="border p-2 w-full rounded" />
      {errors[name] && <p className="text-red-500">{errors[name].message}</p>}
    </div>
  );
};

export default TextInput;
