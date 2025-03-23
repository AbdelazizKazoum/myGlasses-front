import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFilterdCommands,
  updateCommande,
} from "../../../store/commandeSlice";
import Loader from "../../../components/Loader";
import CommandDetailModal from "../../../components/modals/CommandDetailModal";
import TableHeader from "../../../components/dashboard/products/TableHeader";
import dayjs from "dayjs";
import {
  getCommandStatusColor,
  getPaymentStatusColor,
} from "../../../utils/getStatusColor";
import { PencilIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CommandsHeader from "../../../components/dashboard/commands/CommandsHeader";

const CommandsPage = () => {
  // States
  const [filters, setFilters] = useState({
    searchInput: "",
    status: "",
    paymentStatus: "",
    userId: "",
    sortByDate: "DESC",
    startDate: "",
    endDate: "",
    totalMin: "",
    totalMax: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10); // You can make this dynamic if needed
  const [loading, setLoading] = useState(false);
  const [selectedCommand, setSelectedCommand] = useState(null);
  const [newTotal, setNewTotal] = useState(""); // State to manage total price
  const [newStatus, setNewStatus] = useState(""); // State to manage status

  // Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    commands,
    pagination: { total },
  } = useSelector((state) => state.commande);

  useEffect(() => {
    setLoading(true);
    (async () => {
      await dispatch(
        getFilterdCommands({
          filters,
          pagination: { page: currentPage, limit },
        })
      );
      setLoading(false);
    })();
  }, [dispatch, filters, currentPage, limit]);

  const totalPages = Math.ceil(total / limit);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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

      await dispatch(
        getFilterdCommands({
          filters,
          pagination: { page: currentPage, limit },
        })
      );

      setSelectedCommand(updatedCommand);
      setNewTotal(""); // Clear the new total input
      setNewStatus(""); // Clear the new status input
      setSelectedCommand(null);
    }
  };

  return (
    <div className=" h-full ">
      <div className="overflow-x-auto shadow-md sm:rounded-lg h-full bg-white">
        <CommandsHeader filters={filters} setFilters={setFilters} />

        {commands.length > 0 ? (
          <table className="min-w-full border text-sm text-left text-gray-500">
            <thead className="text-xs border text-gray-700 uppercase bg-gray-50">
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
                  Payment Statut
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
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(
                        command.paymentStatus
                      )}`}
                    >
                      {command.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">{command.total} DH</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        setSelectedCommand(command);
                        setNewStatus(command.status); // Initialize newStatus
                        setNewTotal(command.total); // Initialize newTotal
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-primary border border-primary rounded-md hover:bg-primary hover:text-white transition"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="p-4 text-gray-500">Aucune commande trouvée.</p>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-end gap-3 py-4 px-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(1)}
              className={`px-4 py-2 ${
                currentPage === 1
                  ? "bg-primary-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } rounded-md`}
            >
              1
            </button>
            {currentPage > 2 && <span className="text-gray-500">...</span>}
            {currentPage > 1 && currentPage < totalPages && (
              <button
                onClick={() => handlePageChange(currentPage)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                {currentPage}
              </button>
            )}
            {currentPage < totalPages - 1 && (
              <span className="text-gray-500">...</span>
            )}
            {totalPages > 1 && (
              <button
                onClick={() => handlePageChange(totalPages)}
                className={`px-4 py-2 ${
                  currentPage === totalPages
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                } rounded-md`}
              >
                {totalPages}
              </button>
            )}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
      ){/* Command Detail Modal */}
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

export default CommandsPage;
