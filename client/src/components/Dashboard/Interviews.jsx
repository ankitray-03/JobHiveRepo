import { Calendar, Clock, MapPin, Building2, Plus } from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const Interviews = () => {
  const { currentUser } = useSelector((store) => store.user);
  const [interviews, setInterviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`/api/jobs/getMyJobs/${currentUser._id}`);

        if (res.status === 200) {
          const applications = res.data;

          setInterviews(
            applications.filter((app) => app.status === "INTERVIEWING")
          );
        } else {
          console.log(res);
        }

        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

  return (
    <>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">
              Upcoming Interviews
            </h1>

            <button className="ml-4 flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer">
              <Plus className="w-5 h-5 mr-2 " />
              Schedule Interview
            </button>
          </div>
          {isLoading ? (
            <div className="mx-[45%] my-[10%]">
              <ClimbingBoxLoader
                color={"#1883BF"}
                loading={isLoading}
                size={35}
                speedMultiplier={1.5}
              />
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {interviews.map((interview, id) => (
                <div key={id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">
                        {interview.position}
                      </h3>
                      <div className="flex items-center text-gray-600 mt-1">
                        <Building2 className="w-4 h-4 mr-2" />
                        <span>{interview.company}</span>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 text-sm rounded ${
                        interview.type === "Technical"
                          ? "bg-blue-100 text-blue-800"
                          : interview.type === "Behavioral"
                          ? "bg-green-100 text-green-800"
                          : interview.type === "System Design"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {interview.type}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>
                        {new Date(interview.dateApplied).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{interview.time || "Not mentioned"}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{interview.location}</span>
                    </div>
                  </div>

                  {interview.notes && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600">{interview.notes}</p>
                    </div>
                  )}

                  <div className="mt-4 flex justify-end space-x-2">
                    <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded">
                      Edit
                    </button>
                    <button className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded">
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Interviews;
