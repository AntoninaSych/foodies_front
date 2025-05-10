import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import clsx from 'clsx';
import { Outlet } from 'react-router-dom';
import Loader from '../Loader/Loader';
import ScrollUp from '../ScrollUp/ScrollUp';
import Footer from '../Footer/Footer';
import ShowModal from '../ShowModal/ShowModal';
import css from './Layout.module.css';

const HomeLayout = () => {
  return (
    <div className={clsx(css.layout, css.homeLayout)}>
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

export default HomeLayout;
