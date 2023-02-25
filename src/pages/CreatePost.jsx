import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import thumbnail from "../assets/img/post-detail-thumbnail.jpeg";

export function CreatePost() {
  // Cập nhật title, author, description
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState();
  const [publisher, setPublisher] = useState("");

  const titleRef = useRef();

  const putPostApi = "http://127.0.0.1:8000/api/book";

  // Cập nhật title
  useEffect(() => {
    document.title = "Create Post Page";
  });

  /**
   * ! Gửi thông tin bài viết người dùng tạo lên Database
   */
  const publicPost = () => {
    var options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        author,
        publisher,
      }),
    };

    fetch(putPostApi, options)
      .then((response) => response.json())
      .then(alert("Bài viết của bạn đã được công bố"));

    // Reset thông tin trên các ô input
    setTitle("");
    setAuthor("");
    setPublisher("");

    // Sau khi người dùng nhấn nút Public và gửi thông tin bài viết đi thì input Title sẽ được focus để người dùng tiếp tục nhập
    titleRef.current.focus();
  };

  return (
    <div style={{ paddingTop: 80, paddingBottom: 80 }}>
      <h2>Create Posts</h2>
      <div className="mt-3">
        {/* Form nhập thông tin bài viết */}
        <form>
          <div className="form-group">
            <label>Post Title</label>
            <input
              className="form-control"
              type="text"
              required
              value={title}
              placeholder="Enter title"
              onChange={(e) => setTitle(e.target.value)}
              ref={titleRef}
            />
          </div>
          <br />
          <div className="form-group">
            <label>Author</label>
            <input
              className="form-control"
              type="text"
              value={author}
              placeholder="Enter author"
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <br />
          <div className="form-group">
            <label>Date</label>
            <input
              className="form-control"
              type="date"
              placeholder="Enter date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <br />
          <div className="form-group">
            <label>Description</label>
            <input
              className="form-control"
              type="text"
              value={publisher}
              placeholder="Enter description"
              onChange={(e) => setPublisher(e.target.value)}
            />
          </div>
          <br />
          <div className="form-group">
            <label>Thumbnail</label>
            <input className="form-control" type="file" />
          </div>
          <br />
          <button
            type="button"
            className="btn btn-primary"
            onClick={publicPost}
          >
            Publish
          </button>
        </form>

        <br />
        <hr />
        <br />

        {/* Hiển thị thông tin người dùng nhập dưới dạng bài viết mẫu */}
        <div className="container">
          <div className="row">
            <SImage
              className="img-fluid"
              src={thumbnail}
              alt="Post Thumbnail"
            />
            <STitle className="text-capitalize">{title || "Post Title"}</STitle>
            <SAuthorDate>
              <p className="author">{author || "Post Author"}</p>
              <p className="date">2023/02/25</p>
            </SAuthorDate>
            <SContent>
              {publisher ||
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}
            </SContent>
          </div>
        </div>
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
