import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LoadUser } from "../../store/middlewares/auth";
import { Center } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../Layouts/Layout";
import { User, FileUpload, FilePencil, Logout } from "tabler-icons-react";
import { useViewportSize } from "@mantine/hooks";
import { Drawer, Button, Group, Burger } from "@mantine/core";

const LayoutProfile = ({ children, title }) => {
  const { width } = useViewportSize();
  const [opened, setOpened] = useState(false);

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
                className={`w-1/4 flex-col bg-white p-6  rounded-md shadow-lg h-80 ${
                  width > 1000 ? "flex" : "hidden"
                }`}
              >
                <Link href={`/profile`}>
                  <a className={`font-normal my-3 text-base flex items-center`}>
                    <User size={30} className="cursor-pointer mr-2" />
                    <span>Профиль</span>
                  </a>
                </Link>
                <Link href={`/profile/tickets`}>
                  <a className={`font-normal my-3 text-base flex items-center`}>
                    <FileUpload size={30} className="cursor-pointer mr-2" />
                    <span>Tickets</span>
                  </a>
                </Link>
                <Link href={`/profile/history`}>
                  <a className={`font-normal my-3 text-base flex items-center`}>
                    <FilePencil size={30} className="cursor-pointer mr-2" />
                    <span>История деклораций</span>
                  </a>
                </Link>
                <hr className="my-5" />

                <div className={`font-normal my-3 text-base flex items-center`}>
                  <Logout size={30} className="cursor-pointer mr-2" />
                  <span>Выйти</span>
                </div>
              </div>

              {/* part2 */}
              <div
                className={`${
                  width > 1000
                    ? "w-3/4 ml-5 shadow-lg"
                    : "w-full relative overflow-hidden"
                } bg-white rounded-md `}
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
                <User size={30} className="cursor-pointer mr-2" />
                <span>Профиль</span>
              </a>
            </Link>
            <Link href={`/profile/tickets`} onClick={() => setOpened(true)}>
              <a className={`font-normal my-3 text-base flex items-center`}>
                <FileUpload size={30} className="cursor-pointer mr-2" />
                <span>Tickets</span>
              </a>
            </Link>
            <Link href={`/profile/history`} onClick={() => setOpened(true)}>
              <a className={`font-normal my-3 text-base flex items-center`}>
                <FilePencil size={30} className="cursor-pointer mr-2" />
                <span>История деклораций</span>
              </a>
            </Link>
            <hr className="my-5" />

            <div className={`font-normal my-3 text-base flex items-center`}>
              <Logout size={30} className="cursor-pointer mr-2" />
              <span>Выйти</span>
            </div>
          </div>
        </Drawer>
      </Layout>
    </>
  );
};

export default LayoutProfile;
