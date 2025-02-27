import React, { useEffect, useState } from "react";
import { FaList, FaUser, FaGlobe } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  getCategories,
  updateCategory,
} from "../../../store/categorySlice";
import Loader from "../../../components/Loader";
import { getImageUrl } from "../../../utils/getImageUrl";

const SettingsPage = () => {
  const [selectedTab, setSelectedTab] = useState("categories");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);

  const [editingCategory, setEditingCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hooks
  const dispatch = useDispatch();
  const { data: categories } = useSelector((state) => state.categories);

  useEffect(() => {
    (async () => {
      await dispatch(getCategories());
      setLoading(false);
    })();
  }, [dispatch]);

  const handleAddCategory = async () => {
    console.log(categoryImage);
    console.log(displayName);
    console.log(categoryName);

    const formData = new FormData();

    formData.append(
      "data",
      JSON.stringify({ displayText: displayName, category: categoryName })
    );

    formData.append("file", categoryImage);

    if (editingCategory) {
      await dispatch(updateCategory({ formData, id: editingCategory.id }));
    } else {
      await dispatch(addCategory(formData));
    }

    setIsModalOpen(false);
    await dispatch(getCategories());
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file && file.type.startsWith("image/")) {
      setCategoryImage(file);
    } else {
      console.error("Invalid file type. Please upload an image.");
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setCategoryName(category.category);
    setDisplayName(category.displayText);

    setIsModalOpen(true);
  };

  const clearEdit = () => {
    setDisplayName("");
    setCategoryImage(null);
    setDisplayName("");
  };

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col lg:flex-row h-full bg-gray-100">
      {/* Sidebar */}
      <div className="lg:w-1/3 text-gray-700   p-2">
        <h2 className="text-xl mb-4">Settings</h2>
        <div className="flex lg:flex-col gap-2 md:gap-0  ">
          {" "}
          <button
            onClick={() => setSelectedTab("categories")}
            className={`w-full text-left px-4 py-2 flex items-center gap-2 rounded-lg mb-2 ${
              selectedTab === "categories"
                ? "bg-primary-500 text-white font-semibold"
                : ""
            }`}
          >
            <FaList /> Categories
          </button>
          <button
            onClick={() => setSelectedTab("profile")}
            className={`w-full text-left px-4 py-2 flex items-center gap-2 rounded-lg mb-2 ${
              selectedTab === "profile"
                ? "bg-primary-500 text-white font-semibold"
                : ""
            }`}
          >
            <FaUser /> Profile
          </button>
          <button
            onClick={() => setSelectedTab("localization")}
            className={`w-full text-left px-4 py-2 flex items-center gap-2 rounded-lg mb-2 ${
              selectedTab === "localization"
                ? "bg-primary-500 text-white font-semibold"
                : ""
            }`}
          >
            <FaGlobe /> Localization
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 pt-6 lg:p-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          {selectedTab === "categories" && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Categories</h3>
                <button
                  onClick={() => {
                    setEditingCategory(null);
                    clearEdit("");
                    setIsModalOpen(true);
                  }}
                  className="bg-primary-500 text-white px-4 py-2 rounded-lg"
                >
                  Add Category
                </button>
              </div>
              <div className="border rounded p-3">
                <div className="grid text-gray-600 grid-cols-3 gap-4 border-b font-semibold p-2">
                  <span>IMAGE</span>
                  <span>CATEGORY NAME</span>
                  <span>DISPLAY NAME</span>
                </div>
                <ul>
                  {categories.map((category) => (
                    <li
                      key={category.id}
                      className="grid grid-cols-3 gap-4 p-3 border-b items-center"
                    >
                      <span className="text-gray-600 w-10 h-10  overflow-hidden">
                        <img
                          src={getImageUrl(category.imageUrl)}
                          className=" w-full h-full object-cover rounded-full "
                          alt=""
                          srcset=""
                        />
                      </span>
                      <span className="text-gray-600">{category.category}</span>
                      <span className="flex justify-between items-center text-gray-600">
                        {category.displayText}
                        <button
                          onClick={() => handleEditCategory(category)}
                          className="text-blue-500"
                        >
                          Edit
                        </button>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {selectedTab === "profile" && (
            <div>
              <h3 className="text-lg font-semibold">Profile Settings</h3>
              <p>Manage your profile information here.</p>
            </div>
          )}

          {selectedTab === "localization" && (
            <div>
              <h3 className="text-lg font-semibold">Localization Settings</h3>
              <p>Adjust your language and region settings.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              {editingCategory ? "Edit Category" : "Add Category"}
            </h3>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full p-2 border rounded-lg mb-4"
              placeholder="Enter category name"
            />
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full p-2 border rounded-lg mb-4"
              placeholder="Enter category display name "
            />
            <input
              type="file"
              onChange={(e) => handleImageUpload(e)}
              className="w-full p-2 border rounded-lg mb-4"
              placeholder="Chose category image "
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg"
              >
                {editingCategory ? "Save" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
