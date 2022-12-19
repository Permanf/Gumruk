import { Container } from "@mantine/core";
import { Banner } from "../../components/Banner/Banner";
import { BannerHero } from "../../components/Banner/BannerHerro";
import Layout from "../../components/Layouts/Layout";
import {
  Grid,
  SimpleGrid,
  TextInput,
  Textarea,
  Button,
  Checkbox,
  Code,
  Text,
  Anchor,
} from "@mantine/core";
import image from "../../assets/Contact/banner.svg";
import { fetchData, post } from "../../store/middlewares/index";
import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeletons from "../../components/Service/Skeletons";
import { translation } from "../../components/Service/translation";

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
    default:
      return state;
  }
}

const Hyzmatlar = () => {
  const [state, setState] = useReducer(reducer, {
    loading: false,
    data: [],
  });
  const { lang } = useSelector((state) => state.data);
  // console.log(lang);
  const dispatch = useDispatch();

  useEffect(() => {
    setState({ type: "SET_LOADING", payload: true });
    dispatch(
      fetchData({
        url: `services`,
        lang: lang,
        action: (response) => {
          setState({ type: "SET_LOADING", payload: false });
          setState({ type: "SET_DATA", payload: response.data.data });

          console.log(response);
        },
      })
    );
  }, [lang]);

  const banner = {
    title: translation[lang].banner_title,
    description: translation[lang].banner_description,
    image: image,
    with: "500px",
    height: "300px",
  };

  return (
    <Layout title="Hyzmatlar" className="bg_gray">
      <BannerHero banner={banner} />
      <div className="w-full flex flex-col items-center">
        <div className="container_md">
          {state.data ? (
            state.data?.map((item) => {
              return (
                <>
                  <div
                    key={item.id}
                    className="w-full flex flex-col items-start my-4 mt-16"
                  >
                    <p className="font-semibold text-2xl sm:text-4xl text-blue-700">
                      {item.title}
                    </p>
                    <span className="text-gray-400 text-sm sm:text-base sm:w-96 mt-4">
                      {item.description}
                    </span>
                  </div>
                  {item?.children?.map((sub) => {
                    return (
                      <div
                        key={sub.id}
                        className="w-full bg-white rounded-lg my-5 sm:my-10 px-3 sm:px-10 py-2 sm:py-5 shadow-md cursor-pointer"
                      >
                        <div className="w-full flex flex-col sm:flex-row justify-between py-3">
                          <div className="sm:w-1/3">
                            <p className="font-semibold  text-sm sm:text-base">
                              {sub.title}
                            </p>
                          </div>
                          <div className="sm:w-1/3 flex flex-col items-end justify-center">
                            <span className="text-gray-400 text-xs sm:text-sm mt-4 sm:mt-0">
                              {sub?.description}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              );
            })
          ) : (
            <Skeletons />
          )}
        </div>
      </div>
      <Banner />
    </Layout>
  );
};
export default Hyzmatlar;
