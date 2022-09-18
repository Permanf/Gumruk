import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "../store/index";
import NextNprogress from "nextjs-progressbar";
import "@fontsource/manrope";
import { MantineProvider } from "@mantine/core";
import { useState, useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }
  return (
    <MantineProvider
      theme={{
        fontFamily: "Manrope",
      }}
    >
      <Provider store={store}>
        <NextNprogress
          color="#043375"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}
        />
        <Component {...pageProps} />
      </Provider>
    </MantineProvider>
  );
}
export default MyApp;
