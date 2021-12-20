import Provider from '../context/Provider';
import './main.scss';
import './global.scss';

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
