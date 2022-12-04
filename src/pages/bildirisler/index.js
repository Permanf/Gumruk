import Card from "../../components/Notice/Card";
import LayoutNotice from "../../components/Notice/Layout";
import Skeletons from "../../components/Notice/Skeletons";
// import image1 from "../../assets/Notice/truck.webp";
// import image2 from "../../assets/Notice/truck1.webp";
// import image3 from "../../assets/Notice/truck3.webp";
// import image4 from "../../assets/Notice/truck4.webp";
// import image5 from "../../assets/Notice/truck5.webp";
import { Button, Center } from "@mantine/core";
import { IconRefresh } from "@tabler/icons";
import { useEffect, useState, useReducer } from "react";
import { useRouter } from "next/router";
import { fetchData } from "../../store/middlewares";
import { useDispatch, useSelector } from "react-redux";
import { getlang, getToken } from "../../store/selectors/auth";
import Lottie from "lottie-react";
import notFound from "../../assets/Lottiefiles/not-found.json";
import loader from "../../assets/Lottiefiles/loader.json";

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
        all_data: action.payload,
      };
    default:
      return state;
  }
}

const Notice = () => {
  const [state, setState] = useReducer(reducer, {
    loading: false,
    all_data: {},
  });
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const lang = useSelector(getlang);
  const router = useRouter();
  useEffect(() => {
    setState({ type: "SET_LOADING", payload: true });
    dispatch(
      fetchData({
        url: `user/announcements`,
        lang: lang == "English" ? "en" : lang == "Turkmen" ? "tm" : "ru",
        action: (response) => {
          // console.log(response);
          setState({ type: "SET_LOADING", payload: false });
          if (response?.success) {
            setState({
              type: "SET_DATA",
              payload: response?.data,
            });
          } else {
            console.log(response);
          }
        },
      })
    );
    dispatch(
      fetchData({
        url: `user/announcement/filters`,
        lang: lang == "English" ? "en" : lang == "Turkmen" ? "tm" : "ru",
        action: (response) => {
          console.log(response, "--filter");
        },
      })
    );
  }, []);

  return (
    <LayoutNotice title="Bildirişler" size={state?.all_data?.data?.length}>
      {state.loading ? (
        <Skeletons />
      ) : state?.all_data?.data?.length ? (
        state?.all_data?.data?.map((item, index) => {
          return <Card item={item} key={index} />;
        })
      ) : (
        <div className="flex flex-col items-center mt-10 rounded-lg shadow-lg h-96 w-full bg-white">
          <Lottie animationData={notFound} loop={true} className="h-52" />
          <span>No data</span>
        </div>
      )}
      {state?.all_data?.data?.length ? (
        <Center>
          <Button className="bg-blue-500">
            <IconRefresh size={18} className="mr-2" />
            show more
          </Button>
        </Center>
      ) : null}
    </LayoutNotice>
  );
};

export default Notice;
