import React, { useState } from "react";
import dayjs from "dayjs";
import { getImageUrl } from "../../../utils/getImageUrl";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";
import Select from "react-select";
import { FaCalendarAlt } from "react-icons/fa";

const CommandsTable = ({ commands }) => {
  const [selectedCommand, setSelectedCommand] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedUsername, setSelectedUsername] = useState("");

  const statusOptions = [
    { value: "", label: "Tous les statuts" },
    { value: "en attente", label: "En attente" },
    { value: "confirmé", label: "Confirmé" },
  ];

  const filteredCommands = commands.filter((command) => {
    const matchesDate = selectedDate
      ? dayjs(command.date_commande).isSame(selectedDate, "day")
      : true;
    const matchesStatus = selectedStatus
      ? command.statut === selectedStatus.value
      : true;
    const matchesUsername = selectedUsername
      ? command?.utilisateur?.username
          .toLowerCase()
          .includes(selectedUsername.toLowerCase())
      : true;

    return matchesDate && matchesStatus && matchesUsername;
  });

  const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      // backgroundColor: "#f7f7f7", // Change background color of the control (select box)
      borderColor: "#ccc", // Default border color
      color: "#333", // Default text color
      "&:hover": {
        borderColor: "#eab308", // Change border color on hover
      },
      boxShadow: state.isFocused ? "0 0 0 1px #eab308" : "none", // Border color on focus
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#fff", // Background color of the dropdown menu
      color: "#333", // Text color in the menu
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#eab308"
        : state.isFocused
        ? "#f0f0f0"
        : "#fff", // Option background on hover or selected
      color: state.isSelected ? "#fff" : "#333", // Option text color
      "&:hover": {
        backgroundColor: "", // Hover background color of the options
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#333", // Text color for selected value
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#aaa", // Placeholder text color
    }),
  };

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg h-full">
      <div className="p-4 flex gap-4 items-center z-50">
        <div className="relative w-full">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
            className="p-2 border rounded w-full flex outline-primary-500"
            placeholderText="Filtrer par date"
            styles={{ display: "flex" }}
          />
          <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
        <Select
          options={statusOptions}
          value={selectedStatus}
          onChange={setSelectedStatus}
          className="w-full outline-none border-select"
          styles={selectStyles} // Apply custom styles here
        />
        <input
          type="text"
          placeholder="Filtrer par utilisateur"
          className="p-2 rounded w-full border"
          value={selectedUsername}
          onChange={(e) => setSelectedUsername(e.target.value)}
        />
      </div>

      {filteredCommands.length > 0 ? (
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Statut
              </th>
              <th scope="col" className="px-6 py-3">
                Total
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCommands.map((command) => (
              <tr
                key={command.id}
                className="bg-white border-b hover:bg-gray-50"
              >
                <td className="px-6 py-4 text-gray-900">
                  {command?.utilisateur?.username}
                </td>
                <td className="px-6 py-4">
                  {dayjs(command.date_commande).format("DD/MM/YYYY")}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      command.statut === "en attente"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-green-200 text-green-800"
                    }`}
                  >
                    {command.statut}
                  </span>
                </td>
                <td className="px-6 py-4">{command.total} DH</td>
                <td className="px-6 py-4">
                  <button
                    className="font-medium text-blue-600 hover:underline"
                    onClick={() => setSelectedCommand(command)}
                  >
                    Voir détails
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="p-4 text-gray-500">Aucune commande trouvée.</p>
      )}

      {selectedCommand && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">
              Détails de la commande
            </h2>
            <p className="text-lg font-bold text-gray-800 mb-4">
              Total: {selectedCommand.total} DH
            </p>
            <ul className="mb-4">
              {selectedCommand.details.map((detail, index) => (
                <li
                  key={index}
                  className="border-b py-2 flex items-center gap-4"
                >
                  <img
                    src={getImageUrl(detail.product.image)}
                    alt={detail.product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold">{detail.product.name}</p>
                    <p>
                      {detail.quantite} x {detail.prix_vente} DH
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => setSelectedCommand(null)}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommandsTable;
