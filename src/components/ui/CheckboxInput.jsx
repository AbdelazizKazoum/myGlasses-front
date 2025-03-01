// Checkbox Input Component
const CheckboxInput = ({ label, name, register }) => {
  return (
    <div className=" text-gray-700 ">
      <label className="block mb-1">{label}</label>
      <input type="checkbox" {...register(name)} />
    </div>
  );
};

export default CheckboxInput;
