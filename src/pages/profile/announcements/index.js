import LayoutProfile from "../../../components/Profile/Layout";
import { Grid, Button } from "@mantine/core";
import Ticket from "../../../components/Profile/Ticket";
import Link from "next/link";
import { IconPlus } from "@tabler/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  imageIds,
  setDeclarationId,
  setFileProgress,
} from "../../../store/actions/data";
import { useEffect, useReducer } from "react";
import { fetchData } from "../../../store/middlewares";
import { getlang, getToken } from "../../../store/selectors/auth";
import Lottie from "lottie-react";
import notFound from "../../../assets/Lottiefiles/not-found.json";
import loader from "../../../assets/Lottiefiles/loader.json";
import Card from "../../../components/Notice/Card";
import { ticket } from "../../../components/Profile/translation";

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

const Announcements = () => {
  const [state, setState] = useReducer(reducer, {
    loading: false,
    data: [],
  });
  const dispatch = useDispatch();
  dispatch(setFileProgress({}));
  dispatch(imageIds(null));
  dispatch(setDeclarationId(null));
  const token = useSelector(getToken);
  const lang = useSelector(getlang);
  useEffect(() => {
    setState({ type: "SET_LOADING", payload: true });
    if (token) {
      dispatch(
        fetchData({
          token,
          url: `user/my-announcements`,
          lang: lang,
          action: (response) => {
            setState({ type: "SET_LOADING", payload: false });
            if (response.success) {
              // console.log(response.data.data, "--my");
              setState({
                type: "SET_DATA",
                payload: response?.data?.data,
              });
            } else {
              console.log(response.message);
            }
          },
        })
      );
    } // eslint-disable-next-line
  }, [token, lang]);
  return (
    <LayoutProfile title="Biletler">
      <div className="p-7">
        <div className="flex justify-between items-center mb-5">
          <h1 className="my-3 font-semibold text-xl">
            {ticket[lang]?.announcement}
          </h1>
        </div>
        {state.loading ? (
          <div className="flex flex-col items-center">
            <Lottie animationData={loader} loop={true} className="h-20" />
          </div>
        ) : state.data?.length > 0 ? (
          state.data?.map((item, index) => {
            return <Card item={item} key={index} type={1} />;
          })
        ) : (
          <div className="flex flex-col items-center">
            <Lottie animationData={notFound} loop={true} className="h-52" />
            <span>No data</span>
          </div>
        )}
      </div>
    </LayoutProfile>
  );
};

export default Announcements;
