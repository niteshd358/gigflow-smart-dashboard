import { useForm } from "react-hook-form";

import {useMutation,useQueryClient} from "@tanstack/react-query";

import toast from "react-hot-toast";

import { updateLead } from "../../services/leadService";

import type { Lead } from "../../types/lead";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    lead: Lead | null;
}

const EditLeadModal = ({isOpen,onClose,lead}: Props) => {
  const queryClient = useQueryClient();

  const {register,handleSubmit,} = useForm({
        values: {
            name: lead?.name || "",
            email: lead?.email || "",
            status: lead?.status || "new",
            source: lead?.source || "website",
        },
  });

  const mutation = useMutation({mutationFn: (data: any) => updateLead(lead!._id, data),
    onSuccess: () => { 
        toast.success("Lead updated successfully");

        queryClient.invalidateQueries({
            queryKey: ["leads"],
        });

        onClose();
    },

    onError: () => {
        toast.error("Failed to update lead");
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };

  if (!isOpen || !lead) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white  rounded-2xl p-6 w-full max-w-lg">
        
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
                Edit Lead
            </h2>

            <button
                onClick={onClose}
                className="text-xl text-gray-500"
            >
                ✕
            </button>
        </div>


        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
            <input
                type="text"
                {...register("name")}
                className="w-full border p-3 rounded-lg"
            />

            <input
                type="email"
                {...register("email")}
                className="w-full border p-3 rounded-lg"
            />

            <select
                {...register("status")}
                className="w-full border p-3 rounded-lg"
            >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="lost">Lost</option>
            </select>

            <select
                {...register("source")}
                className="w-full border p-3 rounded-lg"
            >
                <option value="website">Website</option>
                <option value="instagram">Instagram</option>
                <option value="referral">Referral</option>
                <option value="other">Other</option>
            </select>

            <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold"
            >
                {mutation.isPending ? "Updating..." : "Update Lead"}
            </button>
        </form>
      </div>
    </div>
  );
};

export default EditLeadModal;