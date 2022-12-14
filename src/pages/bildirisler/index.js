import Card from "../../components/Notice/Card";
import LayoutNotice from "../../components/Notice/Layout";
import Skeletons from "../../components/Notice/Skeletons";
import { useEffect, useState, useReducer } from "react";
import { useRouter } from "next/router";
import { fetchData } from "../../store/middlewares";
import { useDispatch, useSelector } from "react-redux";
import { getlang, getToken } from "../../store/selectors/auth";
import Lottie from "lottie-react";
import notFound from "../../assets/Lottiefiles/not-found.json";
import Pagination from "../../components/News/Pagination";
// import loader from "../../assets/Lottiefiles/loader.json";
import { useWindowScroll } from "@mantine/hooks";

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
    // case "SET_LOCATION_CHECK":
    //   return {
    //     ...state,
    //     location_check: state.location_check.includes(action.payload)
    //       ? state.location_check.filter((item) => item !== action.payload)
    //       : [...state.location_check, action.payload],
    //   };
    default:
      return state;
  }
}

const Notice = () => {
  const dispatch = useDispatch();
  // const token = useSelector(getToken);
  const [scroll, scrollTo] = useWindowScroll();

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
  const handleChangePage = (page) => {
    if (+page !== +query.page) {
      router.push({
        pathname: "/bildirisler",
        query: { ...query, page },
      });
      scrollTo({ y: 0 });
    }
  };

  useEffect(() => {
    // console.log(query, "---query");
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
        url: `user/announcements?page=${query.page}&category=${
          query.category ? query.category : ""
        }&location=${location_array}&price=${
          query.price_sort ? query.price_sort : ""
        }&created_at=${query.created_at ? query.created_at : ""}&price_min=${
          query.price_min ? query.price_min : ""
        }&price_max=${query.price_max ? query.price_max : ""}`,
        lang: lang == "English" ? "en" : lang == "Turkmen" ? "tm" : "ru",
        action: (response) => {
          // console.log(response.data, "-----gelen response");
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
      {Math.floor(state.all_data?.meta?.total / 15) + 1 > 1 ? (
        <div className="bg-white mt-10 py-5 px-2 shadow-sm rounded-xl">
          <Pagination
            activePage={+query.page}
            setPage={(value) => handleChangePage(value)}
            total={Math.floor(state.all_data?.meta?.total / 15) + 1}
            siblings={2}
            boundaries={2}
          />
        </div>
      ) : null}
    </LayoutNotice>
  );
};

export default Notice;
