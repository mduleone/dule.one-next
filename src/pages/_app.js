import '@fortawesome/fontawesome-svg-core/styles.css';
import Head from 'next/head';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import '../util/font-awesome';
import { DEFAULT_SIZE, rem } from '../util/style/lengths';
import theme from '../util/theme';

const App = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
    </Head>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  </>
);

export default App;

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    font-family: ${({ theme }) => theme.fonts.screenFont};
    font-size: 16px;
    margin: 0 auto;
    position: relative;
    -webkit-text-size-adjust: none;
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.black};

    @media (prefers-color-scheme: dark) {
      background: ${({ theme }) => theme.colors.black};
      color: ${({ theme }) => theme.colors.white};
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
    color: ${({ theme }) => theme.colors.black};

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
