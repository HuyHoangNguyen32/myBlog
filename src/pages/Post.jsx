import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'

function Post() {
  const {id} = useParams()
  const [post, setPost] = useState([]);

  const postApi = `http://127.0.0.1:8000/api/book/${id}`;

  useEffect(() => {
    fetch(postApi)
      .then((response) => response.json())
      .then((post) => setPost(post));
  }, [postApi]);

  document.title = post.title;

  return (
    <div className="container" style={{paddingTop: 80}}>
        <div className="row">
          <h2>{post.title}</h2>
          <h3>{post.author}</h3>
          <h4>{post.publisher}</h4>
        </div>
      </div>
  )
}

export default Post