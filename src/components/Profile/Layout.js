import { useEffect, useState, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { LoadUser } from "../../store/middlewares/auth";
import { Center } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../Layouts/Layout";
// import { User, FileUpload, FilePencil, Logout } from "tabler-icons-react";
import { useViewportSize } from "@mantine/hooks";
import { Drawer, Burger, ThemeIcon } from "@mantine/core";
// import { userLoadFailed } from "../../store/actions/auth";
import { Logout1 } from "../../store/middlewares/auth";
import { links } from "./Link";
import { getlang } from "../../store/selectors/auth";

function reducer(state, action) {
  switch (action.type) {
    case "SET_ACTIVE":
      return {
        ...state,
        active: action.payload,
      };
    default:
      return state;
  }
}

const LayoutProfile = ({ children, title }) => {
  const [state, setState] = useReducer(reducer, {
    active: 1,
  });
  const { width } = useViewportSize();
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const lang = useSelector(getlang);
  const { token } = useSelector((state) => state.auth);
  // console.log(token);
  // useEffect(() => {
  //   if (!token) {
  //     router.push("/agza/login");
  //   }
  // }, [token]);
  // console.log("layout-profile");

  return (
    <>
      <Layout title={title}>
        <Center className="bg_gray">
          <div className="container_out py-10 px-1">
            <h1 className="text-xl sm:text-3xl font-semibold">
              Личный кабинет
            </h1>
            <div className="w-full flex my-10">
              <div
                className={`w-1/4 flex-col bg-white py-5  rounded-2xl shadow-lg h-96 ${
                  width > 1000 ? "flex" : "hidden"
                }`}
              >
                {links(lang)?.map((item) => {
                  return item.id != 5 ? (
                    <Link href={`${item?.link}`} key={item.id}>
                      <a
                        className={`font-normal py-3 text-base flex items-center px-5 mx-1 rounded-lg my-1 hover:text-blue-500`}
                      >
                        <ThemeIcon variant="light" className="mr-2">
                          {item?.icon}
                        </ThemeIcon>
                        <span
                          className={`text-sm font-semibold ${
                            router.asPath == item?.link ? "text-blue-500" : ""
                          }`}
                        >
                          {item?.name}
                        </span>
                      </a>
                    </Link>
                  ) : (
                    <>
                      <hr className="my-5" />
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(Logout1());
                          router.push("/");
                        }}
                        className={`font-normal py-3 text-base flex items-center mx-1 rounded-lg px-5 text-red-500 cursor-pointer hover:text-red-400`}
                      >
                        <ThemeIcon variant="light" color="red" className="mr-2">
                          {item?.icon}
                        </ThemeIcon>
                        <span className="text-sm font-semibold">
                          {item?.name}
                        </span>
                      </div>
                    </>
                  );
                })}
              </div>

              {/* part2 */}
              <div
                className={`${
                  width > 1000
                    ? "w-3/4 ml-5 shadow-lg"
                    : "w-full relative overflow-hidden"
                } bg-white rounded-2xl px-2 py-6`}
              >
                <div
                  className={`${
                    width > 1000
                      ? "hidden"
                      : "w-16 h-16 rounded-full  absolute -top-3 -left-2 flex justify-center items-center "
                  }`}
                >
                  <Burger
                    color={"#000000"}
                    size={23}
                    onClick={() => setOpened(true)}
                    className="ml-2 mt-2 font-semibold"
                  />
                </div>
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
          title="Profile Menu"
          padding="xl"
          size="lg"
        >
          {/* Drawer content */}
          <div className="flex flex-col">
            {links(lang)?.map((item) => {
              return item.id != 5 ? (
                <Link
                  href={`${item?.link}`}
                  key={item.id}
                  onClick={() => setOpened(true)}
                >
                  <a className={`font-normal my-3 text-base flex items-center`}>
                    {item?.icon}
                    <span>{item?.name}</span>
                  </a>
                </Link>
              ) : (
                <>
                  <hr className="my-5" />
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(Logout1());
                      router.push("/");
                    }}
                    className={`font-normal my-3 text-base flex items-center text-red-500`}
                  >
                    {item?.icon}
                    <span>{item?.name}</span>
                  </div>
                </>
              );
            })}
          </div>
        </Drawer>
      </Layout>
    </>
  );
};

export default LayoutProfile;
