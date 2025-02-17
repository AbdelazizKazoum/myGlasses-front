import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerUser, removeUser, updateUser } from "../../store/usersSlice";
import { useEffect, useState } from "react";

const UserModal = ({ isOpen, setIsOpen, user }) => {
  // State
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  // Hooks
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: user });

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const userData = {
      email: data.email,
      username: data.username,
      cin: data.cin,
      nom: data.nom,
      prenom: data.prenom,
      tel: data.tel || "",
      password: data.password,
      role: data.role,
      status: data.status || "",
    };

    console.log("Form submitted", userData);

    if (user) {
      await dispatch(updateUser({ id: user.id, data: userData }));
    } else {
      await dispatch(registerUser(data));
    }
    // setIsOpen(false);
  };

  const handleDelete = () => {
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    dispatch(removeUser(user.id)); // Dispatch removeUser action
    setIsOpen(false); // Close modal after deletion
    setShowDeleteConfirmation(false); // Hide confirmation modal
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false); // Close confirmation modal
  };

  useEffect(() => {
    reset(user);
  }, [reset, user]);

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
              <label className="font-medium">First name</label>
              <input
                type="text"
                {...register("nom", { required: "First name is required" })}
                className="border rounded-lg p-2"
              />
              {errors.nom && (
                <p className="text-red-500">{errors.nom.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-medium">Last name</label>
              <input
                type="text"
                {...register("prenom", { required: "last name is required" })}
                className="border rounded-lg p-2"
              />
              {errors.prenom && (
                <p className="text-red-500">{errors.prenom.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-medium">CIN</label>
              <input
                type="text"
                {...register("cin")}
                className="border rounded-lg p-2"
              />
              {errors.cin && (
                <p className="text-red-500">{errors.cin.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-medium">Phone</label>
              <input
                type="text"
                {...register("tel")}
                className="border rounded-lg p-2"
              />
              {errors.tel && (
                <p className="text-red-500">{errors.tel.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-medium">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: user ? false : "Password is required",
                })}
                className="border rounded-lg p-2"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-medium">Confirm Password</label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: user ? false : "Confirm Password is required",
                })}
                className="border rounded-lg p-2"
              />
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-medium">Role</label>
              <select
                {...register("role", { required: "Role is required" })}
                className="border rounded-lg p-2"
              >
                <option value="">Select Role</option>
                <option value="client">Client</option>
                <option value="admin">Admin</option>
              </select>
              {errors.role && (
                <p className="text-red-500">{errors.role.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-medium">Upload Avatar</label>
              <input
                type="file"
                accept="image/*"
                {...register("avatar")}
                className="border rounded-lg p-2"
              />
              {errors.avatar && (
                <p className="text-red-500">{errors.avatar.message}</p>
              )}
            </div>
          </div>

          <div className="flex gap-2 justify-end ">
            <button
              type="submit"
              className=" w-44 h-12  bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-800"
            >
              {user ? "Update User" : "Create User"}
            </button>
            {user && (
              <button
                type="button"
                className="w-44 h-12 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-800"
                onClick={handleDelete}
              >
                Delete User
              </button>
            )}
          </div>
        </form>

        {/* Confirmation Modal */}
        {showDeleteConfirmation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-4">
                Are you sure you want to delete this user?
              </h3>
              <div className="flex justify-end space-x-4">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                  onClick={cancelDelete}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  onClick={confirmDelete}
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserModal;
