import { Center, Grid } from "@mantine/core";
import LayoutProfile from "../../../components/Profile/Layout";
import Ticket from "../../../components/Profile/Ticket";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useReducer } from "react";
import { fetchData } from "../../../store/middlewares";
import { getlang, getToken } from "../../../store/selectors/auth";
import Lottie from "lottie-react";
import notFound from "../../../assets/Lottiefiles/not-found.json";
import loader from "../../../assets/Lottiefiles/loader.json";
import { profile_links } from "../../../components/Profile/translation";

function reducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_DATA_TICKETS":
      return {
        ...state,
        tickets: action.payload,
      };
    default:
      return state;
  }
}

const History = () => {
  const [state, setState] = useReducer(reducer, {
    loading: false,
    tickets: [],
  });
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const lang = useSelector(getlang);
  useEffect(() => {
    setState({ type: "SET_LOADING", payload: true });
    if (token) {
      dispatch(
        fetchData({
          token,
          url: `user/tickets/closed`,
          action: (response) => {
            // console.log(response.data);
            setState({ type: "SET_LOADING", payload: false });
            if (response.success) {
              // console.log(response.data.data);
              setState({
                type: "SET_DATA_TICKETS",
                payload: response?.data?.data,
              });
            } else {
              console.log(response.message);
            }
          },
        })
      );
    } // eslint-disable-next-line
  }, [token]);
  return (
    <LayoutProfile title="History declaration">
      <div className="p-7 w-full h-full">
        <h1 className="mb-3 font-semibold text-xl">
          {profile_links[lang]?.history_declaration}
        </h1>
        {state.loading ? (
          <div className="flex flex-col items-center">
            <Lottie animationData={loader} loop={true} className="h-20" />
          </div>
        ) : state.tickets?.length > 0 ? (
          <Grid gutter={30} className="w-full">
            {state.tickets?.map((item, index) => {
              return <Ticket key={index} nomer={index + 1} element={item} />;
            })}
          </Grid>
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

export default History;
