import { Center, Group, Select, Drawer } from "@mantine/core";
import Layout from "../Layouts/Layout";
import { useViewportSize, useWindowScroll } from "@mantine/hooks";
// import Link from "next/link";
import { Sidebar } from "./Sidebar";
import { Filter } from "tabler-icons-react";
import { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../store/middlewares";
import { getlang, getToken } from "../../store/selectors/auth";
import { useRouter } from "next/router";
import { translation } from "./translation";
import { ScrollArea } from "@mantine/core";

function LayoutNotice({ children, title, state, setState, query }) {
  const [value, setValue] = useState("");
  const { width } = useViewportSize();
  const dispatch = useDispatch();
  const lang = useSelector(getlang);
  const [scroll, scrollTo] = useWindowScroll();
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  useEffect(() => {
    if (query?.price_sort == "asc") {
      setValue("asc1");
    } else if (query?.price_sort == "desc") {
      setValue("desc1");
    }
    if (query?.created_at == "asc") {
      setValue("asc2");
    } else if (query?.created_at == "desc") {
      setValue("desc2");
    }
  }, [query]);
  const handleRoute = (elements) => {
    router.push({
      pathname: "/bildirisler",
      query: { ...query, ...elements },
    });
    scrollTo({ y: 0 });
  };
  useEffect(() => {
    setState({ type: "SET_SIDEBAR_LOADING", payload: true });
    dispatch(
      fetchData({
        url: `user/announcement/filters`,
        lang: lang,
        action: (response) => {
          // console.log(response);
          setState({ type: "SET_SIDEBAR_LOADING", payload: false });
          if (response?.data?.success) {
            setState({
              type: "SET_SIDEBAR_DATA",
              payload: response?.data.data,
            });
          } else {
            console.log(response);
          }
        },
      })
    );
  }, [lang]);
  // console.log(value);
  useEffect(() => {
    if (value) {
      if (value == "asc1") {
        handleRoute({
          price_sort: "asc",
          created_at: "",
          page: 1,
        });
      } else if (value == "desc1") {
        handleRoute({
          price_sort: "desc",
          created_at: "",
          page: 1,
        });
      } else if (value == "asc2") {
        handleRoute({
          price_sort: "",
          created_at: "asc",
          page: 1,
        });
      } else if (value == "desc2") {
        handleRoute({
          price_sort: "",
          created_at: "desc",
          page: 1,
        });
      } else if (value == "default") {
        handleRoute({
          price_sort: "",
          created_at: "",
          page: 1,
        });
      }
    }
  }, [value]);

  return (
    <Layout title={title}>
      <Center className="bg_gray">
        <div className="container_out py-10 px-1">
          <h1 className="text-xl sm:text-3xl font-semibold">
            {translation[lang]?.announcement}
          </h1>

          <div className="w-full flex my-10">
            <Sidebar
              state={state}
              setState={setState}
              query={query}
              device="pc"
            />
            {/* part2 */}
            <div
              className={`${
                width > 1024 ? "w-3/4 ml-5" : "w-full relative overflow-hidden"
              }`}
            >
              <Group className="flex justify-between bg-white py-5 px-3 rounded-lg shadow-lg mb-3">
                <span className="font-semibold text-sm sm:text-base">
                  {translation[lang]?.found} {state.all_data?.meta?.total}
                </span>
                <div className="w-full sm:w-fit flex justify-between items-center ">
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      setOpened(true);
                    }}
                    className="font-semibold px-4 py-1 flex lg:hidden mr-5 lg:mr-0 cursor-pointer border border-gray-300 rounded-sm"
                  >
                    <Filter />
                    {translation[lang]?.filter}
                  </span>
                  <Select
                    className="border border-gray-50 rounded-sm font-semibold"
                    // label="Your favorite framework/library"
                    value={value}
                    onChange={setValue}
                    placeholder={translation[lang]?.default}
                    data={[
                      { value: "default", label: translation[lang]?.default },
                      { value: "asc1", label: translation[lang]?.min_price },
                      { value: "desc1", label: translation[lang]?.max_price },
                      { value: "asc2", label: translation[lang]?.min_date },
                      { value: "desc2", label: translation[lang]?.max_date },
                    ]}
                  />
                </div>
              </Group>
              {children}
            </div>
          </div>
        </div>
      </Center>
      <Drawer
        overlayOpacity={0.55}
        overlayBlur={3}
        opened={opened}
        onClose={() => setOpened(false)}
        size="lg"
        position="right"
      >
        {/* Drawer content */}
        <ScrollArea className="p-4" type="scroll" style={{ height: "100%" }}>
          <Sidebar
            state={state}
            setState={setState}
            query={query}
            device="mobile"
            // opened={opened}
            setOpened={setOpened}
          />
        </ScrollArea>
      </Drawer>
    </Layout>
  );
}

export default LayoutNotice;
