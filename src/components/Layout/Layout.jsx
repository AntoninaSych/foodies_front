import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from '../Header/Header';
import Loader from '../Loader/Loader';
import ScrollUp from '../ScrollUp/ScrollUp';
import Footer from '../Footer/Footer';
import css from './Layout.module.css';
import ShowModal from '../ShowModal/ShowModal';

const Layout = () => {
  return (
    <div className={css.layout}>
      <Header />
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <ShowModal />
      <ScrollUp />
      <Toaster />
      <Footer />
    </div>
  );
};

export default Layout;
