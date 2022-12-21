import { SegmentedControl } from "@mantine/core";
import { useSelector } from "react-redux";
import { getlang } from "../../store/selectors/auth";
import { translation } from "./translation";

function Select({ legal, setLegal }) {
  const lang = useSelector(getlang);
  return (
    <SegmentedControl
      className="my-5"
      size="md"
      value={legal}
      onChange={setLegal}
      color="blue"
      data={[
        { label: translation[lang]?.physical, value: "fiziki" },
        { label: translation[lang]?.juridical, value: "yuridiki" },
      ]}
    />
  );
}

export default Select;
