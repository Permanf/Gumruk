import { SegmentedControl } from "@mantine/core";

function Select({ legal, setLegal }) {
  return (
    <SegmentedControl
      className="my-5"
      size="md"
      value={legal}
      onChange={setLegal}
      color="blue"
      data={[
        { label: "Fiziki tarap", value: "fiziki" },
        { label: "Yuridiki tarap", value: "yuridiki" },
      ]}
    />
  );
}

export default Select;
