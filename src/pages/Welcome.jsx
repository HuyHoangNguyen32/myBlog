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
    document.title = "Welcome Page";
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
          <h3>Welcome to My Blog</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            temporibus iste minima repellendus officiis nihil culpa quas. Dolor
            fuga doloremque aperiam dolorem rem dignissimos, provident harum,
            molestiae, id nemo sint!
          </p>
          <div>
            <button className="btn btn-sm btn-primary" onClick={handleClickUserBtn}>
              User
            </button>
            <SButtonAdmin className="btn btn-sm btn-success" onClick={handleClickAdminBtn}>
              Admin
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
`;
const SButtonAdmin = styled.button`
  margin-left: 10px;
`;
