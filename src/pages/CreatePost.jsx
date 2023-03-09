import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import sampleThumbnail from "../assets/img/post-detail-thumbnail.jpeg";

export default function CreatePost() {

  // State
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [showAlertFileSize, setShowAlertFileSize] = useState(false);

  const [imgPreview, setImgPreview] = useState();
  const [image, setImage] = useState(null);

  const titleRef = useRef();
  const imageRef = useRef();

  // API
  const putPostApi = "http://myblogbackend2-env.eba-tisvxmry.ap-northeast-1.elasticbeanstalk.com/api/posts";

  /**
   * ! Cập nhật tiêu đề trang
   */
  useEffect(() => {
    document.title = "Create Post Page";
  });

  /**
   * ! Gửi thông tin bài viết người dùng tạo lên Database
   */
  const publicPost = () => {

    // Lấy dữ liệu gửi đi
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("date", date);
    formData.append("description", description);
    formData.append("thumbnail", image);

    // Dữ liệu sẽ được gửi đi
    var options = {
      method: "POST",
      body: formData,
    };

    // Gửi dữ liệu đi
    fetch(putPostApi, options)
      .then((response) => response.json())
      .then(setShowAlert(true))
      .catch((err) => console.log(err));

    // Reset thông tin trên các ô input và hình ảnh mẫu
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

  /**
   * ! Hiển thị hình ảnh người dùng upload tại bài viết mẫu
   */
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

  /**
   * ! Giới hạn dung lượng ảnh được upload
   */
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

      {/* Alert công bố bài viết thành công */}
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
            <label className="form-label">Tiêu đề</label>
            <input
              className="form-control"
              type="text"
              value={title}
              placeholder="Nhập tiêu đề"
              onChange={(e) => setTitle(e.target.value)}
              ref={titleRef}
            />
          </div>
          <br />
          <div className="form-group">
            <label>Tác giả</label>
            <input
              className="form-control"
              type="text"
              value={author}
              placeholder="Nhập tên tác giả"
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <br />
          <div className="form-group">
            <label>Ngày tháng năm</label>
            <input
              className="form-control"
              type="text"
              placeholder="Nhập ngày tháng năm"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <SDateInfo className="text-info">Ví dụ: 31/07/2020</SDateInfo>
          </div>

          <div className="form-group">
            <label>Trích dẫn</label>
            <STextArea
              className="form-control"
              type="text"
              value={description}
              placeholder="Nhập trích dẫn"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <br />
          <div className="form-group">
            <label>Ảnh đại diện</label>
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
            className="btn btn-primary btn-sm"
            onClick={publicPost}
          >
            Công bố bài viết
          </button>
        </form>


        <br />
        <h5>Dưới đây là bài viết mẫu mà bạn vừa nhập ở trên.</h5>
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
            <STitle className="text-capitalize">{title || "Tiêu đề"}</STitle>
            <SAuthorDate>
              <p className="author">{author || "Tác giả"}</p>
              <p className="date">{date || "Ngày/tháng/năm"}</p>
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
  height: 100px;
`;
