import { Outlet } from "react-router-dom";
import AdminHeader from "../layout/AdminHeader";
import Footer from "../layout/Footer";

function AdminLayout() {
  return (
    <>
      <AdminHeader />
      <Outlet />
      <Footer />
    </>
  );
}

export default AdminLayout;
