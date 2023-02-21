import { Outlet } from "react-router-dom"
import GlobalHeader from "../layout/GlobalHeader"
import Footer from "../layout/Footer"

function GlobalLayout() {

  return (
    <>
      <GlobalHeader/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default GlobalLayout