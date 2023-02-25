import { useEffect } from 'react'

export function Home() {

  // Cập nhật title
  useEffect(() => {
    document.title = "HomePage";
  },);

  return (
    <div>
      <h1>Home Page</h1>
    </div>
  )
}