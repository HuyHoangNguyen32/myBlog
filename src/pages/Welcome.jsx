import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import welcome from "../assets/img/welcome.svg";

export default function Welcome() {

  const navigate = useNavigate();

   /**
   * ! Cập nhật tiêu đề trang
   */
  useEffect(() => {
    document.title = "Trang chủ";
  });

  function handleClickUserBtn() {
    navigate("/posts");
  }
  function handleClickAdminBtn() {
    navigate("/login");
  }

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="row">
        <div className="col-md-6">
          <img src={welcome} className="img-fluid" alt="Welcome" />
        </div>
        <SContent className="col-md-6">
          <h3 class="text-center">Chào mừng bạn đến My Blog</h3>
          <p>
            Bạn sẽ sử dụng My Blog với vai trò người dùng hay quản trị viên.Vui lòng nhấn nút phù hợp dưới đây để tham gia.
            <br/>
            <SStart>*</SStart> <b>Người dùng</b> : bạn có thể xem danh sách bài viết và thông tin chi tiết bài viết bạn quan tâm.<br/>
            <SStart>*</SStart> <b>Quản trị viên</b> : bạn có thể tham gia tạo bài viết, chỉnh sửa và xoá bài viết.Bạn sẽ cần email và mật khẩu để đăng nhập tài khoản cho quản trị viên.
          </p>
          <div>
            <button className="btn btn-sm btn-primary" onClick={handleClickUserBtn}>
              Người dùng
            </button>
            <SButtonAdmin className="btn btn-sm btn-success" onClick={handleClickAdminBtn}>
              Quản trị viên
            </SButtonAdmin>
          </div>
        </SContent>
      </div>
    </div>
  );
}

const SContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  line-height: 25px;
`;
const SButtonAdmin = styled.button`
  margin-left: 10px;
`;

const SStart = styled.span`
  color:#e74c3c;
`
