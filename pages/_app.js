import { Provider } from "react-redux";
import { useStore } from "../store";
import App from "next/app";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/globals.css";
import {BrowserRouter} from 'react-router-dom'
/* import { setAdmin } from "../redux/actions"; */

const MyApp = ({ Component, pageProps }) => {
  const store = useStore(pageProps.initialReduxState);
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};
/* MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
}; */

export default MyApp;
