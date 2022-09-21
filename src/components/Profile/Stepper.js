import { useState } from "react";
import { Stepper, Button, Group } from "@mantine/core";
import { IconCircleX } from "@tabler/icons";

function Step() {
  const [active, setActive] = useState(1);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      <Stepper active={active} onStepClick={setActive} breakpoint="sm">
        <Stepper.Step
          label="First step"
          description="Create an account"
          allowStepSelect={active > 0}
        >
          Step 1 content: Create an account
        </Stepper.Step>
        <Stepper.Step
          label="Second step"
          description="Verify email"
          allowStepSelect={active > 1}
          color="red"
          completedIcon={<IconCircleX />}
        >
          Step 2 content: Verify email
        </Stepper.Step>
        <Stepper.Step
          label="Final step"
          description="Get full access"
          allowStepSelect={active > 2}
          loading
        >
          Step 3 content: Get full access
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>

      <Group position="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep} className="bg-blue-600">
          Next step
        </Button>
      </Group>
    </>
  );
}

export default Step;
