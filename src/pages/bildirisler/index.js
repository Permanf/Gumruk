import Card from "../../components/Notice/Card";
import LayoutNotice from "../../components/Notice/Layout";
import Skeletons from "../../components/Notice/Skeletons";
import { Button, Center } from "@mantine/core";
import { IconRefresh } from "@tabler/icons";
import { useEffect, useState, useReducer } from "react";
import { useRouter } from "next/router";
import { fetchData } from "../../store/middlewares";
import { useDispatch, useSelector } from "react-redux";
import { getlang, getToken } from "../../store/selectors/auth";
import Lottie from "lottie-react";
import notFound from "../../assets/Lottiefiles/not-found.json";
// import loader from "../../assets/Lottiefiles/loader.json";

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
    // case "SET_CATEGORY_ID":
    //   return {
    //     ...state,
    //     category_id: action.payload,
    //   };
    // case "SET_LOCATION_CHECK":
    //   return {
    //     ...state,
    //     location_check: state.location_check.includes(action.payload)
    //       ? state.location_check.filter((item) => item !== action.payload)
    //       : [...state.location_check, action.payload],
    //   };
    // case "SET_CREATED_AT":
    //   return {
    //     ...state,
    //     created_at: action.payload,
    //   };
    // case "SET_PRICE_SORT":
    //   return {
    //     ...state,
    //     price_sort: action.payload,
    //   };
    // case "SET_PRICE_MIN":
    //   return {
    //     ...state,
    //     price_min: action.payload,
    //   };
    // case "SET_PRICE_MAX":
    //   return {
    //     ...state,
    //     price_max: action.payload,
    //   };
    default:
      return state;
  }
}

const Notice = () => {
  const dispatch = useDispatch();
  // const token = useSelector(getToken);
  const lang = useSelector(getlang);
  const router = useRouter();
  const { query } = router;
  const [state, setState] = useReducer(reducer, {
    trigger: false,
    loading: false,
    all_data: {},
    sidebar_loading: false,
    sidebar_data: {},
  });
  // const handleRoute = (elements) => {
  //   router.push({
  //     pathname: "/bildirisler",
  //     query: { ...query, ...elements },
  //   });
  // };
  // useEffect(() => {
  //   // url-de page sazlasan bolya galan zat dogry
  // }, [query]);

  useEffect(() => {
    // console.log(router);
    console.log(query, "---query");

    let location_array = "";
    if (query?.locations) {
      location_array = query?.locations
        ?.split(",")
        ?.filter((item) => item !== "");
    }
    for (let i = 0; i < location_array?.length; i++) {
      location_array[i] = parseInt(location_array[i]);
    }
    // console.log(location_array, "--arr");
    setState({ type: "SET_LOADING", payload: true });
    dispatch(
      fetchData({
        url: `user/announcements?category_id=${
          query.category ? query.category : ""
        }&location=${location_array}&price=${
          query.price_sort ? query.price_sort : ""
        }&created_at=${query.created_at ? query.created_at : ""}&price_min=${
          query.price_min ? query.price_min : ""
        }&price_max=${query.price_max ? query.price_max : ""}`,
        // url: `user/announcements`,
        lang: lang == "English" ? "en" : lang == "Turkmen" ? "tm" : "ru",
        action: (response) => {
          // console.log(response.data, "-----data");
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
  }, [query]);

  return (
    <LayoutNotice
      title="Bildirişler"
      state={state}
      setState={setState}
      query={query}
    >
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
      {/* {state?.all_data?.data?.length ? (
        <Center>
          <Button
            className="bg-blue-500"
            onChange={(event) => {
              event.preventDefault();
              let active_page = query?.page ? parseInt(query?.page) : 1;
              handleRoute({
                page: active_page + 1,
              });
            }}
          >
            <IconRefresh size={18} className="mr-2" />
            show more
          </Button>
        </Center>
      ) : null} */}
    </LayoutNotice>
  );
};

export default Notice;
