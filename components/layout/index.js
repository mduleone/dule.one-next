import Head from 'next/head';
import { useRouter } from 'next/router';

import Favicon from './favicon';
import Header, { navLinks } from './header';
import PrintAddress from './print-address';
import styles from './index.module.scss';
import PrintCoa from './print-coa';

const Layout = ({ children }) => {
  const router = useRouter();
  const activeLink = navLinks.find(({ href }) => router.pathname === href) || navLinks[0];

  return (
    <>
      <Head>
        <title>Matt DuLeone - {activeLink.name}</title>
        <Favicon />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
      </Head>
      <Header activeLink={activeLink} />
      <PrintAddress />
      <PrintCoa />
      <main className={styles.content}>
        {children}
      </main>
    </>
  );
};

export default Layout;
