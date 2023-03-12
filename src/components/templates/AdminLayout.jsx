import { Outlet } from 'react-router-dom';
import { AdminHeader } from '../layout/AdminHeader';
import { Footer } from '../layout/Footer';

export function AdminLayout() {
  return (
    <div>
      <AdminHeader />
      <Outlet />
      <Footer />
    </div>
  );
}
