import { Button, Center } from "@mantine/core";
import Layout from "../../components/Layouts/Layout";
import image1 from "../../assets/Notice/truck3.webp";
import { IconPhone } from "@tabler/icons";
import { fetchData } from "../../store/middlewares";
import { useDispatch, useSelector } from "react-redux";
import { getIsLoading, getlang } from "../../store/selectors/auth";
import { useState, useEffect, useReducer } from "react";
import { useRouter } from "next/router";
import Slider from "../../components/Notice/slug/Slider";
import { translation } from "../../components/Notice/translation";

function reducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        active: action.payload,
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

const NoticeSlug = () => {
  const [state, setState] = useReducer(reducer, {
    loading: false,
    data: {},
  });
  const router = useRouter();
  const dispatch = useDispatch();
  const lang = useSelector(getlang);
  useEffect(() => {
    setState({ type: "SET_LOADING", payload: true });
    dispatch(
      fetchData({
        url: `user/announcement/${router.query.slug}/fetch`,
        lang: lang,
        action: (response) => {
          console.log(response);
          setState({ type: "SET_LOADING", payload: false });
          if (response?.success) {
            setState({
              type: "SET_DATA",
              payload: response?.data?.data,
            });
          } else {
            console.log(response);
          }
        },
      })
    );
  }, [router.query.slug]);
  return (
    <Layout title={"Bildiriş detail"}>
      <div className="bg_gray">
        <Center className="py-10">
          <div className="container_out bg-white rounded-xl p-5 flex ">
            <div className="w-3/4 mr-10 p-5">
              <h1 className="font-semibold text-2xl mb-5">
                {state.data.title}
              </h1>
              <div className="w-full h-96 rounded-xl bg-gray-100 flex justify-center items-center">
                <Slider data={state.data} />
              </div>
              <div className="w-full flex py-5">
                <div className="w-3/12">
                  <span className="text-base font-semibold">
                    {translation[lang]?.description}
                  </span>
                </div>
                <div className="w-3/4">
                  <span className="text-base text-gray-500">
                    {state.data.description}
                  </span>
                </div>
              </div>
              <div className="w-full flex py-5">
                <div className="w-3/12">
                  <span className="text-base font-semibold">
                    {translation[lang]?.created_at}
                  </span>
                </div>
                <div className="w-3/4">
                  <span className="text-base text-gray-500">
                    {state.data.created_at}
                  </span>
                </div>
              </div>
              <div className="w-full flex py-5">
                <div className="w-3/12">
                  <span className="text-base font-semibold">
                    {translation[lang]?.category}
                  </span>
                </div>
                <div className="w-3/4">
                  <span className="text-base text-gray-500">
                    {state.data.category}
                  </span>
                </div>
              </div>
              {state.data.capacity != " " ? (
                <div className="w-full flex py-5">
                  <div className="w-3/12">
                    <span className="text-base font-semibold">
                      {translation[lang]?.capacity}
                    </span>
                  </div>
                  <div className="w-3/4">
                    <span className="text-base text-gray-500">
                      {state.data.capacity}
                    </span>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="w-3/12 h-40 py-5">
              <h1 className="font-bold text-2xl mb-5">
                {state.data.price} <span className="text-base">TMT</span>
              </h1>
              <Button size="lg" className="bg-blue-500 w-full mb-5">
                <IconPhone size={23} className="mr-4" />
                +993 {state.data.phone}
              </Button>
              <div className="flex text-sm items-center py-3">
                <span className="font-semibold text-base mr-3">
                  {translation[lang]?.user}:{" "}
                </span>
                <span className="text-gray-500">
                  {state.data.user?.first_name}
                </span>
              </div>
              {/* <div className="flex text-sm items-center py-3">
                <span className="font-semibold text-base mr-3">
                  Просмотры:{" "}
                </span>
                <span className="text-gray-500">{data.eye}</span>
              </div> */}
            </div>
          </div>
        </Center>
      </div>
    </Layout>
  );
};

export default NoticeSlug;
