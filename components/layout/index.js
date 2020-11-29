import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import Header, { navLinks } from './header';
import PrintAddress from './print-address';
import PrintCoa from './print-coa';

const Layout = ({ children }) => {
  const router = useRouter();
  const activeLink = navLinks.find(({ href }) => router.pathname === href);

  return (
    <>
      <Head>
        <title>Matt DuLeone - {activeLink.name}</title>
      </Head>
      <Header activeLink={activeLink} />
      <PrintAddress />
      <PrintCoa />
      <Main>
        {children}
      </Main>
    </>
  );
};

export default Layout;

const Main = styled.main`
  max-width: 736px;
  margin: 3em 1em 0;
  padding-top: 1em;

  @media only screen and (min-width: 363px) {
    margin: 4em 1em 0;
  }

  @media only screen and (min-width: 590px) {
    margin: 2em 1em 0;
  }
  @media only screen and (min-width: 752px ) {
    margin: 2em auto 0;
  }

  @media only print {
    max-width: 100%;
    margin: 36px 0;
  }
`;
