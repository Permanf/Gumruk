import { createStyles, RangeSlider } from "@mantine/core";
import { useEffect, useState } from "react";
import { useDebouncedValue, useWindowScroll } from "@mantine/hooks";
import { useRouter } from "next/router";

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

export function RangePrice({ query }) {
  const { classes } = useStyles();
  const [scroll, scrollTo] = useWindowScroll();
  const router = useRouter();

  const handleRoute = (elements) => {
    router.push({
      pathname: "/bildirisler",
      query: { ...query, ...elements },
    });
    scrollTo({ y: 0 });
  };
  const [rangeValue, setRangeValue] = useState([
    query?.price_min ? query?.price_min : 0,
    query?.price_max ? query?.price_max : 50000,
  ]);
  const [debounced] = useDebouncedValue(rangeValue, 900);
  useEffect(() => {
    if (query?.price_min || query?.price_max) {
      handleRoute({
        price_min: debounced[0],
        price_max: debounced[1],
        page: 1,
      });
    } else if (debounced[0] != 0 || debounced[1] != 50000) {
      handleRoute({
        price_min: debounced[0],
        price_max: debounced[1],
        page: 1,
      });
    }
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
