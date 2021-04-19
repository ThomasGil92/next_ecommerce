import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "react-toastify/dist/ReactToastify.css";
import "lazysizes";
import { useSelector } from "react-redux";
import {useEffect} from 'react'
import Footer from "./public/Footer";

Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

const Layout = ({ children ,title}) => {
  const theme = useSelector((state) => state.theme);
useEffect(()=>{
  if (process.browser){
    const body=document.querySelector("body")
    if(theme==="light"){
      body.style.backgroundColor="#f5f5f5"
    }else if(theme==="dark"){
      body.style.backgroundColor="#343A40"
    }
    
  }
},[theme])

  const head = () => (
    <Head>
      <title>{title} / Ecommerce</title>
      {/* <script src="lazysizes.min.js" async=""></script> */}
      {/*  <link rel="preload" href="bootstrap/css/bootstrap.min.css"></link> */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
        integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2"
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap"
        rel="preload"
      ></link>
      <link rel="icon" href="/favicon.ico" />

      <script
        src="https://kit.fontawesome.com/0115099959.js"
        crossOrigin="anonymous"
      ></script>

      <script
        src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
        integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN"
        crossOrigin="anonymous"
      ></script>
      <script
        src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
        crossOrigin="anonymous"
      ></script>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx"
        crossOrigin="anonymous"
      ></script>

      <script src="https://js.stripe.com/v3/" async></script>
    </Head>
  );
  return (
    <>
      {head()}
      <div
        //style={{ backgroundColor: theme === "dark" ? "" : "#f5f5f5f5" }}
      >
        {children}
        <Footer />
      </div>
    </>
  );
};
export default Layout;
