import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { rem } from '~/util/style/lengths';

import Header, { navLinks } from './header';
import PrintAddress from './print-address';
import PrintCoa from './print-coa';

const Layout = ({ children, header = true }) => {
  const router = useRouter();
  const [hostname, setHostname] = useState('matt.dule.one');
  const [date] = useState(new Date().getFullYear().toString());
  const activeLink = navLinks.find(({ href }) => router.pathname === href);

  useEffect(() => {
    setHostname(window.location.hostname);
  }, []);

  let activeName = activeLink?.name ? activeLink.name : '';
  if (router.pathname === '/blackjack/training') {
    activeName = 'Blackjack Training';
  }

  return (
    <>
      <Head>
        <title>
          Matt DuLeone
          {activeName ? ` - ${activeName}` : ''}
        </title>
        <meta
          property="og:title"
          content={`Matt DuLeone${activeName ? ` - ${activeName}` : ''}`}
        />
      </Head>
      {header && <Header activeLink={activeLink} />}
      <PrintAddress />
      <PrintCoa />
      <Main $header={header}>{children}</Main>
      <Footer>
        &copy;
        {date} Matt DuLeone |{' '}
        <Link href="/">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a>{hostname}</a>
        </Link>
      </Footer>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.bool,
};

export default Layout;

const Main = styled.main`
  max-width: ${rem(768 - 19 * 2)};
  margin: ${({ $header }) => ($header ? rem(19 * 3) : 0)} ${rem(19)}
    ${rem(23.75)};
  padding-top: ${rem(19)};

  @media only screen and (min-width: ${rem(363)}) {
    margin: ${({ $header }) => ($header ? rem(19 * 4) : 0)} ${rem(19)}
      ${rem(23.75)};
  }

  @media only screen and (min-width: ${rem(590)}) {
    margin: ${({ $header }) => ($header ? rem(19 * 2) : 0)} ${rem(19)}
      ${rem(23.75)};
  }

  @media only screen and (min-width: ${rem(768)}) {
    margin: ${({ $header }) => ($header ? rem(19 * 2) : 0)} auto ${rem(23.75)};
  }

  @media only print {
    max-width: 100%;
    margin: ${rem(36)} 0 0;
  }

  @page {
    margin: 1cm 0.75cm;
  }
`;

const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  box-shadow: 0 ${rem(-1)} 0 ${({ theme }) => theme.colors.shadowColor};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  font-size: ${rem(16)};
  line-height: 1.25;

  @media (prefers-color-scheme: dark) {
    background-color: ${({ theme }) => theme.colors.softBlack};
    color: ${({ theme }) => theme.colors.softWhite};
    box-shadow: 0 ${rem(-1)} 0 ${({ theme }) => theme.colors.inverseColor};
  }

  @media only print {
    display: none;
  }
`;
