import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import Input from "../Input";
import { useForm } from "react-hook-form";
import LoadingUI from "../LoadeingComponent.jsx/LoadingUI";

const UpdateApplicationForm = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [error, seterror] = useState(null);

  const [job, setJob] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobData = async () => {
      const response = await axios.get(`/api/jobs/singleJob/${params.jobId}`);

      if (response.data.success) {
        setJob(response.data.job);
      } else {
        seterror(response.message);
      }
    };

    fetchJobData();
  }, [params.jobId]);

  // Update form values after job is fetched
  useEffect(() => {
    if (job) {
      setValue("company", job.company || "");
      setValue("position", job.position || "");
      setValue("status", job.status || "PENDING");
      setValue(
        "dateApplied",
        job.dateApplied
          ? new Date(job.dateApplied).toISOString().split("T")[0]
          : ""
      );
      setValue("location", job.location || "");
      setValue("salary", job.salary || "");
      setValue("jobUrl", job.jobUrl || "");
      setValue("notes", job.notes || "");
    }
  }, [job, setValue]);

  const onClose = () => {
    navigate("/dashboard");
  };

  const handleUpdate = async (data) => {
    console.log("hello");
    console.log(data);

    const response = await axios.post(
      `/api/jobs/updateJob/${params.jobId}`,
      data
    );

    if (response.data.success) {
      navigate("/dashboard");
    } else {
      seterror(response.message);
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

        <h2 className="text-xl font-semibold mb-4">Update Application</h2>

        {job ? (
          <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
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
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Update
              </button>
            </div>
          </form>
        ) : (
          <LoadingUI />
        )}
      </div>
    </div>
  );
};

export default UpdateApplicationForm;
