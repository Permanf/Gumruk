import { Banner } from "../../components/Banner/Banner";
import { BannerHero } from "../../components/Banner/BannerHerro";
import Layout from "../../components/Layouts/Layout";
import { IconVideo } from "@tabler/icons";
import { Grid, Anchor, ThemeIcon, Tabs } from "@mantine/core";
import { useState } from "react";
import Pagination from "../../components/News/Pagination";
import { useRouter } from "next/router";
// import image from "../../assets/News/banner.svg";
import image from "../../assets/About-us/banner.svg";

const News = () => {
  const router = useRouter();
  const [activePage, setPage] = useState(1);
  const total = 10;
  const banner = {
    title: "Новости",
    description:
      "Услуги предоставляемые Центральным Таможенным терминалом своим клиентам",
    image: image,
    with: "500px",
    height: "280px",
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
  return (
    <Layout title="Habarlar" className="bg_gray">
      <BannerHero banner={banner} />
      <div className="w-full flex flex-col items-center my-10">
        <div className="container_out bg-white py-6 px-2 rounded-md">
          <Tabs defaultValue="first">
            <Tabs.List className="font-semibold">
              <Tabs.Tab value="first" className="text-lg">
                Главное
              </Tabs.Tab>
              <Tabs.Tab value="second" className="text-lg">
                Новости компании
              </Tabs.Tab>
              <Tabs.Tab value="third" className="text-lg">
                Мероприятия
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>
        </div>
        <div className="container_out my-10">
          <h1 className="font-bold text-4xl mb-4">Главное</h1>
          <hr />
        </div>
        <Grid className="container_out">
          {news?.map((item, index) => {
            return (
              <Grid.Col
                key={`news${index}`}
                span={3}
                className="bg-white rounded-md p-5 flex flex-col border cursor-pointer hover:text-blue-500"
                onClick={() => {
                  router.push(`/habarlar/${index}`);
                }}
              >
                <h1 className="text-blue-500 mb-3 font-medium">{item.title}</h1>
                <span className="mb-2 font-semibold text-base">
                  {item?.description}
                </span>
                <span className="text-sm">{item?.date}</span>
              </Grid.Col>
            );
          })}
        </Grid>
        <div className="container_out mt-10">
          <Pagination
            activePage={activePage}
            setPage={setPage}
            total={total}
            siblings={2}
            boundaries={2}
          />
        </div>
      </div>
      <Banner />
    </Layout>
  );
};
export default News;
