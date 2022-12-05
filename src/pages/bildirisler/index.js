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
    case "SET_TRIGGER":
      return {
        ...state,
        trigger: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_SIDEBAR_LOADING":
      return {
        ...state,
        sidebar_loading: action.payload,
      };
    case "SET_DATA":
      return {
        ...state,
        all_data: action.payload,
      };
    case "SET_SIDEBAR_DATA":
      return {
        ...state,
        sidebar_data: action.payload,
      };
    case "SET_CATEGORY_ID":
      return {
        ...state,
        category_id: action.payload,
      };
    case "SET_CREATED_AT":
      return {
        ...state,
        created_at: action.payload,
      };
    case "SET_PRICE_SORT":
      return {
        ...state,
        price_sort: action.payload,
      };
    case "SET_PRICE_MIN":
      return {
        ...state,
        price_min: action.payload,
      };
    case "SET_PRICE_MAX":
      return {
        ...state,
        price_max: action.payload,
      };
    default:
      return state;
  }
}

const Notice = () => {
  const [state, setState] = useReducer(reducer, {
    trigger: false,
    loading: false,
    all_data: {},
    sidebar_loading: false,
    sidebar_data: {},
    category_id: 1,
    created_at: "",
    price_sort: "",
    price_min: null,
    price_max: null,
  });
  const dispatch = useDispatch();
  // const token = useSelector(getToken);
  const lang = useSelector(getlang);
  const router = useRouter();
  useEffect(() => {
    setState({ type: "SET_LOADING", payload: true });
    console.log(state);
    dispatch(
      fetchData({
        url: `user/announcements?category_id=${state.category_id}&price=${state.price_sort}&created_at=${state.created_at}&price_min=${state.price_min}&price_max=${state.price_max}`,
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
  }, [state.trigger]);

  return (
    <LayoutNotice title="Bildirişler" state={state} setState={setState}>
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
