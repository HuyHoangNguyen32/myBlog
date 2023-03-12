import { Outlet } from 'react-router-dom';
import { GlobalHeader } from '../layout/GlobalHeader';
import { Footer } from '../layout/Footer';

export function GlobalLayout() {
  return (
    <div>
      <GlobalHeader />
      <Outlet />
      <Footer />
    </div>
  );
}
