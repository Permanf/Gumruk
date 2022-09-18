import Head from "next/head";
import Image from "next/image";
import { Grid, Anchor, ThemeIcon, Tabs, Button } from "@mantine/core";

import Layout from "../components/Layouts/Layout";
import { BannerHero } from "../components/Banner/BannerHerro";
import { Banner } from "../components/Banner/Banner";
import section1 from "../assets/Home/banner.svg";
import section2 from "../assets/Home/section2.svg";
import section3 from "../assets/Home/section3.svg";
import icon1 from "../assets/Home/icon1.svg";
import icon2 from "../assets/Home/icon2.svg";
import icon3 from "../assets/Home/icon3.svg";
import icon4 from "../assets/Home/icon4.svg";
import { Icon } from "react-icons-kit";
import { arrowRight2 } from "react-icons-kit/icomoon/arrowRight2";
import SliderHome from "../components/Sliders/SliderHome";
import { useRouter } from "next/router";
import { useViewportSize } from "@mantine/hooks";

const Home = () => {
  const router = useRouter();
  const { width } = useViewportSize();

  const banner = {
    title: "Единая система для таможенного оформления",
    description:
      "Подавайте декларации и оплачивайте таможенные платежи онлайн — экономьте время и сокращайте расходы",
    button: "Подробнее",
    image: section1,
  };
  const news = [
    {
      id: 0,
      title: "Новости компании",
      description:
        "В Ашхабаде рассмотрели необходимость соблюдения трудовых норм в частном секторе",
      date: "05.06.2022",
    },
    {
      id: 1,
      title: "Новости компании",
      description:
        "В Ашхабаде рассмотрели необходимость соблюдения трудовых норм в частном секторе",
      date: "05.06.2022",
    },
    {
      id: 2,
      title: "Новости компании",
      description:
        "В Ашхабаде рассмотрели необходимость соблюдения трудовых норм в частном секторе",
      date: "05.06.2022",
    },
    {
      id: 3,
      title: "Новости компании",
      description:
        "В Ашхабаде рассмотрели необходимость соблюдения трудовых норм в частном секторе",
      date: "05.06.2022",
    },
    {
      id: 4,
      title: "Новости компании",
      description:
        "В Ашхабаде рассмотрели необходимость соблюдения трудовых норм в частном секторе",
      date: "05.06.2022",
    },
    {
      id: 5,
      title: "Новости компании",
      description:
        "В Ашхабаде рассмотрели необходимость соблюдения трудовых норм в частном секторе",
      date: "05.06.2022",
    },
    {
      id: 6,
      title: "Новости компании",
      description:
        "В Ашхабаде рассмотрели необходимость соблюдения трудовых норм в частном секторе",
      date: "05.06.2022",
    },
    {
      id: 7,
      title: "Новости компании",
      description:
        "В Ашхабаде рассмотрели необходимость соблюдения трудовых норм в частном секторе",
      date: "05.06.2022",
    },
  ];
  const service = [
    {
      id: 0,
      title: "Грузовые операции",
      description:
        "Услуги предоставляемые Центральным Таможенным терминалом своим клиентам",
      icon: icon1,
    },
    {
      id: 1,
      title: "Гостиница",
      description: "Услуги гостиницы",
      icon: icon2,
    },
    {
      id: 2,
      title: "Таможенный склад",
      description:
        "Услуги по хранению грузов размещённых согласно таможенному правилу на таможенном складе",
      icon: icon3,
    },
    {
      id: 3,
      title: "Стоянки",
      description: "Услуги стоянки для грузовых и легковых автомобилей",
      icon: icon4,
    },
  ];
  return (
    <Layout title="Home">
      <BannerHero banner={banner} />
      {width > 950 ? (
        <div className="w-full flex flex-col items-center py-20 bg_gray">
          <Grid className="container_out -mt-36" justify="flex-end">
            {news.slice(0, 3)?.map((item, index) => {
              return (
                <Grid.Col
                  key={`item${index}`}
                  span={3}
                  className="bg-white rounded-md p-5 flex flex-col border cursor-pointer hover:text-blue-600"
                  onClick={() => {
                    router.push(`/habarlar/${index}`);
                  }}
                >
                  <h1 className="text-blue-500 mb-3 font-medium">
                    {item.title}
                  </h1>
                  <span className="mb-2 font-medium">{item?.description}</span>
                  <span className="text-sm">{item?.date}</span>
                </Grid.Col>
              );
            })}
          </Grid>
        </div>
      ) : null}

      <div className="w-ful flex justify-center bg_blue text-white py-10">
        <div className="container_md flex flex-col">
          <p className="mb-4 ml-5">Онлай сервис</p>
          <h1 className="text-2xl md:text-4xl font-bold ml-5">
            Предварительное таможенное <br /> декларирование
          </h1>
          <span className="text-sm sm:w-96 mt-3 p-4 sm:p-0">
            Мы создаем инновационные, стабильно работающие цифровые решения,
            которые упрощают операции для участников ВЭД. Наши продукты подойдут
            для бизнеса любого размера: от предпринимателей до глобальных
            корпораций.
          </span>
          <Button
            variant="outline"
            radius="md"
            size="md"
            className="bg-white w-40 my-4 hover:text-white text-sm sm:text-lg"
          >
            Hasaba almak
          </Button>
          <div
            style={{
              backgroundImage: `url(${section2.src})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              width: `100%`,
              height: ` ${width > 500 ? "550px" : "300px"}`,
            }}
          ></div>
        </div>
      </div>
      <div className="w-full bg_gray flex justify-center">
        <div className="container_out flex flex-col -mt-14 sm:-mt-20">
          {service?.map((item, index) => {
            return (
              <div
                key={`service${index}`}
                className="w-full bg-white rounded-lg my-5 p-4 md:p-10  cursor-pointer shadow-md"
              >
                <div className="w-full flex justify-between items-center py-3">
                  <Image
                    src={item.icon.src}
                    alt="image"
                    width={width > 500 ? 60 : 26}
                    height={width > 500 ? 60 : 26}
                  />
                  <p className="font-semibold text-xs sm:text-sm md:text-xl ml-2">
                    {item.title}
                  </p>
                  <span className="text-xs w-32 md:w-60 break-all">
                    {item?.description}
                  </span>
                  <Icon
                    size={width > 500 ? 25 : 15}
                    icon={arrowRight2}
                    className="text-blue-700"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center bg_gray py-10 sm:py-20">
        <div
          className="container_out"
          style={{
            backgroundImage: `url(${section3.src})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            height: ` ${width > 500 ? "200px" : "80px"}`,
          }}
        ></div>
      </div>
      <div className="flex flex-col items-center py-10 bg_gray">
        <div className="container_out flex justify-between mb-4">
          <h1 className="font-bold text-2xl sm:text-4xl mb-4 text-blue-600">
            Новости
          </h1>
          <Button
            variant="outline"
            radius="md"
            size="md"
            className="text-sm sm:text-lg"
            onClick={() => {
              router.push(`/habarlar`);
            }}
          >
            Все новости
          </Button>
        </div>
        <div className="container_out px-1">
          <SliderHome />
        </div>
      </div>
      <Banner />
    </Layout>
  );
};
export default Home;
