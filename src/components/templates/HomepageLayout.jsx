import { Outlet } from "react-router-dom";
import HomepageHeader from "../layout/HomepageHeader";
import Footer from "../layout/Footer";

function HomepageLayout() {
  return (
    <>
      <HomepageHeader />
      <Outlet />
      <Footer />
    </>
  );
}

export default HomepageLayout;
