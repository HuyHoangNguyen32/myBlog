import { Outlet } from "react-router-dom"
import GlobalHeader from "../atoms/layout/GlobalHeader"
import Footer from "../atoms/layout/Footer"

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