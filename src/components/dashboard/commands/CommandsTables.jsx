import React, { useState } from "react";
import dayjs from "dayjs";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import CommandDetailModal from "../../modals/CommandDetailModal";
import { selectStyles, statusOptions } from "../../../utils/utils";
import { useDispatch } from "react-redux";
import { getCommandes, updateCommande } from "../../../store/commandeSlice";
import "./index.css";

const CommandsTable = ({ commands }) => {
  const [selectedCommand, setSelectedCommand] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedUsername, setSelectedUsername] = useState("");
  const [newTotal, setNewTotal] = useState(selectedCommand?.total); // State to manage total price
  const [newStatus, setNewStatus] = useState(""); // State to manage status

  // Hooks
  const dispatch = useDispatch();

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

  const handleUpdateCommand = async () => {
    if (selectedCommand) {
      const updatedCommand = {
        ...selectedCommand,
        total: newTotal || selectedCommand.total,
        statut: newStatus || selectedCommand.statut,
      };

      await dispatch(
        updateCommande({
          id: selectedCommand.id,
          data: { newTotal, statut: newStatus },
        })
      );

      await dispatch(getCommandes());

      setSelectedCommand(updatedCommand);
      setNewTotal(""); // Clear the new total input
      setNewStatus(""); // Clear the new status input
      setSelectedCommand(null);
    }
  };

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg h-full bg-white">
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
          styles={selectStyles}
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
                Client
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
        <CommandDetailModal
          selectedCommand={selectedCommand}
          setSelectedCommand={setSelectedCommand}
          newTotal={newTotal}
          setNewTotal={setNewTotal}
          newStatus={newStatus}
          setNewStatus={setNewStatus}
          handleUpdateCommand={handleUpdateCommand}
        />
      )}
    </div>
  );
};

export default CommandsTable;
