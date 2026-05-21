import { useState } from "react";
import {useMutation,useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { Lead } from "../../types/lead";
import { deleteLead } from "../../services/leadService";
import EditLeadModal from "./EditLeadModal";
import useAuthStore from "../../store/authStore";



interface Props {
    leads: Lead[];
}

const LeadsTable = ({
  leads,
}: Props) => {
  const queryClient = useQueryClient();

  const user = useAuthStore(
    (state) => state.user
  );

  const [selectedLead, setSelectedLead] =
    useState<Lead | null>(null);

  const [isEditOpen, setIsEditOpen] =
    useState(false);

  const mutation = useMutation({
    mutationFn: deleteLead,

    onSuccess: () => {
      toast.success(
        "Lead deleted successfully"
      );

      queryClient.invalidateQueries({
        queryKey: ["leads"],
      });
    },

    onError: () => {
      toast.error(
        "Failed to delete lead"
      );
    },
  });

  const handleDelete = (
    id: string
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this lead?"
    );

    if (confirmed) {
      mutation.mutate(id);
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 dark:text-gray-400  rounded-2xl shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-600 dark:text-gray-300">
            <tr>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Source</th>
              <th className="text-left p-4">Created By</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>

          <tbody>

            {
                leads.length === 0 ? (
                    <tr>
                        <td colSpan={6} className="text-center py-10 text-gray-500">
                            No leads found
                        </td>
                    </tr>
                ) : ( leads.map((lead) => (
              <tr key={lead._id} className="border-t">
                <td className="p-4">{lead.name}</td>
                <td className="p-4">{lead.email}</td>
                <td className="p-4">
                    <span
                        className={`px-3 py-1 rounded-full text-sm font-medium capitalize
                            ${ lead.status === "qualified" ? "bg-green-100 text-green-700"
                                : lead.status === "contacted" ? "bg-blue-100 text-blue-700"
                                : lead.status === "lost" ? "bg-red-100 text-red-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                        >
                        {lead.status}
                    </span>
                </td>
                <td className="p-4 capitalize">{lead.source}</td>
                <td className="p-4">{lead.createdBy?.name}</td>

                {/* ACTIONS */}
                <td className="p-4">
                  <div className="flex gap-2">

                    {/* EDIT */}
                    <button
                      onClick={() => {
                        setSelectedLead(lead);
                        setIsEditOpen(true);
                      }}
                      className="bg-yellow-400 dark:bg-yellow-700 text-white dark:text-gray-800 px-3 py-1 rounded-lg text-sm cursor-pointer"
                    >
                      Edit
                    </button>

                    {/* DELETE */}
                    {user?.role === "admin" && (
                      <button
                        onClick={() =>
                          handleDelete(
                            lead._id
                          )
                        }
                        className="bg-red-500 dark:bg-red-700 text-white dark:text-gray-800 px-3 py-1 rounded-lg text-sm cursor-pointer"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))
        )}
          </tbody>
            

        </table>
      </div>

      {/* EDIT MODAL */}
      <EditLeadModal
        isOpen={isEditOpen}
        onClose={() =>
          setIsEditOpen(false)
        }
        lead={selectedLead}
      />
    </>
  );
};

export default LeadsTable;