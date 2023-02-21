import { Outlet } from "react-router-dom"
import HomepageHeader from "../atoms/layout/HomepageHeader"
// import Footer from "../atoms/layout/Footer"

function HomepageLayout() {

  return (
    <>
      <HomepageHeader/>
      <Outlet/>
      {/* <Footer/> */}
    </>
  )
}

export default HomepageLayout