import React, { useState } from "react";
import dayjs from "dayjs";
import "react-datepicker/dist/react-datepicker.css";
import CommandDetailModal from "../../modals/CommandDetailModal";
import { useDispatch } from "react-redux";
import { getCommandes, updateCommande } from "../../../store/commandeSlice";
import "./index.css";
import { getCommandStatusColor } from "../../../utils/getStatusColor";
import TableHeader from "../products/TableHeader";

const CommandsTable = ({ commands }) => {
  // States
  const [filters, setFilters] = useState({
    searchInput: "",
    gender: "",
    priceRange: "",
    rating: "",
    priceSort: "",
    brand: "",
    minPrice: "",
    maxPrice: "",
  });
  const [selectedCommand, setSelectedCommand] = useState(null);
  const [newTotal, setNewTotal] = useState(selectedCommand?.total); // State to manage total price
  const [newStatus, setNewStatus] = useState(""); // State to manage status

  // Hooks
  const dispatch = useDispatch();

  const handleUpdateCommand = async () => {
    if (selectedCommand) {
      const updatedCommand = {
        ...selectedCommand,
        total: newTotal || selectedCommand.total,
        status: newStatus || selectedCommand.status,
      };

      await dispatch(
        updateCommande({
          id: selectedCommand.id,
          data: { newTotal, status: newStatus },
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
      <TableHeader filters={filters} setFilters={setFilters} />

      {commands.length > 0 ? (
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
            {commands.map((command) => (
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
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${getCommandStatusColor(
                      command.status
                    )}`}
                  >
                    {command.status}
                  </span>
                </td>
                <td className="px-6 py-4">{command.total} DH</td>
                <td className="px-6 py-4">
                  <button
                    className="font-medium text-blue-600 hover:underline"
                    onClick={() => {
                      setSelectedCommand(command);
                      setNewStatus(command.status); // Initialize newStatus correctly
                      setNewTotal(command.total); // Initialize newTotal as well
                    }}
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
