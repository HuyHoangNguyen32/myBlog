import { Outlet } from "react-router-dom";
import { HomepageHeader } from "../layout/HomepageHeader";
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