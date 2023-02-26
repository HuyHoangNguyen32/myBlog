import { useEffect } from "react";
import login from "../assets/img/login.webp";

export function Login() {

  // Cập nhật title
  useEffect(() => {
    document.title = "Login Page";
  });

  return (
    <section className="d-flex align-items-center justify-content-center vh-100">
      <div className="container-fluid h-custom">

        <div className="row d-flex justify-content-center align-items-center h-100">

          <div className="col-md-9 col-lg-6 col-xl-5">
            <img src={login} className="img-fluid" alt="Login" />
          </div>

          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form>

              {/* <!-- Email input --> */}
              <div className="form-outline mb-3">
                <label className="form-label">
                Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter a valid email address"
                />
              </div>
              {/* <!-- Password input --> */}
              <div className="form-outline mb-3">
                <label className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                />
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button type="button" className="btn btn-primary btn-sm">
                  Login to Admin Page
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
