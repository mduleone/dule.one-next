import '@fortawesome/fontawesome-svg-core/styles.css';
import Head from 'next/head';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import PropTypes from 'prop-types';

import '~/util/font-awesome';
import { rem } from '~/util/style/lengths';
import providedTheme from '~/util/theme';
import Analytics from '~/components/analytics';

const App = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta
        property="og:description"
        content="Software Engineer. Mathematician. Problem Solver. Ferrum Ferro Exacuitur."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://matt.dule.one" />
      <meta
        property="og:image"
        content="https://matt.dule.one/images/duleone-big.jpg"
      />
    </Head>
    <ThemeProvider theme={providedTheme}>
      <GlobalStyle />
      <Analytics />
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </ThemeProvider>
  </>
);

App.propTypes = {
  Component: PropTypes.node.isRequired,
  pageProps: PropTypes.shape({}).isRequired,
};

export default App;

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    font-family: ${({ theme }) => theme.fonts.screenFont};
    /* stylelint-disable-next-line unit-disallowed-list */
    font-size: 16px;
    margin: 0 auto;
    position: relative;
    /* stylelint-disable-next-line property-no-vendor-prefix */
    -webkit-text-size-adjust: none;
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.black};

    @media (prefers-color-scheme: dark) {
      background-color: ${({ theme }) => theme.colors.softBlack};
      color: ${({ theme }) => theme.colors.softWhite};
    }

    @media only print {
      font-family: ${({ theme }) => theme.fonts.printFont};
      max-width: 100%;
      width: 100%;
    }
  }

  body * {
    font-size: ${rem(19)};

    @media only print {
      font-size: ${rem(16)};
    }
  }
  
  * {
    box-sizing: border-box;
  }

  a {
    color: ${({ theme }) => theme.colors.linkColor};
    text-decoration: none;

    @media (prefers-color-scheme: dark) {
      color: ${({ theme }) => theme.colors.inverseLinkColor};
    }
  }

  button {
    color: ${({ theme }) => theme.colors.softBlack};

    @media (prefers-color-scheme: dark) {
      color: ${({ theme }) => theme.colors.white};
    }
  }

  a:focus,
  a:active {
    border: none;
    box-shadow: none;
    outline: none;
  }

  ul {
    padding-left: ${rem(36)};
  }

  p {
    margin: 0;
  }
`;
