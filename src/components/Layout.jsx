import { Outlet } from 'react-router-dom';
import AppBar from './AppBar';

const Layout = () => (
  <div>
    <AppBar />
    <main>
      <Outlet />
    </main>
  </div>
);

export default Layout;
