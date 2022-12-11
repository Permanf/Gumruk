import Head from "next/head";
import Footer from "../Footer";
import Header from "../Header";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadUser } from "../../store/middlewares/auth";
import { fetchData } from "../../store/middlewares";
import { userData } from "../../store/actions/auth";

const Layout = ({ children, title, className }) => {
  const dispatch = useDispatch();
  const { lang, token } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(LoadUser());
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(
        fetchData({
          token,
          url: `user/me`,
          action: (response) => {
            // console.log(response.data, "---lay");
            if (response.data.success) {
              dispatch(userData(response?.data?.data));
            } else {
              console.log(response.message);
            }
          },
        })
      );
    } // eslint-disable-next-line
  }, [lang, token]);
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
