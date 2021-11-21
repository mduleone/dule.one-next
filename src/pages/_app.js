import '@fortawesome/fontawesome-svg-core/styles.css';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import '../util/font-awesome';
import theme from '../util/theme';

const App = ({ Component, pageProps }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Component {...pageProps} />
  </ThemeProvider>
);

export default App;

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    font-family: ${({ theme }) => theme.fonts.screenFont};
    font-size: 19px;
    margin: 0 auto;
    position: relative;
    -webkit-text-size-adjust: none;

    @media only print {
      font-family: ${({ theme }) => theme.fonts.printFont};
      max-width: 100%;
      width: 100%;
    }
  }

  * {
    box-sizing: border-box;
  }

  a {
    color: ${({ theme }) => theme.colors.linkColor};
    text-decoration: none;
  }

  a:focus,
  a:active {
    border: none;
    box-shadow: none;
    outline: none;
  }

  ul {
    padding-left: 36px;
  }

  p {
    margin: 0;
  }
`;
