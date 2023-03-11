import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState([]);

  // API
  const postApi = `https://myblog-backend.click/api/posts/${id}`;

  /**
   * ! Cập nhật tiêu đề trang
   */
  useEffect(() => {
    document.title = post.title;
  });

  /**
   * ! Hiển thị thông tin chi tiết bài viết
   */
  useEffect(() => {
    fetch(postApi)
      .then((response) => response.json())
      .then((post) => setPost(post));
  }, [postApi]);

  return (
    <div className="container" style={{ paddingTop: 80 }}>
      <div className="row">
        <SImage
          className="img-fluid"
          src={`https://myblog-backend.click/uploads/images/${post.thumbnail}`}
          alt="Post Thumbnail"
        />
        <STitle className="text-capitalize">{post.title}</STitle>
        <SAuthorDate>
          <p className="author">{post.author}</p>
          <p className="date">{post.date}</p>
        </SAuthorDate>
        <SContent>{post.description}</SContent>
      </div>
    </div>
  );
}

const SImage = styled.img`
  width: 100%;
  max-height: 250px;
  border-radius: 20px;
  object-fit: cover;
`;

const STitle = styled.h2`
  font-size: 25px;
  font-weight: bold;
  margin-top: 10px;
`;

const SAuthorDate = styled.div`
  font-size: 16px;
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
  font-size: 18px;
  margin-top: 10px;
  ::first-letter {
    margin-left: 20px;
    font-size: 20px;
    font-weight: bold;
  }
`;
