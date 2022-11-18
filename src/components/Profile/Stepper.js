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
    default:
      return state;
  }
}

function Step() {
  const [state, setState] = useReducer(reducer, {
    loading: false,
    data_declaration: [],
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
    } // eslint-disable-next-line
  }, [token]);
  return (
    <>
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
          <StepImage active={active} setActive={setActive} />
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
            data={state.data_declaration}
            active={active}
            setActive={setActive}
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
            data={state.data_declaration}
            active={active}
            setActive={setActive}
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
