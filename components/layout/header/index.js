import PropTypes from 'prop-types';
import Link from 'next/link';
import cx from 'classnames';

import styles from './index.module.scss';

export const navLinks = [
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

const Header = ({ activeLink }) => (
  <header className={styles.header}>
    <Link href="/"><a className={styles.name}>Matt DuLeone</a></Link>
    <nav className={styles.nav}>
      <ul className={styles['nav-list']}>
        {navLinks.map(({name, href}) => (
          <li key={name} className={styles['nav-list-item']}>
            <Link href={href}>
              <a className={cx(styles['nav-list-item-link'], {[styles.active]: activeLink.href === href})}>
                {name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  </header>
);

Header.propTypes = {
  activeLink: PropTypes.shape({
    name: PropTypes.string,
    href: PropTypes.string,
  }).isRequired,
};

export default Header;
