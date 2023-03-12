import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HomepageLayout } from '../components/templates/HomepageLayout';
import { Footer } from '../components/layout/Footer';
import notfound from '../assets/img/404.jpeg';

export default function NotFound() {
  /**
   * ! Cập nhật tiêu đề trang
   */
  useEffect(() => {
    document.title = '404';
  });

  /**
   * ! Đưa người dùng quay trở lại homapage sau 3s
   */
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 3000);
  }, [navigate]);

  return (
    <div>
      <HomepageLayout />
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center row">
          <div className=" col-md-6">
            <img src={notfound} alt="404" className="img-fluid" />
          </div>
          <div className=" col-md-6 mt-5">
            <p className="fs-3">
              <span className="text-danger">Trang bạn tìm kiếm không tồn tại.</span>
            </p>
            <p className="lead">
              <span>Bạn sẽ tự động được đưa trở lại trang chủ sau 3 giây.</span>
              <br />
              <span>Vui lòng chờ trong giây lát.</span>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
