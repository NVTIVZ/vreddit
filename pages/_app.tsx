import { AppProps } from 'next/app';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { ProvideAuth } from '../hooks/use-auth';

const GlobalStyle = createGlobalStyle`
  body,div,p,ul,li {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;

  }

  body{
    background:#FEFBF3
  }
`;

const theme = {
  colors: {
    primary: '#0070f3',
  },
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <ProvideAuth>
          <Component {...pageProps} />
        </ProvideAuth>
      </ThemeProvider>
    </>
  );
}
