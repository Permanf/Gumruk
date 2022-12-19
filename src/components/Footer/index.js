import { Grid } from "@mantine/core";
import Image from "next/image";
import logo_white from "../../assets/Logo/logo_white.svg";
import { categories } from "../Header/categories";
import Link from "next/link";
import { useViewportSize } from "@mantine/hooks";
import { useSelector } from "react-redux";
import { getlang } from "../../store/selectors/auth";
import { translation } from "./translation";

const Footer = () => {
  const { width } = useViewportSize();
  const lang = useSelector(getlang);

  return (
    <>
      <div className="w-full footer flex justify-center items-start py-6 md:py-16">
        <div
          className={`container_out flex ${
            width > 400 ? "flex-row" : "flex-col"
          }`}
        >
          <Grid className="w-full">
            <Grid.Col
              sm={6}
              md={4}
              lg={3}
              className="flex flex-col leading-9 text-white mt-5 mb-1 md:mt-14 md:mb-5"
            >
              {/* <div className="w-1/3 h-full flex flex-col justify-start text-white"> */}
              <div className="flex items-center">
                <Image
                  src={logo_white}
                  alt="image"
                  width={width > 500 ? 100 : 50}
                  height={width > 500 ? 100 : 50}
                />
                {/* <ThemeIcon
                size="xl"
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan" }}
              >
                <IconPhoto size={30} />
              </ThemeIcon> */}
                <h1 className="text-sm font-medium ml-3 uppercase">
                  {translation[lang]?.company_name}
                </h1>
              </div>
              <h6 className="font-normal text-sm sm:text-base mt-3">
                {translation[lang]?.support}
              </h6>
              <h1 className="text-lg sm:text-2xl font-semibold mt-3">
                +993 (12) 12-34-56
              </h1>
              {/* </div> */}
            </Grid.Col>

            {/* <div className="w-2/3 h-full pt-10 bg-red-300"> */}
            <Grid.Col
              // span={4}
              sm={6}
              md={4}
              lg={3}
              className="flex flex-col leading-9 text-white mt-5 mb-1 md:mt-14 md:mb-5 text-sm sm:text-base"
            >
              <h1 className="text-lg sm:text-2xl font-medium mb-3">
                {translation[lang]?.part1_title}
              </h1>
              <p className="my-0 sm:my-2">{translation[lang]?.part1_1}</p>
              <p className="my-0 sm:my-2">{translation[lang]?.part1_2}</p>
              <p className="my-0 sm:my-2">{translation[lang]?.part1_3}</p>
              <p className="my-0 sm:my-2">{translation[lang]?.part1_4}</p>
              <p className="my-0 sm:my-2">{translation[lang]?.part1_5}</p>
            </Grid.Col>
            <Grid.Col
              sm={6}
              md={4}
              lg={3}
              className="flex flex-col  leading-9 text-white mt-5 mb-1 md:mt-14 md:mb-5 text-sm sm:text-base"
            >
              <h1 className="text-lg sm:text-2xl font-medium mb-3">
                {translation[lang]?.part2_title}
              </h1>

              {categories(lang)?.map((item, index) => {
                return (
                  <Link
                    key={`item${index}`}
                    href={`${item?.link}`}
                    className="lowercase first-letter:uppercase"
                  >
                    <a className="my-0 sm:my-2">{item?.name}</a>
                  </Link>
                );
              })}
            </Grid.Col>
            <Grid.Col
              sm={6}
              md={4}
              lg={3}
              className="flex flex-col  leading-9 text-white mt-5 mb-1 md:mt-14 md:mb-5 text-sm sm:text-base"
            >
              <h1 className="text-lg sm:text-2xl font-medium mb-3">
                {translation[lang]?.part3_title}
              </h1>
              <p className="my-0 sm:my-2">{translation[lang]?.part3_1}</p>
              <p className="my-0 sm:my-2">{translation[lang]?.part3_2}</p>
              <p className="my-0 sm:my-2">{translation[lang]?.part3_3}</p>
            </Grid.Col>
          </Grid>
          {/* </div> */}
        </div>
      </div>
      <div className="w-full py-4 bg-gray-100 flex justify-center items-center text-sm">
        <div className="container_out">
          <p className="font-semibold text-xs sm:text-base">
            {translation[lang]?.footer_last}
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
