import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerUser, removeUser, updateUser } from "../../store/usersSlice";
import { useEffect, useState } from "react";
import { XIcon } from "lucide-react";

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

  const handleDelete = () => {
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    dispatch(removeUser(user.id));
    setIsOpen(false);
    setShowDeleteConfirmation(false);
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  useEffect(() => {
    reset(user);
  }, [reset, user]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-3xl rounded-lg p-6 relative shadow-lg overflow-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={() => setIsOpen(false)}
          aria-label="Fermer"
        >
          <XIcon className="w-5 h-5" />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-4">
          {user ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}
        </h2>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Username & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                {...register("username", { required: "Username is required" })}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* First name & Last name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Prénom
              </label>
              <input
                type="text"
                {...register("prenom", { required: "First name is required" })}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.prenom && (
                <p className="text-red-500 text-sm">{errors.prenom.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nom
              </label>
              <input
                type="text"
                {...register("nom", { required: "Last name is required" })}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.nom && (
                <p className="text-red-500 text-sm">{errors.nom.message}</p>
              )}
            </div>
          </div>

          {/* CIN & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                CIN
              </label>
              <input
                type="text"
                {...register("cin")}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Téléphone
              </label>
              <input
                type="text"
                {...register("tel")}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          {/* Role & Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Rôle
              </label>
              <input
                type="text"
                {...register("role")}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Statut
              </label>
              <input
                type="text"
                {...register("status")}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          {/* Passwords */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <input
                type="password"
                {...register("password")}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirmer mot de passe
              </label>
              <input
                type="password"
                {...register("confirmPassword")}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="">
              <label className="block text-sm font-medium text-gray-700">
                Upload Avatar{" "}
              </label>
              <input
                type="file"
                accept="image/*"
                {...register("avatar")}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm file:mr-3 file:py-2 file:px-4 file:border-0 file:bg-primary-100 file:text-primary-600 file:rounded-lg hover:file:bg-primary-200 transition"
              />
              {errors.avatar && (
                <p className="text-red-500">{errors.avatar.message}</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            {user && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 text-sm rounded-md border border-red-300 text-red-600 hover:bg-red-100"
              >
                Supprimer
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm rounded-md bg-primary-500 text-white hover:bg-primary-700"
            >
              {user ? "Mettre à jour" : "Enregistrer"}
            </button>
          </div>
        </form>

        {/* Delete Confirmation */}
        {showDeleteConfirmation && (
          <div className="mt-4 p-4 border border-red-300 bg-red-50 rounded-md">
            <p className="text-sm mb-2 text-red-600">
              Êtes-vous sûr de vouloir supprimer cet utilisateur ?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100"
              >
                Annuler
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
              >
                Confirmer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserModal;
