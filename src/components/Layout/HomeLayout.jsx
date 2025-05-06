import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import Loader from '../Loader/Loader';
import css from './Layout.module.css';
import ScrollUp from '../ScrollUp/ScrollUp';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import clsx from 'clsx';

const HomeLayout = () => {
  return (
    <div className={clsx(css.layout, css.homeLayout)}>
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <ScrollUp />
      <Toaster />
      <Footer />
    </div>
  );
};

export default HomeLayout;
