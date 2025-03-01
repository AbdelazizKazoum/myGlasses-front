// Textarea Component
const TextArea = ({ label, name, register }) => {
  return (
    <div className=" text-gray-700 ">
      <label className="block mb-1">{label}</label>
      <textarea
        {...register(name)}
        className="border p-2 w-full rounded"
      ></textarea>
    </div>
  );
};

export default TextArea;
