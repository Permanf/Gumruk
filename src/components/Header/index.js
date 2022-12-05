import HeaderTop from "./header_top";
import { IconPhoto, IconSearch, IconUser } from "@tabler/icons";
import { categories } from "./categories";
import { useRouter } from "next/router";
import logo_white from "../../assets/Logo/logo_white.svg";
import logo_blue from "../../assets/Logo/logo_blue.svg";
import Image from "next/image";
import Link from "next/link";
import { SpotlightProvider, openSpotlight } from "@mantine/spotlight";
import { useState } from "react";
import { Drawer, Button, Group, Burger, Avatar } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useSelector } from "react-redux";

const Header = () => {
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const title = opened ? "Close navigation" : "Open navigation";
  const { width } = useViewportSize();
  const { lang } = useSelector((state) => state.data);
  const { token, user } = useSelector((state) => state.auth);

  // console.log(token);
  function SpotlightControl() {
    return (
      <IconSearch
        size={width > 500 ? 30 : 23}
        className="mr-5 sm:mr-14 cursor-pointer"
        onClick={openSpotlight}
      />
    );
  }
  const actions = [
    // {
    //   title: "Home",
    //   description: "Get to home page",
    //   onTrigger: () => console.log("Home"),
    //   icon: <IconHome size={18} />,
    // },
    // {
    //   title: "Dashboard",
    //   description: "Get full information about current system status",
    //   onTrigger: () => console.log("Dashboard"),
    //   icon: <IconDashboard size={18} />,
    // },
    // {
    //   title: "Documentation",
    //   description: "Visit documentation to lean more about all features",
    //   onTrigger: () => console.log("Documentation"),
    //   icon: <IconFileText size={18} />,
    // },
  ];

  return (
    <>
      <HeaderTop />

      <div
        className={`w-full flex justify-center sticky top-0 z-index-header  ${
          router.pathname == "/"
            ? "bannerHeader text-white"
            : "bg_gray shadow-md"
        } `}
      >
        <div
          className={`container_out flex justify-between ${
            router.pathname == "/" ? "border-b-2" : ""
          }  border-b-gray-300`}
        >
          <div className="flex">
            <div className="sm:w-56 flex items-center py-5">
              {width <= 950 ? (
                <Burger
                  color={router.pathname == "/" ? "#ffffff" : "#000000"}
                  size={20}
                  onClick={() => setOpened(true)}
                  title={title}
                  className="mr-2"
                />
              ) : null}

              {router.pathname == "/" ? (
                <Image
                  src={logo_white}
                  alt="image"
                  width={width > 600 ? 100 : 45}
                  height={width > 600 ? 100 : 45}
                />
              ) : (
                <Image
                  src={logo_blue}
                  alt="image"
                  width={width > 600 ? 100 : 45}
                  height={width > 600 ? 100 : 45}
                />
              )}
              <Link href="/">
                <a
                  className={`${
                    width > 600 ? "text-sm " : "text-xs"
                  }  font-semibold ml-3 cursor-pointer`}
                >
                  ДИРЕКЦИЯ ХОЗЯЙСТВЕННОГО УПРАВЛЕНИЯ
                </a>
              </Link>
            </div>
            {width > 950 ? (
              <div className="flex items-center">
                {categories(lang)?.map((item, index) => {
                  return (
                    <Link key={index} href={`${item.link}`}>
                      <a
                        className={`font-semibold mx-7 py-10 text-sm  ${
                          router.pathname == item.link && router.pathname != "/"
                            ? "border-b-2 border-blue-700 -pb-2"
                            : ""
                        } `}
                      >
                        {item.name}
                      </a>
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>
          <div className="sm:w-40 flex items-center justify-end">
            <SpotlightProvider
              actions={actions}
              searchIcon={<IconSearch size={18} />}
              searchPlaceholder="Search..."
              shortcut="mod + shift + 1"
              nothingFoundMessage="Nothing found..."
            >
              <SpotlightControl />
            </SpotlightProvider>
            {token ? (
              <Link href="/profile">
                <Avatar
                  color="cyan"
                  radius="xl"
                  className="cursor-pointer uppercase"
                >
                  {user?.first_name ? user?.first_name?.slice(0, 2) : "X"}
                </Avatar>
              </Link>
            ) : (
              <Link href="/agza/login">
                <IconUser
                  size={width > 500 ? 30 : 23}
                  className="cursor-pointer"
                />
              </Link>
            )}
          </div>
        </div>
      </div>
      <Drawer
        overlayOpacity={0.55}
        overlayBlur={3}
        opened={opened}
        onClose={() => setOpened(false)}
        title="Menu Sidebar"
        padding="xl"
        size="lg"
      >
        {/* Drawer content */}
        <div className="flex flex-col">
          {categories(lang)?.map((item, index) => {
            return (
              <Link key={index} href={`${item.link}`}>
                <a
                  className={`font-semibold my-3 sm:my-5 text-xs sm:text-sm  ${
                    router.pathname == item.link && router.pathname != "/"
                      ? "text-blue-600"
                      : ""
                  } `}
                >
                  {item.name}
                </a>
              </Link>
            );
          })}
        </div>
      </Drawer>
    </>
  );
};

export default Header;
