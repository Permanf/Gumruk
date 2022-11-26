import { memo, useState, useEffect, useReducer } from "react";
import { Stepper } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../store/middlewares";
import StepImage from "./Create/Step-one/StepImage";
import StepForm from "./Create/Step-two/StepForm";
import StepAdd from "./Create/Step-third/StepAdd";

function reducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_DATA_DECLARATION":
      return {
        ...state,
        data_declaration: action.payload,
      };
    case "SET_UPDATE_DATA":
      return {
        ...state,
        update_data: action.payload,
      };
    case "SET_UPDATE_ID":
      return {
        ...state,
        update_id: action.payload,
      };
    case "SET_PRODUCTS":
      return {
        ...state,
        products:
          action.payload?.length > 0
            ? action.payload
            : [...state.products, action.payload],
      };
    case "SET_PRODUCT_STATUS":
      return {
        ...state,
        product_status: action.payload,
      };
    case "SET_UPDATE_ITEM":
      return {
        ...state,
        update_item: action.payload,
      };
    case "SET_UPDATE_PRODUCT_ITEM":
      return {
        ...state,
        products: state.update_id
          ? state.products.map((item) =>
              item.id == action.payload.id ? action.payload : item
            )
          : state.products.map((item) =>
              item.code == action.payload.code ? action.payload : item
            ),
      };
    case "SET_DELETE_ITEM":
      return {
        ...state,
        products: state.update_id
          ? state.products.filter((item) => item.id !== action.payload)
          : state.products.filter((item) => item.name !== action.payload),
      };
    default:
      return state;
  }
}

function Step({ update_id }) {
  const [state, setState] = useReducer(reducer, {
    loading: false,
    data_declaration: [],
    update_data: {},
    products: [],
    update_id: update_id > 0 ? update_id : null,
    product_status: true,
    update_item: {},
  });
  const [active, setActive] = useState(0);
  const dispatch = useDispatch();
  const { lang, token } = useSelector((state) => state.auth);
  // console.log(token);
  useEffect(() => {
    if (token) {
      dispatch(
        fetchData({
          token,
          url: `user/declaration/create`,
          action: (response) => {
            // console.log(response.data);
            if (response.success) {
              // console.log(response.data.data);
              setState({
                type: "SET_DATA_DECLARATION",
                payload: response?.data?.data,
              });
            } else {
              console.log(response.message);
            }
          },
        })
      );
      if (update_id) {
        setState({
          type: "SET_UPDATE_ID",
          payload: update_id,
        });
        dispatch(
          fetchData({
            token,
            url: `user/ticket/${update_id}/show`,
            action: (response) => {
              // console.log(response.data);
              if (response.success) {
                // console.log(response.data.data.declaration, "--show");
                setState({
                  type: "SET_UPDATE_DATA",
                  payload: response?.data?.data,
                });
                setState({
                  type: "SET_PRODUCTS",
                  payload: response?.data?.data.declaration?.items,
                });
              } else {
                console.log(response.message);
              }
            },
          })
        );
      }
    } // eslint-disable-next-line
  }, [token, update_id]);
  return (
    <>
      {state.update_data?.notice?.[0]?.message?.length > 0 ? (
        <div className="bg-red-100 text-red-600 p-4 rounded-xl mb-10">
          <span>{state.update_data?.notice?.[0]?.message}</span>
        </div>
      ) : null}
      <Stepper
        active={active}
        onStepClick={setActive}
        breakpoint="sm"
        className="px-4"
      >
        <Stepper.Step
          label="First step"
          description="Image upload"
          allowStepSelect={active > 0}
          // loading={true}
        >
          <h1 className="font-semibold my-5">Step 1 content: Image upload</h1>
          <StepImage
            active={active}
            setActive={setActive}
            update_data={state.update_data}
          />
        </Stepper.Step>
        <Stepper.Step
          label="Second step"
          description=" Declaration form"
          allowStepSelect={active > 1}
          // color="red"
          // completedIcon={<IconCircleX />}
        >
          <h1 className="font-semibold my-5">
            Step 2 content: Declaration form
          </h1>
          <StepForm
            // data={state.data_declaration}
            active={active}
            setActive={setActive}
            state={state}
            setState={setState}
            // update_data={state.update_data}
          />
        </Stepper.Step>
        <Stepper.Step
          label="Final step"
          description="Create products"
          allowStepSelect={active > 2}
          // loading
        >
          <h1 className="font-semibold my-5">
            Step 3 content: Create products
          </h1>
          <StepAdd
            active={active}
            setActive={setActive}
            state={state}
            setState={setState}
          />
        </Stepper.Step>
        {/* <Stepper.Completed>
            Completed, click back button to get to previous step
          </Stepper.Completed> */}
      </Stepper>
    </>
  );
}

export default memo(Step);
