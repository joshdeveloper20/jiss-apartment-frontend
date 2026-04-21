import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Whatsapp from "./Whatsapp";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main>{<Outlet />}</main>
      <Whatsapp />
      <Footer />
    </>
  );
};
export default Layout;
