import { Center, Group, Select } from "@mantine/core";
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

function LayoutNotice({ children, title, state, setState, query }) {
  // console.log(state, "-ll");
  const [value, setValue] = useState("");
  const { width } = useViewportSize();
  const dispatch = useDispatch();
  const lang = useSelector(getlang);
  const [scroll, scrollTo] = useWindowScroll();
  const router = useRouter();
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
    // console.log('Elements -> ', elements, 'Query -> ',{ ...query, ...elements});
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
        lang: lang == "English" ? "en" : lang == "Turkmen" ? "tm" : "ru",
        action: (response) => {
          setState({ type: "SET_SIDEBAR_LOADING", payload: false });
          if (response?.success) {
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
  }, []);
  // console.log(value);
  useEffect(() => {
    if (value) {
      if (value == "asc1") {
        handleRoute({
          price_sort: "asc",
          created_at: "",
        });
      } else if (value == "desc1") {
        handleRoute({
          price_sort: "desc",
          created_at: "",
        });
      } else if (value == "asc2") {
        handleRoute({
          price_sort: "",
          created_at: "asc",
        });
      } else if (value == "desc2") {
        handleRoute({
          price_sort: "",
          created_at: "desc",
        });
      } else {
        handleRoute({
          price_sort: "",
          created_at: "",
        });
      }
    }
  }, [value]);

  return (
    <Layout title={title}>
      <Center className="bg_gray">
        <div className="container_out py-10 px-1">
          <h1 className="text-xl sm:text-3xl font-semibold">Oбъявление</h1>

          <div className="w-full flex my-10">
            <Sidebar state={state} setState={setState} query={query} />
            {/* part2 */}
            <div
              className={`${
                width > 1000 ? "w-3/4 ml-5" : "w-full relative overflow-hidden"
              }`}
            >
              <Group className="flex justify-between bg-white py-5 px-3 rounded-lg shadow-lg mb-3">
                <span className="font-semibold text-sm sm:text-base">
                  Найдено всего {state.all_data?.data?.length} результата
                </span>
                <div className="w-full sm:w-fit flex justify-between items-center ">
                  <span className="font-semibold flex sm:hidden">
                    <Filter />
                    Filter
                  </span>
                  <Select
                    className="border border-gray-50 rounded-sm"
                    // label="Your favorite framework/library"
                    value={value}
                    onChange={setValue}
                    placeholder="Saylanmadyk"
                    data={[
                      { value: "", label: "По умолчанию" },
                      { value: "asc1", label: "По цене убывания" },
                      { value: "desc1", label: "По цене возрастания" },
                      { value: "asc2", label: "По дате убывания" },
                      { value: "desc2", label: "По дате возрастания" },
                    ]}
                  />
                </div>
              </Group>
              {children}
            </div>
          </div>
        </div>
      </Center>
    </Layout>
  );
}

export default LayoutNotice;
