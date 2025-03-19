import React, { useState } from "react";
import { FaList, FaUser, FaGlobe } from "react-icons/fa";
import CategoriesTab from "../../../components/dashboard/SettingsPage/CategoriesTab";
import ProfileTab from "../../../components/dashboard/SettingsPage/ProfileTab";
import FournisseurTab from "../../../components/dashboard/SettingsPage/FournisseurTab";

const SettingsPage = () => {
  const [selectedTab, setSelectedTab] = useState("categories");

  return (
    <div className="flex flex-col lg:flex-row h-full bg-gray-100">
      {/* Sidebar */}
      <div className="lg:w-1/4 text-gray-700 p-2">
        <h2 className="text-xl mb-4">Settings</h2>
        <div className="flex lg:flex-col gap-2 md:gap-0">
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
            onClick={() => setSelectedTab("fournisseur")}
            className={`w-full text-left px-4 py-2 flex items-center gap-2 rounded-lg mb-2 ${
              selectedTab === "fournisseur"
                ? "bg-primary-500 text-white font-semibold"
                : ""
            }`}
          >
            <FaGlobe /> Fournisseur
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 pt-6 lg:p-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          {selectedTab === "categories" && <CategoriesTab />}
          {selectedTab === "profile" && <ProfileTab />}
          {selectedTab === "fournisseur" && <FournisseurTab />}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
