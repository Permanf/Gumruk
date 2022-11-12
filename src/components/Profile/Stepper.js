import { memo, useState } from "react";

import { Stepper, Button, Group } from "@mantine/core";
import { IconCircleX } from "@tabler/icons";
import StepCreate from "./Create/StepCreate";
import { useWindowScroll } from "@mantine/hooks";

function Step() {
  const [active, setActive] = useState(0);
  const [scroll, scrollTo] = useWindowScroll();
  const nextStep = () => {
    setActive((current) => (current < 3 ? current + 1 : current));
    scrollTo({ y: 0 });
  };
  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
    scrollTo({ y: 0 });
  };
  return (
    <>
      <form
      //  onSubmit={handleSubmit(onSubmit)}
      >
        <Stepper
          active={active}
          onStepClick={setActive}
          breakpoint="sm"
          className="px-4"
        >
          <Stepper.Step
            label="First step"
            description="Declaration form"
            allowStepSelect={active > 0}
          >
            <h1 className="font-semibold my-5">
              Step 1 content: Declaration form
            </h1>
            {/* <input type="text" className="border mb-5" /> */}
            <StepCreate />
          </Stepper.Step>
          <Stepper.Step
            label="Second step"
            description="Create products"
            allowStepSelect={active > 1}
            // color="red"
            // completedIcon={<IconCircleX />}
          >
            <h1 className="font-semibold my-5">
              Step 2 content: Create products
            </h1>
          </Stepper.Step>
          <Stepper.Step
            label="Final step"
            description="Image upload"
            allowStepSelect={active > 2}
            // loading
          >
            <h1 className="font-semibold my-5">Step 3 content: Image upload</h1>
          </Stepper.Step>
          {/* <Stepper.Completed>
            Completed, click back button to get to previous step
          </Stepper.Completed> */}
        </Stepper>

        <Group position="center" mt="xl">
          <>
            <div
              onClick={prevStep}
              className="bg-gray-200 hover:bg-gray-100 rounded-md border px-5 py-2 cursor-pointer font-semibold text-sm"
            >
              Back
            </div>
            {active == 2 ? (
              <Button
                type="submit"
                // loading={state.loading}
                className="bg-blue-600 hover:bg-blue-500 rounded-md px-5 py-2 cursor-pointer font-semibold text-sm text-white"
              >
                Save
              </Button>
            ) : (
              <div
                onClick={nextStep}
                className="bg-blue-600 hover:bg-blue-500 rounded-md px-5 py-2 cursor-pointer font-semibold text-sm text-white"
              >
                Next step
              </div>
            )}
          </>
        </Group>
      </form>
    </>
  );
}

export default memo(Step);
