import { Banner } from "../../components/Banner/Banner";
import { BannerHero } from "../../components/Banner/BannerHerro";
import Layout from "../../components/Layouts/Layout";
import { IconVideo } from "@tabler/icons";
import { Grid, Anchor, ThemeIcon, Tabs } from "@mantine/core";
import { useState } from "react";
import Pagination from "../../components/News/Pagination";
import { useRouter } from "next/router";
// import image from "../../assets/News/banner.svg";
import image from "../../assets/About-us/banner.svg";
import { fetchData, post } from "../../store/middlewares/index";
import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeletons from "../../components/News/Skeletons";
import { translation } from "../../components/News/translation";

function reducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_TRIGGER":
      return {
        ...state,
        trigger: action.payload,
      };
    case "SET_CATEGORY":
      return {
        ...state,
        category: action.payload,
      };
    case "SET_DATA":
      return {
        ...state,
        data: action.payload,
      };
    case "SET_TOTAL":
      return {
        ...state,
        total: action.payload,
      };
    default:
      return state;
  }
}

const News = () => {
  const [state, setState] = useReducer(reducer, {
    loading: false,
    trigger: false,
    category: "",
    data: [],
    total: 0,
  });
  const router = useRouter();
  const dispatch = useDispatch();
  const [activePage, setPage] = useState(1);
  const { lang } = useSelector((state) => state.data);
  // console.log(lang);
  // console.log(activePage);

  useEffect(() => {
    setState({ type: "SET_LOADING", payload: true });
    dispatch(
      fetchData({
        url: `${
          state.category == ""
            ? `news?page=${activePage}`
            : `news/${state.category}?page=${activePage}`
        }`,
        lang: lang,
        action: (response) => {
          setState({ type: "SET_LOADING", payload: false });
          setState({ type: "SET_DATA", payload: response?.data?.data });
          setState({
            type: "SET_TOTAL",
            payload: Math.floor(response?.data?.meta?.total / 9) + 1,
          });
          // console.log(response, "-news");
        },
      })
    );
  }, [lang, activePage, state.category]);

  const banner = {
    title: translation[lang]?.banner_title,
    description: translation[lang]?.banner_description,
    image: image,
    with: "500px",
    height: "280px",
  };
  return (
    <Layout title="Habarlar" className="bg_gray">
      <BannerHero banner={banner} />
      <div className="w-full flex flex-col items-center my-10">
        <div className="container_out bg-white py-6 px-2 rounded-md">
          <Tabs defaultValue="first">
            <Tabs.List className="font-semibold">
              <Tabs.Tab
                value="first"
                className="text-xs sm:text-lg"
                onClick={() => {
                  setState({ type: "SET_CATEGORY", payload: "" });
                  setPage(1);
                  // setState({ type: "SET_TRIGGER", payload: true });
                }}
              >
                {translation[lang]?.category1}
              </Tabs.Tab>
              <Tabs.Tab
                value="second"
                className="text-xs sm:text-lg"
                onClick={() => {
                  setState({ type: "SET_CATEGORY", payload: "company" });
                  setPage(1);

                  // setState({ type: "SET_TRIGGER", payload: true });
                }}
              >
                {translation[lang]?.category2}
              </Tabs.Tab>
              <Tabs.Tab
                value="third"
                className="text-xs sm:text-lg"
                onClick={() => {
                  setState({ type: "SET_CATEGORY", payload: "event" });
                  setPage(1);

                  // setState({ type: "SET_TRIGGER", payload: true });
                }}
              >
                {translation[lang]?.category3}
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>
        </div>
        <div className="container_out my-10">
          <h1 className="font-bold text-2xl sm:text-4xl mb-4">
            {state.category == ""
              ? translation[lang]?.category1
              : state.category == "company"
              ? translation[lang]?.category2
              : translation[lang]?.category3}
          </h1>
          <hr />
        </div>
        <Grid
          className="container_out"
          // breakpoints={[{ minWidth: 400, cols: 2 }]}
        >
          {!state.loading ? (
            state.data?.map((item) => {
              return (
                <Grid.Col
                  key={item.id}
                  xs={6}
                  md={4}
                  lg={3}
                  className="bg-white rounded-md p-5 flex flex-col border cursor-pointer hover:text-blue-500"
                  onClick={() => {
                    router.push(`/habarlar/${item.id}`);
                  }}
                >
                  <h1 className="text-blue-500 mb-3 font-medium ">
                    {item.category}
                  </h1>
                  <span className="mb-2 font-semibold text-sm sm:text-base">
                    {item?.title}
                  </span>
                  <span className="text-sm">{item?.date}</span>
                </Grid.Col>
              );
            })
          ) : (
            <Skeletons />
          )}
        </Grid>
        {state.total ? (
          <div className="container_out mt-10">
            <Pagination
              activePage={activePage}
              setPage={setPage}
              total={state.total}
              siblings={2}
              boundaries={2}
            />
          </div>
        ) : null}
      </div>
      <Banner />
    </Layout>
  );
};
export default News;
