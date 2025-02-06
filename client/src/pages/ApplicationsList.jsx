import { useEffect, useState } from "react";
import { Building2, MapPin, Calendar } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { Link, useNavigate } from "react-router";

const ApplicationsList = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`/api/jobs/getMyJobs/${currentUser._id}`);

        setApplications(res.data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (app) => {
    navigate(`/dashboard/job/${app._id}`);
  };
  const handleDelete = async (application) => {
    try {
      const response = await axios.delete(
        `/api/jobs/deleteJob/${application._id}`
      );
      if (response.data.success) {
        // Handle successful deletion, e.g., update state or show a message
        setApplications((prev) =>
          prev.filter((job) => job._id !== application._id)
        );
        console.log("Application deleted successfully");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      {isLoading ? (
        <div className="mx-[50%] my-[10%]">
          <ClimbingBoxLoader
            color={"#1883BF"}
            loading={isLoading}
            size={35}
            speedMultiplier={1.5}
          />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {applications.map((app, id) => (
            <div
              key={id}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <Link to={app.jobUrl} target="_blank">
                  <h3 className="font-semibold text-lg text-gray-900">
                    {app.position}
                  </h3>
                </Link>
                <span
                  className={`px-2 py-1 text-sm rounded ${
                    app.status === "ACCEPTED"
                      ? "bg-green-100 text-green-800"
                      : app.status === "REJECTED"
                      ? "bg-red-100 text-red-800"
                      : app.status === "INTERVIEWING"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {app.status.charAt(0) + app.status.slice(1).toLowerCase()}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <Building2 className="w-4 h-4 mr-2" />
                  <span>{app.company}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{app.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{new Date(app.dateApplied).toLocaleDateString()}</span>
                </div>
              </div>

              {app.notes && (
                <p className="mt-4 text-sm text-gray-600 line-clamp-2">
                  {app.notes}
                </p>
              )}

              <p>{error}</p>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded cursor-pointer"
                  onClick={() => handleEdit(app)}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded cursor-pointer"
                  onClick={() => handleDelete(app)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ApplicationsList;
