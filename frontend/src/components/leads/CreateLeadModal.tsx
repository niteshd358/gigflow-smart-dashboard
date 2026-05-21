import {useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createLead } from "../../services/leadService"; 
import { createLeadSchema } from "../../validators/leadValidator";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const CreateLeadModal = ({isOpen,onClose,}: Props) => {
  const queryClient = useQueryClient();
  
  const { register, handleSubmit, reset, formState: {errors}, } = useForm({
    resolver: zodResolver(createLeadSchema)
  });
  
  const mutation = useMutation({
    mutationFn: createLead,
    onSuccess: () => {
      toast.success("Lead created successfully");
      queryClient.invalidateQueries(
        {
          queryKey: ["leads"],
        }
      );
      reset();
      onClose();
    },
    onError: () => {
      toast.error("Lead creation failed to create lead");
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };

  if(!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white   rounded-2xl p-6 w-full max-w-lg">
        
        
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            Create Lead
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 text-xl cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
                
            {/* NAME */}
            <div>
                <input
                    type="text"
                    placeholder="Lead Name"
                    {...register("name")}
                    className="w-full border p-3 rounded-lg"
                />

                {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                        {String(
                        errors.name.message
                        )}
                    </p>
                )}
            </div>

            {/* EMAIL */}
            <div>
                <input
                    type="email"
                    placeholder="Lead Email"
                    {...register("email")}
                    className="w-full border p-3 rounded-lg"
                />

                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                        {String(
                        errors.email.message
                        )}
                    </p>
                )}
            </div>

            {/* STATUS */}

            <div>
                <select
                    {...register("status")}
                    className="w-full border p-3 rounded-lg"
                >
                    <option value="">
                        Select Status
                    </option>

                    <option value="new">
                        New
                    </option>

                    <option value="contacted">
                        Contacted
                    </option>

                    <option value="qualified">
                        Qualified
                    </option>

                    <option value="lost">
                        Lost
                    </option>
                </select>
            </div>

            {/* SOURCE */}

            <div>
                <select
                    {...register("source")}
                    className="w-full border p-3 rounded-lg"
                >
                    <option value="">
                        Select Source
                    </option>

                    <option value="website">
                        Website
                    </option>

                    <option value="instagram">
                        Instagram
                    </option>

                    <option value="referral">
                        Referral
                    </option>

                    <option value="other">
                        Other
                    </option>
                </select>
            </div>

            {/* BUTTON */}

            <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer disabled:opacity-50"
            >
                {mutation.isPending? "Creating..." : "Create Lead"}
            </button>
        </form>
      </div>
    </div>
  );

};

export default CreateLeadModal;