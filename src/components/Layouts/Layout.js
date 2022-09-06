import Head from "next/head";
import Footer from "../Footer";
import Header from "../Header";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { LoadUser } from "../../store/middlewares/auth";

const Layout = ({ children, title, className }) => {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(LoadUser());
  // }, []);
  return (
    <>
      <Head>
        <title>{title && `${title} | `} Gümrük gullugy</title>
        <meta
          name="description"
          content={title && `${title} | Gümrük gullugy`}
        />
        <meta name="keywords" content={title && `${title} | Gümrük gullugy`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <section className={`${className}`}>{children}</section>
      <Footer />
    </>
  );
};

export default Layout;
