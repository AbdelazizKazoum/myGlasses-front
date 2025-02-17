import React, { useState } from "react";
import dayjs from "dayjs";
import { getImageUrl } from "../../../utils/getImageUrl";

const CommandsTable = ({ commands }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCommand, setSelectedCommand] = useState(null);

  const filteredCommands = commands.filter((command) =>
    dayjs(command.date_commande).format("DD/MM/YYYY").includes(searchQuery)
  );

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <div className="p-4">
        <input
          type="text"
          placeholder="Rechercher par date (DD/MM/YYYY)"
          className="p-2 border rounded w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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
