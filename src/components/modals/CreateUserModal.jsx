import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerUser, removeUser, updateUser } from "../../store/usersSlice";
import { useEffect, useState } from "react";
import { X, Trash2 } from "lucide-react";
import Button from "../ui/Button";
const UserModal = ({ isOpen, setIsOpen, user }) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
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

    if (user) {
      await dispatch(updateUser({ id: user.id, data: userData }));
    } else {
      await dispatch(registerUser(data));
    }
    setIsOpen(false);
  };

  const handleDelete = () => setShowDeleteConfirmation(true);
  const confirmDelete = () => {
    dispatch(removeUser(user.id));
    setIsOpen(false);
    setShowDeleteConfirmation(false);
  };
  const cancelDelete = () => setShowDeleteConfirmation(false);

  useEffect(() => {
    reset(user);
  }, [user, reset]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between border-b pb-4 mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            {user ? "Update User" : "Create User"}
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                {...register("username", { required: "Username is required" })}
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              {errors.username && (
                <p className="text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                {...register("nom", { required: "First name is required" })}
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              {errors.nom && (
                <p className="text-sm text-red-500">{errors.nom.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                {...register("prenom", { required: "Last name is required" })}
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              {errors.prenom && (
                <p className="text-sm text-red-500">{errors.prenom.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">CIN</label>
              <input
                {...register("cin")}
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Phone</label>
              <input
                {...register("tel")}
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                {...register("password", {
                  required: !user && "Password is required",
                })}
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: !user && "Confirm Password is required",
                })}
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Role</label>
              <select
                {...register("role", { required: "Role is required" })}
                className="w-full border rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select Role</option>
                <option value="client">Client</option>
                <option value="admin">Admin</option>
              </select>
              {errors.role && (
                <p className="text-sm text-red-500">{errors.role.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Upload Avatar
              </label>
              <input
                type="file"
                accept="image/*"
                {...register("avatar")}
                className="w-full border rounded-lg p-2 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t pt-6">
            <Button type="submit" className="w-40">
              {user ? "Update User" : "Create User"}
            </Button>
            {user && (
              <Button
                type="button"
                variant="destructive"
                className="w-40 flex items-center gap-2"
                onClick={handleDelete}
              >
                <Trash2 className="w-4 h-4" /> Delete User
              </Button>
            )}
          </div>
        </form>

        {showDeleteConfirmation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl p-6 shadow-xl w-full max-w-sm">
              <h4 className="text-lg font-semibold mb-4">
                Are you sure you want to delete this user?
              </h4>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={cancelDelete}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={confirmDelete}>
                  Yes, Delete
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserModal;
