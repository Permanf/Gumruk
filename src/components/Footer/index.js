import { Grid } from "@mantine/core";
import { IconPhoto } from "@tabler/icons";
import { ThemeIcon } from "@mantine/core";
import Image from "next/image";
import logo_white from "../../assets/Logo/logo_white.svg";
import { categories } from "../Header/categories";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <div className="w-full footer flex justify-center items-start">
        <div className="container_out h-full flex">
          <div className="w-1/3 h-full flex flex-col justify-start text-white">
            <div className="w-48 flex mt-14 mb-5">
              <Image src={logo_white} alt="image" width={100} height={100} />
              {/* <ThemeIcon
                size="xl"
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan" }}
              >
                <IconPhoto size={30} />
              </ThemeIcon> */}
              <h1 className="text-sm font-medium ml-3">
                ДИРЕКЦИЯ ХОЗЯЙСТВЕННОГО УПРАВЛЕНИЯ
              </h1>
            </div>
            <h6 className="font-normal">Тex поддержка</h6>
            <h1 className="text-2xl font-semibold mt-3">+993 (12) 12-34-56</h1>
          </div>
          <div className="w-2/3 h-full pt-10">
            <Grid>
              <Grid.Col span={4} className="flex flex-col leading-9 text-white">
                <h1 className="text-2xl font-medium">Услуги</h1>
                <p>Грузовые операции</p>
                <p>Гостиница</p>
                <p>Тамаженный склад</p>
                <p>Временное хранение</p>
                <p>Стоянки</p>
              </Grid.Col>
              <Grid.Col
                span={4}
                className="flex flex-col  leading-9 text-white"
              >
                <h1 className="text-2xl font-medium">Помощь</h1>

                {categories?.map((item, index) => {
                  return (
                    <Link
                      key={`item${index}`}
                      href={`${item?.link}`}
                      className="lowercase first-letter:uppercase"
                    >
                      {item?.name}
                    </Link>
                  );
                })}
              </Grid.Col>
              <Grid.Col
                span={4}
                className="flex flex-col  leading-9 text-white"
              >
                <h1 className="text-2xl font-medium">Партнерам</h1>
                <p>Банкам</p>
                <p>Электронный документооборот</p>
                <p>Агентам</p>
              </Grid.Col>
            </Grid>
          </div>
        </div>
      </div>
      <div className="w-full h-10 bg-gray-100 flex justify-center items-center text-sm">
        <div className="container_out">
          <p className="font-semibold">
            © 2022. Дирекция хозяйственного управления. Все правы защищены.
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
