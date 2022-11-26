import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "../store/index";
import NextNprogress from "nextjs-progressbar";
import "@fontsource/manrope";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
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
      <ModalsProvider>
        <NotificationsProvider position="top-right" zIndex={2077}>
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
        </NotificationsProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}
export default MyApp;
