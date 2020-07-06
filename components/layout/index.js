import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import cx from 'classnames';

import styles from './index.module.scss';

const navLinks = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Projects',
    href: '/projects',
  },
  {
    name: 'Resume',
    href: '/resume',
  },
  {
    name: 'Contact',
    href: '/contact',
  },
];

const Favicon = () => (
  <>
    <link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-icon-57x57.png" />
    <link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-icon-60x60.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-icon-72x72.png" />
    <link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-icon-76x76.png" />
    <link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-icon-114x114.png" />
    <link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-icon-120x120.png" />
    <link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-icon-144x144.png" />
    <link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-icon-152x152.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png" />
    <link rel="icon" type="image/png" sizes="192x192"  href="/favicon/android-icon-192x192.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
    <link rel="manifest" href="/favicon/manifest.json" />
  </>
);

const Layout = ({ children }) => {
  const router = useRouter();
  const activeLink = navLinks.find(({ href }) => router.pathname === href);
  return (
    <>
      <Head>
        <title>Matt DuLeone - {activeLink.name}</title>
        <Favicon />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
      </Head>
      <header className={styles.header}>
        <Link href="/"><a className={styles.name}>Matt DuLeone</a></Link>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {navLinks.map(({ name, href }) => (
              <li key={name} className={styles.navListItem}>
                <Link href={href}><a className={cx({ [styles.active]: router.pathname === href })}>{name}</a></Link>
              </li>
            ))}
          </ul>
        </nav>
        <img src="/images/duleone.jpg" className={styles['print-coa']} />
      </header>
      <div className={styles['print-address-container']}>
        <div className={styles['print-address']}>
          <div>Jersey City, NJ</div>
          <a href="mailto:matt@duleone.com">matt@duleone.com</a>
        </div>
      </div>
      <main className={styles.content}>
        {children}
      </main>
    </>
  );
};

export default Layout;
