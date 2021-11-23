import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { rem } from '../../util/style/lengths';

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
  max-width: ${rem(768 - (19 * 2))};
  margin: ${rem(19 * 3)} ${rem(19)} 0;
  padding-top: ${rem(19)};

  @media only screen and (min-width: ${rem(363)}) {
    margin:  ${rem(19 * 4)} ${rem(19)} 0;
  }

  @media only screen and (min-width: ${rem(590)}) {
    margin: ${rem(19 * 2)} ${rem(19)} 0;
  }
  @media only screen and (min-width: ${rem(768)} ) {
    margin: ${rem(19 * 2)} auto 0;
  }

  @media only print {
    max-width: 100%;
    margin: ${rem(36)} 0 0;
  }
`;
