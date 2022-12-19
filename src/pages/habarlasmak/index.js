import { Container, Skeleton } from "@mantine/core";
import { Banner } from "../../components/Banner/Banner";
import { BannerHero } from "../../components/Banner/BannerHerro";
import Layout from "../../components/Layouts/Layout";
import {
  Grid,
  SimpleGrid,
  TextInput,
  Textarea,
  Button,
  Text,
  Anchor,
} from "@mantine/core";
import image from "../../assets/Contact/banner.svg";
import { useViewportSize } from "@mantine/hooks";
import { fetchData, post } from "../../store/middlewares/index";
import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeletons from "../../components/Contact/Skeletons";
import { translation } from "../../components/Ports/translation";

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
    case "SET_DATA_PORTS":
      return {
        ...state,
        data_ports: action.payload,
      };
    default:
      return state;
  }
}

const Habarlasmak = () => {
  const [state, setState] = useReducer(reducer, {
    loading: false,
    data: {},
    data_ports: [],
  });
  const { width } = useViewportSize();
  const { lang } = useSelector((state) => state.data);
  // console.log(lang);
  const dispatch = useDispatch();

  useEffect(() => {
    setState({ type: "SET_LOADING", payload: true });
    dispatch(
      fetchData({
        url: `contact`,
        lang: lang,
        action: (response) => {
          setState({ type: "SET_DATA", payload: response.data.data });

          console.log(response.data.data);
        },
      })
    );
    dispatch(
      fetchData({
        url: `ports`,
        lang: lang,
        action: (response) => {
          setState({ type: "SET_LOADING", payload: false });
          setState({ type: "SET_DATA_PORTS", payload: response.data.data });

          // console.log(response.data.data, "-ports");
        },
      })
    );
  }, [lang]);

  const banner = {
    title: state.data.title,
    description: state.data.description,
    image: image,
    with: "500px",
    height: "300px",
  };
  return (
    <Layout title="Habarlasmak" className="bg_gray">
      <BannerHero banner={banner} />
      <div className="w-full flex flex-col items-center">
        <div className="container_md">
          {state.data_ports ? (
            state.data_ports?.map((item) => {
              return (
                <div
                  key={item.id}
                  className="w-full bg-white rounded-lg my-5 sm:my-10 px-3 sm:px-10 py-2 sm:py-5 shadow-md cursor-pointer"
                >
                  <div className="py-3 border-b-2 border-gray-300">
                    <p className="font-semibold text-base sm:text-xl">
                      {item.title}
                    </p>
                  </div>
                  <div className="w-full flex flex-col sm:flex-row justify-between py-3">
                    <div className="sm:w-1/3">
                      <span className="text-gray-400 text-xs sm:text-sm">
                        {item.address}
                      </span>
                    </div>
                    <div className="sm:w-1/3 flex flex-col items-end mt-3 sm:mt-0">
                      <p className="font-medium text-sm sm:text-lg">
                        {item.email}
                      </p>
                      <span className="text-gray-300 text-sm">
                        {translation[lang]?.email}
                      </span>
                      <p className="font-medium text-sm sm:text-lg">
                        {item.phone}
                      </p>
                      <span className="text-gray-300 text-sm">
                        {translation[lang]?.phone}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <Skeletons />
          )}
        </div>
      </div>
      <div className="flex justify-center container my-5">
        <div className="container_md flex flex-col">
          <p className="text-blue-500 mb-4 ml-5 text-sm sm:text-base">
            {translation[lang]?.question1}
          </p>
          <h1 className="text-xl sm:text-3xl font-medium ml-5">
            {translation[lang]?.question2}
          </h1>
          <form>
            <Grid grow className="my-5 px-1">
              <Grid.Col span={width > 500 ? 6 : 12}>
                <TextInput
                  size={width > 500 ? "lg" : "md"}
                  placeholder="Ваш телефон"
                />
              </Grid.Col>
              <Grid.Col span={width > 500 ? 6 : 12}>
                <TextInput
                  size={width > 500 ? "lg" : "md"}
                  placeholder="Ваша почта"
                />
              </Grid.Col>
              <Grid.Col>
                <Textarea
                  size={width > 500 ? "lg" : "md"}
                  placeholder="Ваш вопрос"
                  autosize
                  minRows={6}
                />
              </Grid.Col>
            </Grid>
            <div className="flex flex-col sm:flex-row justify-between px-1">
              <Button className="bg-blue-700 mb-3 sm:mb-0">
                {" "}
                {translation[lang]?.send}
              </Button>
              <Text color="dimmed" size="sm">
                {translation[lang]?.question3}{" "}
                <Anchor
                  href="#"
                  size="sm"
                  // onClick={(event) => event.preventDefault()}
                >
                  {translation[lang]?.question4}
                </Anchor>
              </Text>
            </div>
          </form>
        </div>
      </div>
      <Banner />
    </Layout>
  );
};
export default Habarlasmak;
