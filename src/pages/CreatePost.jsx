import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import sampleThumbnail from "../assets/img/post-detail-thumbnail.jpeg";

export function CreatePost() {
  // Cập nhật title, author, description
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertFileSize, setShowAlertFileSize] = useState(false);

  // Thumbnail State
  // const [thumbnail, setThumbnail] = useState(null);
  const [imgPreview, setImgPreview] = useState();

  const [image, setImage] = useState(null);

  const titleRef = useRef();
  const imageRef = useRef();

  const putPostApi = "http://myblogbackend2-env.eba-tisvxmry.ap-northeast-1.elasticbeanstalk.com/api/posts";

  // Cập nhật title
  useEffect(() => {
    document.title = "Create Post Page";
  });

  /**
   * ! Gửi thông tin bài viết người dùng tạo lên Database */
  const publicPost = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("date", date);
    formData.append("description", description);
    formData.append("thumbnail", image);

    var options = {
      method: "POST",
      body: formData,
    };

    fetch(putPostApi, options)
      .then((response) => response.json())
      .then(setShowAlert(true))
      .catch((err) => console.log(err));

    // Reset thông tin trên các ô input
    setTitle("");
    setAuthor("");
    setDescription("");
    setDate("");
    setImgPreview(null);

    // Đặt lại giá trị cho input type=file sau khi đăng bài
    imageRef.current.value = null;

    // Sau khi người dùng nhấn nút Public và gửi thông tin bài viết đi thì input Title sẽ được focus để người dùng tiếp tục nhập
    titleRef.current.focus();
  };

  // Hiển thị hình ảnh người dùng upload tại bài viết mẫu
  const handleImgPreview = (e) => {
    const fileSelected = e.target.files[0];
    // setThumbnail(fileSelected);
    setImage(fileSelected);

    let reader = new FileReader();
    reader.onloadend = () => {
      setImgPreview(reader.result);
    };
    reader.readAsDataURL(fileSelected);
  };

  // Giới hạn dung lượng ảnh được upload
  const sizeLimit = 1024 * 1024 * 1;
  const handleFileSelect = (e) => {
    const fileSelected = e.target.files[0];
    if (fileSelected.size > sizeLimit) {
      setShowAlertFileSize(true);
      // Đặt lại giá trị cho input type=file sau khi đăng bài
      imageRef.current.value = null;
    } else {
      handleImgPreview(e);
    }
  };

  return (
    <div style={{ paddingTop: 80, paddingBottom: 80 }}>
      <h2>Tạo và công bố bài viết của bạn</h2>

      {/* <!-- Alert --> */}
      {showAlert && (
        <div>
          <div
            className="mt-5 mb-5 alert alert-info alert-dismissible fade show"
            role="alert"
          >
            <strong>Xin chúc mừng!</strong> Bài viết của bạn đã được công bố.
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={() => setShowAlert(false)}
            ></button>
          </div>
        </div>
      )}

      <div className="mt-3">
        {/* Form nhập thông tin bài viết */}
        <form encType="multipart/form-data">
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              className="form-control"
              type="text"
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
              type="text"
              placeholder="Enter date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <SDateInfo className="text-info">Ex: 2022/07/31</SDateInfo>
          </div>

          <div className="form-group">
            <label>Description</label>
            <STextArea
              className="form-control"
              type="text"
              value={description}
              placeholder="Enter description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <br />
          <div className="form-group">
            <label>Thumbnail</label>
            <input
              ref={imageRef}
              className="form-control"
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
            />
            {showAlertFileSize && 
              <SShowAlertFileSize className="text-danger">* Vui lòng tải hình ảnh có dung lượng dưới 1MB</SShowAlertFileSize>
            }
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
              src={imgPreview || sampleThumbnail}
              alt="Post Thumbnail"
            />
            <STitle className="text-capitalize">{title || "Post Title"}</STitle>
            <SAuthorDate>
              <p className="author">{author || "Post Author"}</p>
              <p className="date">{date || "year/month/date"}</p>
            </SAuthorDate>
            <SContent>
              {description ||
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}
            </SContent>
          </div>
        </div>
      </div>
    </div>
  );
}

const SShowAlertFileSize = styled.p`
  font-size: 14px;
  margin-top: 8px;
`;

const SDateInfo = styled.p`
  font-size: 14px;
  margin-top: 5px;
`;

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

const STextArea = styled.textarea`
  height: 200px;
`;
