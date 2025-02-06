import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const ApplicationStats = () => {
  const { currentUser } = useSelector((store) => store.user);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/jobs/getMyJobs/${currentUser._id}`);
        setApplications(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [currentUser]);
  const stats = [
    {
      name: "Total Applications",
      value: applications.length,
      color: "bg-blue-500",
    },
    {
      name: "Interviewing",
      value: applications.filter((app) => app.status === "INTERVIEWING").length,
      color: "bg-yellow-500",
    },
    {
      name: "Accepted",
      value: applications.filter((app) => app.status === "ACCEPTED").length,
      color: "bg-green-500",
    },
    {
      name: "Rejected",
      value: applications.filter((app) => app.status === "REJECTED").length,
      color: "bg-red-500",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6">
      {stats.map((stat) => (
        <div key={stat.name} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className={`w-4 h-4 rounded-full ${stat.color} mr-2`} />
            <h3 className="text-lg font-medium text-gray-900">{stat.name}</h3>
          </div>
          <p className="mt-2 text-3xl font-semibold text-gray-700">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ApplicationStats;
