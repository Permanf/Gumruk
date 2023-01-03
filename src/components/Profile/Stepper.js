import { memo, useState, useEffect, useReducer } from "react";
import { Stepper } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../store/middlewares";
import StepImage from "./Create/Step-one/StepImage";
import StepForm from "./Create/Step-two/StepForm";
import StepAdd from "./Create/Step-third/StepAdd";
import { declaration } from "./translation";
import { getlang } from "../../store/selectors/auth";

function reducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_LOADING_NAME":
      return {
        ...state,
        loading_name: action.payload,
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
    case "SET_UPDATE_2STEP":
      return {
        ...state,
        update_2step: action.payload,
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
    case "SET_NAME_PRODUCTS":
      return {
        ...state,
        name_products: action.payload,
      };
    case "SET_SEARCH_PRODUCTS":
      return {
        ...state,
        search_products: action.payload,
      };
    case "SET_MODAL_BTN":
      return {
        ...state,
        modal_btn: action.payload,
      };
    case "SET_NEXT":
      return {
        ...state,
        next: action.payload,
      };
    case "SET_IMAGES":
      return {
        ...state,
        images: action.payload,
      };
    case "SET_LOADING_IMAGE":
      return {
        ...state,
        loading_image: action.payload,
      };
    case "SET_DELETE_IMAGE_OLD":
      return {
        ...state,
        images: state.images.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
}

function Step({ update_id }) {
  const [state, setState] = useReducer(reducer, {
    loading: false,
    loading_name: false,
    data_declaration: [],
    update_data: {},
    update_2step: {},
    products: [],
    update_id: update_id > 0 ? update_id : null,
    product_status: true,
    update_item: {},
    name_products: [],
    search_products: [],
    modal_btn: false,
    next: false,
    images: [],
    loading_image: false,
  });
  const [active, setActive] = useState(0);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const lang = useSelector(getlang);
  useEffect(() => {
    if (token) {
      dispatch(
        fetchData({
          token,
          url: `user/declaration/create`,
          lang: lang,
          action: (response) => {
            console.log(response.data);
            if (response.success) {
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
            lang: lang,
            action: (response) => {
              // console.log(response.data);
              if (response.success) {
                setState({
                  type: "SET_UPDATE_DATA",
                  payload: response?.data?.data,
                });
                setState({
                  type: "SET_UPDATE_2STEP",
                  payload: response?.data?.data.declaration,
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
  }, [token, lang, update_id]);
  return (
    <>
      {state.update_data?.notice?.message?.length > 0 ? (
        <div className="bg-red-100 text-red-600 p-4 rounded-xl mb-10">
          <span className="font-semibold">
            {state.update_data?.notice?.message}
          </span>
        </div>
      ) : null}
      <Stepper
        active={active}
        onStepClick={setActive}
        breakpoint="sm"
        className="px-4"
      >
        <Stepper.Step
          label={declaration[lang]?.first_step}
          description={declaration[lang]?.image_upload}
          allowStepSelect={active > 0}
        >
          <h1 className="font-semibold my-5">
            {declaration[lang]?.first_step}: {declaration[lang]?.image_upload}
          </h1>
          <StepImage
            active={active}
            setActive={setActive}
            state={state}
            setState={setState}
          />
        </Stepper.Step>
        <Stepper.Step
          label={declaration[lang]?.second_step}
          description={declaration[lang]?.declaration_form}
          allowStepSelect={active > 1}
        >
          <h1 className="font-semibold my-5">
            {declaration[lang]?.second_step}:{" "}
            {declaration[lang]?.declaration_form}
          </h1>
          <StepForm
            active={active}
            setActive={setActive}
            state={state}
            setState={setState}
          />
        </Stepper.Step>
        <Stepper.Step
          label={declaration[lang]?.third_step}
          description={declaration[lang]?.create_product}
          allowStepSelect={active > 2}
        >
          <h1 className="font-semibold my-5">
            {declaration[lang]?.third_step}: {declaration[lang]?.create_product}
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
