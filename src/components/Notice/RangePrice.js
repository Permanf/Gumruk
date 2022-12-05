import { createStyles, RangeSlider } from "@mantine/core";
import { useEffect, useState } from "react";
import { useDebouncedValue, useWindowScroll } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  label: {
    top: 0,
    height: 28,
    lineHeight: "28px",
    width: 34,
    padding: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: 700,
    backgroundColor: "transparent",
  },

  thumb: {
    backgroundColor: theme.colors[theme.primaryColor][6],
    height: 28,
    width: 34,
    border: "none",
  },

  dragging: {
    transform: "translate(-50%, -50%)",
  },
}));

export function RangePrice({ state, setState }) {
  const { classes } = useStyles();
  const [scroll, scrollTo] = useWindowScroll();
  const [rangeValue, setRangeValue] = useState([20, 50000]);
  const [debounced] = useDebouncedValue(rangeValue, 900);
  useEffect(() => {
    setState({ type: "SET_PRICE_MIN", payload: debounced[0] });
    setState({ type: "SET_PRICE_MAX", payload: debounced[1] });
    setState({ type: "SET_TRIGGER", payload: !state.trigger });
    scrollTo({ y: 0 });
  }, [debounced]);
  // console.log(debounced);
  return (
    <RangeSlider
      min={0}
      max={5000}
      value={rangeValue}
      onChange={setRangeValue}
      labelAlwaysOn
      // defaultValue={[20, 5000]}
      classNames={classes}
    />
  );
}
