import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function MainLayout() {
  return (
    <div>
      <header>
        <Navbar />
        <div></div>
      </header>
      <main>
        <Outlet />
      </main>
      
    </div>
  );
}

export default MainLayout;