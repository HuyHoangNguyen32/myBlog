import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import thumbnail from "../assets/img/post-detail-thumbnail.jpeg";

export function Post() {
  const { id } = useParams();
  const [post, setPost] = useState([]);

  const postApi = `http://127.0.0.1:8000/api/book/${id}`;

  useEffect(() => {
    fetch(postApi)
      .then((response) => response.json())
      .then((post) => setPost(post));
  }, [postApi]);

  // Cập nhật title
  useEffect(() => {
    document.title = post.title;
  });

  return (
    <div className="container" style={{ paddingTop: 80 }}>
      <div className="row">
        <SImage className="img-fluid" src={thumbnail} alt="Post Thumbnail" />
        <STitle className="text-capitalize">{post.title}</STitle>
        <SAuthorDate>
          <p className="author">{post.author}</p>
          <p className="date">2023/02/25</p>
        </SAuthorDate>
        <SContent>{post.publisher}</SContent>
      </div>
    </div>
  );
}

const SImage = styled.img`
  width: 100%;
  max-height: 250px; 
`;

const STitle = styled.h2`
  font-size: 30px;
  font-weight: bold;
  margin-top: 10px;
`;

const SAuthorDate = styled.div`
  font-size: 12px;
  color: #fff;
  display: flex;
  margin-top: 10px;
  p {
    border-radius: 5px;
    padding: 1px 5px;
    margin-bottom: 5px;
  }
  .date {
    margin-left: 10px;
    background-color: #7f8c8d;
  }
  .author {
    background-color: #7f8c8d;
  }
`;

const SContent = styled.p`
  font-size: 14px;
  margin-top: 10px;
`;


