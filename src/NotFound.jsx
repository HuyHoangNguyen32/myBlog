import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function NotFound() {
  
  document.title = "404";

  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate("/")
    }, 3000)
  },[navigate])
  
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Back to Homepage after after 3 seconds.</p>
    </div>
  )
}

export default NotFound