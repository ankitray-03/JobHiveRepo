import ApplicationStats from "../components/Dashboard/ApplicationStats";
import ApplicationsList from "./ApplicationsList";

const Dashboard = () => {
  return (
    <span>
      <ApplicationStats />
      <ApplicationsList />
    </span>
  );
};

export default Dashboard;
