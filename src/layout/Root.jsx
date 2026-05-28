import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useTheme } from "../Context/ThemeContext";

function DashBoard() {
  const { darkMode } = useTheme();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar></Navbar>
      <div
        className={`flex-grow transition-all duration-300 ${
          darkMode ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default DashBoard;