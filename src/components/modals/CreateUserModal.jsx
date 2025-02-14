import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const UserModal = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("Form submitted", data);
    setIsOpen(false);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex sm:items-center justify-center ${
        !isOpen && "hidden"
      }`}
    >
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={() => setIsOpen(false)}
      ></div>

      <div className=" h-full max-h-fit   relative bg-white overflow-auto rounded-lg shadow-lg w-full p-6 flex flex-col max-w-2xl lg:max-w-4xl">
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Create User</h3>
          <button
            type="button"
            className="text-gray-400 hover:bg-gray-200 rounded-full p-1"
            onClick={() => setIsOpen(false)}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 p-2"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-medium">Username</label>
              <input
                type="text"
                {...register("username", { required: "Username is required" })}
                className="border rounded-lg p-2"
              />
              {errors.username && (
                <p className="text-red-500">{errors.username.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-medium">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="border rounded-lg p-2"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-medium">CIN</label>
              <input
                type="text"
                {...register("cin", { required: "CIN is required" })}
                className="border rounded-lg p-2"
              />
              {errors.cin && (
                <p className="text-red-500">{errors.cin.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-medium">Password</label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className="border rounded-lg p-2"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-medium">Confirm Password</label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                })}
                className="border rounded-lg p-2"
              />
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-medium">Upload Avatar</label>
              <input
                type="file"
                accept="image/*"
                {...register("avatar", { required: "Avatar is required" })}
                className="border rounded-lg p-2"
              />
              {errors.avatar && (
                <p className="text-red-500">{errors.avatar.message}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-800"
          >
            Create User
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
