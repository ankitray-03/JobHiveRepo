import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import DashboardNavbar from "./DashboardNavbar";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser ? <DashboardNavbar></DashboardNavbar> : <Navbar />;
};

export default Header;
