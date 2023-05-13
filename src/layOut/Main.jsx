import { Outlet } from "react-router-dom";
import Footer from "../shared/footer/Footer";
import Navbar from "../shared/navBar/Navbar";


const Main = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Main;