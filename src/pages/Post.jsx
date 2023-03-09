import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

export function Post() {
  const { id } = useParams();
  const [post, setPost] = useState([]);

  const postApi = `http://myblogbackend2-env.eba-tisvxmry.ap-northeast-1.elasticbeanstalk.com/api/posts/${id}`;

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
        <SImage className="img-fluid" src={`http://myblogbackend2-env.eba-tisvxmry.ap-northeast-1.elasticbeanstalk.com/uploads/images/${post.thumbnail}`} alt="Post Thumbnail" />
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
  ::first-letter {
    margin-left: 20px;
    font-size: 20px;
    font-weight: bold;
  }
`;


