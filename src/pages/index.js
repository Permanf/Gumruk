import Head from "next/head";
import Image from "next/image";
import { Button } from "@mantine/core";

import Layout from "../components/Layouts/Layout";
import { BannerHero } from "../components/Banner/BannerHerro";
import { Banner } from "../components/Banner/Banner";
import section1 from "../assets/Home/banner.svg";
import section2 from "../assets/Home/section2.svg";
import section3 from "../assets/Home/section3.svg";
// import icon1 from "../assets/Home/icon1.svg";
// import icon2 from "../assets/Home/icon2.svg";
// import icon3 from "../assets/Home/icon3.svg";
// import icon4 from "../assets/Home/icon4.svg";
import { Icon } from "react-icons-kit";
import { arrowRight2 } from "react-icons-kit/icomoon/arrowRight2";
import SliderHome from "../components/Sliders/SliderHome";
import { useRouter } from "next/router";
import { useViewportSize } from "@mantine/hooks";
import { fetchData, post } from "../store/middlewares/index";
import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeletons from "../components/Home/Skeletons";
import { translation } from "../components/Header/translation";

function reducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_DATA":
      return {
        ...state,
        data: action.payload,
      };
    case "SET_LOADING2":
      return {
        ...state,
        loading2: action.payload,
      };
    case "SET_DATA_SERVICE":
      return {
        ...state,
        data_service: action.payload,
      };
    default:
      return state;
  }
}

const Home = () => {
  const { width } = useViewportSize();
  const [state, setState] = useReducer(reducer, {
    loading: false,
    loading2: false,
    data: [],
    data_ports: [],
  });
  const router = useRouter();
  const dispatch = useDispatch();
  const { lang } = useSelector((state) => state.data);

  useEffect(() => {
    setState({ type: "SET_LOADING", payload: true });
    dispatch(
      fetchData({
        url: `news`,
        lang: lang,
        action: (response) => {
          setState({ type: "SET_LOADING", payload: false });
          setState({ type: "SET_DATA", payload: response?.data?.data });
        },
      })
    );
  }, [lang]);
  useEffect(() => {
    setState({ type: "SET_LOADING2", payload: true });
    dispatch(
      fetchData({
        url: `services`,
        lang: lang,
        action: (response) => {
          setState({ type: "SET_LOADING2", payload: false });
          setState({ type: "SET_DATA_SERVICE", payload: response?.data?.data });
        },
      })
    );
  }, [lang]);

  const banner = {
    title: translation[lang]?.banner_title,
    description: translation[lang]?.banner_description,
    button: translation[lang]?.banner_button,
    // image: section1,
  };

  return (
    <Layout title="Home">
      <BannerHero banner={banner} />
      {width > 950 ? (
        <div className="w-full flex flex-col items-center bg_gray">
          <div className="container_out -mt-10 pb-10">
            <SliderHome data={state.data} withControls={false} />
          </div>
        </div>
      ) : null}

      <div className="w-ful flex justify-center bg_blue text-white py-10">
        <div className="container_md flex flex-col">
          <p className="mb-4 ml-5">{translation[lang]?.section1_1}</p>
          <h1 className="text-2xl md:text-4xl font-bold ml-5">
            {translation[lang]?.section1_2}
          </h1>
          <span className="text-sm sm:w-96 mt-3 p-4 sm:p-0">
            {translation[lang]?.section1_3}
          </span>
          <Button
            variant="outline"
            radius="md"
            size="md"
            className="bg-white w-40 my-4 hover:text-white text-sm sm:text-lg"
          >
            {translation[lang]?.section1_4}
          </Button>
          <div
            style={{
              backgroundImage: `url(${section2.src})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              width: `100%`,
              height: ` ${width > 500 ? "550px" : "300px"}`,
            }}
          ></div>
        </div>
      </div>
      <div className="w-full bg_gray flex justify-center">
        <div className="container_out flex flex-col -mt-14 sm:-mt-20">
          {state.data_service ? (
            state.data_service?.map((item) => {
              return (
                <div
                  key={item.id}
                  className="w-full bg-white rounded-lg my-5 p-4 md:p-10  cursor-pointer shadow-md"
                >
                  <div className="w-full flex justify-between items-center py-3">
                    <Image
                      src={item?.icon}
                      width={width > 500 ? 45 : 26}
                      height={width > 500 ? 45 : 26}
                      alt="image"
                    />
                    <p className="font-semibold text-xs sm:text-sm md:text-xl ml-2">
                      {item?.title}
                    </p>
                    <span className="text-xs w-32 md:w-60 break-all">
                      {item?.description}
                    </span>
                    <Icon
                      size={width > 500 ? 25 : 15}
                      icon={arrowRight2}
                      className="text-blue-700"
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <Skeletons />
          )}
        </div>
      </div>
      <div className="flex justify-center bg_gray py-10 sm:py-20">
        <div
          className="container_out"
          style={{
            backgroundImage: `url(${section3.src})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            height: ` ${width > 500 ? "200px" : "80px"}`,
          }}
        ></div>
      </div>
      <div className="flex flex-col items-center py-10 bg_gray">
        <div className="container_out flex justify-between mb-4">
          <h1 className="font-bold text-2xl sm:text-4xl mb-4 text-blue-600">
            {translation[lang]?.news}
          </h1>
          <Button
            variant="outline"
            radius="md"
            size="md"
            className="text-sm sm:text-lg"
            onClick={() => {
              router.push(`/habarlar`);
            }}
          >
            {translation[lang]?.all_news}
          </Button>
        </div>
        <div className="container_out py-2">
          <SliderHome data={state.data} withControls={true} />
        </div>
      </div>
      <Banner />
    </Layout>
  );
};
export default Home;
