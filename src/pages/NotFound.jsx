import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export function NotFound() {
  
  // Cập nhật title
  useEffect(() => {
    document.title = "404";
  },);

  // Đưa người dùng quay trở lại homapage sau 3s
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate("/")
    }, 3000)
  },[navigate])
  
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Bạn sẽ tự động được đưa trở lại trang chủ trong vòng 3 giây !</p>
    </div>
  )
}