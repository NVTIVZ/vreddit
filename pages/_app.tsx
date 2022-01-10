import { AppProps } from 'next/app';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { ProvideAuth } from '../hooks/use-auth';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
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
