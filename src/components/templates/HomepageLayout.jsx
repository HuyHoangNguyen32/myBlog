import { HomepageHeader } from "../layout/HomepageHeader.jsx";
import { Outlet } from "react-router-dom";
import { Footer } from "../layout/Footer";

export function HomepageLayout() {
  return (
    <div>
      <HomepageHeader />
      <Outlet />
      <Footer />
    </div>
  );
}