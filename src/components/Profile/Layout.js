import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { LoadUser } from "../../store/middlewares/auth";
import { Center } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../Layouts/Layout";
import { User, FileUpload, FilePencil, Logout } from "tabler-icons-react";
import { useViewportSize } from "@mantine/hooks";
import { Drawer, Button, Group, Burger } from "@mantine/core";
import { userLoadFailed } from "../../store/actions/auth";
import { Logout1 } from "../../store/middlewares/auth";

const LayoutProfile = ({ children, title }) => {
  const { width } = useViewportSize();
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  // const { token } = useSelector((state) => state.auth);
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
                className={`w-1/4 flex-col bg-white py-5  rounded-2xl shadow-lg h-80 ${
                  width > 1000 ? "flex" : "hidden"
                }`}
              >
                <Link href={`/profile`}>
                  <a
                    className={`font-normal py-3 text-base flex items-center px-5 mx-1 rounded-lg my-1 hover:bg-blue-100`}
                  >
                    <User size={22} className="cursor-pointer mr-2" />
                    <span>Профиль</span>
                  </a>
                </Link>
                <Link href={`/profile/tickets`}>
                  <a
                    className={`font-normal py-3 text-base flex items-center px-5 mx-1 rounded-lg my-1 hover:bg-blue-100`}
                  >
                    <FileUpload size={22} className="cursor-pointer mr-2" />
                    <span>Tickets</span>
                  </a>
                </Link>
                <Link href={`/profile/history`}>
                  <a
                    className={`font-normal py-3 text-base flex items-center px-5 mx-1 rounded-lg my-1 hover:bg-blue-100`}
                  >
                    <FilePencil size={22} className="cursor-pointer mr-2" />
                    <span>История деклораций</span>
                  </a>
                </Link>
                <hr className="my-5" />

                <div
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(Logout1());
                    router.push("/");
                  }}
                  className={`font-normal py-3 text-base flex items-center mx-1 rounded-lg px-5 text-red-500 cursor-pointer hover:bg-blue-100`}
                >
                  <Logout size={22} className="cursor-pointer mr-2" />
                  <span>Выйти</span>
                </div>
              </div>

              {/* part2 */}
              <div
                className={`${
                  width > 1000
                    ? "w-3/4 ml-5 shadow-lg"
                    : "w-full relative overflow-hidden"
                } bg-white rounded-2xl `}
              >
                <div
                  className={`${
                    width > 1000
                      ? "hidden"
                      : "w-16 h-16 rounded-full bg-blue-300 absolute -top-4 -left-4 flex justify-center items-center "
                  }`}
                >
                  <Burger
                    color={"#000000"}
                    size={18}
                    onClick={() => setOpened(true)}
                    className="ml-2 mt-2"
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
            <Link href={`/profile`} onClick={() => setOpened(true)}>
              <a className={`font-normal my-3 text-base flex items-center`}>
                <User size={22} className="cursor-pointer mr-2" />
                <span>Профиль</span>
              </a>
            </Link>
            <Link href={`/profile/tickets`} onClick={() => setOpened(true)}>
              <a className={`font-normal my-3 text-base flex items-center`}>
                <FileUpload size={22} className="cursor-pointer mr-2" />
                <span>Tickets</span>
              </a>
            </Link>
            <Link href={`/profile/history`} onClick={() => setOpened(true)}>
              <a className={`font-normal my-3 text-base flex items-center`}>
                <FilePencil size={22} className="cursor-pointer mr-2" />
                <span>История деклораций</span>
              </a>
            </Link>
            <hr className="my-5" />

            <div className={`font-normal my-3 text-base flex items-center`}>
              <Logout size={22} className="cursor-pointer mr-2" />
              <span>Выйти</span>
            </div>
          </div>
        </Drawer>
      </Layout>
    </>
  );
};

export default LayoutProfile;
