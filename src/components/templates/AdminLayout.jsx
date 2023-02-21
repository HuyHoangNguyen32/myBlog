import { Outlet } from "react-router-dom"
import AdminHeader from "../atoms/layout/AdminHeader"
// import Footer from "../atoms/layout/Footer"

function AdminLayout() {

  return (
    <>
      <AdminHeader/>
      <Outlet/>
      {/* <Footer/> */}
    </>
  )
}

export default AdminLayout