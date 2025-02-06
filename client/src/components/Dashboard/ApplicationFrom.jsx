import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import Input from "../Input";
import { useState } from "react";

const ApplicationForm = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const onClose = () => {
    navigate("/dashboard");
  };

  const handleCreateJob = async (data) => {
    const res = await axios.post("/api/jobs/create-job", {
      ...data,
      userRef: currentUser._id,
    });

    if (res.data.success) {
      navigate("/dashboard");
    } else {
      setError(res.data.message);
    }
  };
  return (
    <div className="fixed inset-0 bg-slate-100 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-semibold mb-4">New Application</h2>

        <form onSubmit={handleSubmit(handleCreateJob)} className="space-y-4">
          <Input
            label="Company"
            type="text"
            name="company"
            required={true}
            {...register("company", {
              required: true,
            })}
          />
          <Input
            label="Position"
            type="text"
            name="position"
            required={true}
            {...register("position", {
              required: true,
            })}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              className="mt-1 block w-full rounded-md border-2 
               border-gray-300 shadow-sm hover:border-blue-500 focus:border-blue-800"
              {...register("status", {
                required: true,
              })}
            >
              <option value="PENDING">Pending</option>
              <option value="APPLIED">Applied</option>
              <option value="INTERVIEWING">Interviewing</option>
              <option value="REJECTED">Rejected</option>
              <option value="ACCEPTED">Accepted</option>
            </select>
          </div>

          <Input
            type="date"
            label="Date Applied"
            name="dateApplied"
            required={true}
            {...register("dateApplied", {
              required: true,
            })}
          />
          <Input
            type="text"
            label="Location"
            name="location"
            required={true}
            {...register("location", {
              required: true,
            })}
          />

          <Input
            type="text"
            label="Salary (Optional)"
            name="salary"
            required={false}
            {...register("salary", {
              required: false,
            })}
          />

          <Input
            type="text"
            label="Job URL (Optional)"
            name="jobUrl"
            required={true}
            {...register("jobUrl", {
              required: true,
            })}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Notes (Optional)
            </label>
            <textarea
              name="notes"
              rows={3}
              className="mt-1 block w-full rounded-md border-2 
               border-gray-300 shadow-sm hover:border-blue-500 focus:border-blue-800"
              {...register("notes", {
                required: false,
              })}
            />
          </div>
          <p>{error}</p>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 cursor-pointer"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
