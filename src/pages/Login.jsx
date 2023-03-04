import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import login from "../assets/img/login.webp";

const schema = yup.object({
  username: yup.string().required("Username is a required field"),
  password: yup
    .string()
    .required("Password is a required field")
    .min(6, "Password must be at least 6 characters"),
});

export function Login() {
  // Cập nhật title
  useEffect(() => {
    document.title = "Login Page";
  });

  const [showAlert, setShowAlert] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const formSubmit = (data) => {
    const USERNAME_INFO = data.username;
    const PASSWORD_INFO = data.password;
    if (
      USERNAME_INFO === "myblog-login@gmail.com" &&
      PASSWORD_INFO === "1RxozVRIu8C"
    ) {
      navigate("/admin/create");
    } else {
      setShowAlert(true);
    }
  };

  return (
    <section className="d-flex align-items-center justify-content-center vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          {showAlert && (
              <div
                className="mb-5 alert alert-warning alert-dismissible fade show"
                role="alert"
              >
                <strong>Email hoặc Password bạn nhập không chính xác.</strong> Vui lòng thử lại để đăng nhập.
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                  onClick={() => setShowAlert(false)}
                ></button>
              </div>
          )}

          <div className="col-lg-6 col-md-6">
            <img src={login} className="img-fluid" alt="Login" />
          </div>

          <div className="col-lg-6 col-md-6">
            <h2 className="text-center mb-3">Đăng nhập My Blog Admin</h2>
            <p>
              Bạn vui lòng nhập Email address và Password để đăng nhập vào màn hình quản trị My Blog.
            </p>
            <form onSubmit={handleSubmit(formSubmit)}>
              {/* <!-- Email input --> */}
              <div className="form-outline mb-3">
                <label className="form-label">
                  <b>Email address</b> <SRequired>*</SRequired>
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter a valid email address"
                  {...register("username")}
                />
                <SError>{errors.username?.message}</SError>
              </div>
              {/* <!-- Password input --> */}
              <div className="form-outline mb-3">
                <label className="form-label">
                <b>Password</b> <SRequired>*</SRequired>
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  {...register("password")}
                />
                <SError>{errors.password?.message}</SError>
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button type="submit" className="btn btn-primary btn-sm">
                    Login to Admin Page
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

const SError = styled.span`
  color: #e74c3c;
  font-size: 0.8rem;
`;

const SRequired = styled.span`
  color: #e74c3c;
`;
