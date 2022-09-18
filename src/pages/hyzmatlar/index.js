import { Container } from "@mantine/core";
import { Banner } from "../../components/Banner/Banner";
import { BannerHero } from "../../components/Banner/BannerHerro";
import Layout from "../../components/Layouts/Layout";
import {
  Grid,
  SimpleGrid,
  TextInput,
  Textarea,
  Button,
  Checkbox,
  Code,
  Text,
  Anchor,
} from "@mantine/core";
import image from "../../assets/Contact/banner.svg";

const Hyzmatlar = () => {
  const banner = {
    title: "Услуги",
    description:
      "Мы ежедневно трудимся с целью повышения количества услуг предоставляемых гражданам и грузоперевозчикам.",
    image: image,
    with: "500px",
    height: "300px",
  };
  const data = [
    {
      title: "Грузовые операции",
      description:
        "Услуги предоставляемые Центральным Таможенным терминалом своим клиентам",
      sub_data: [
        {
          title: "Погрузка, разгрузка груза вручную",
          price: "10.00 манат за тонну",
        },
        {
          title:
            "Погрузка, разгрузка груза с применением механизированных средств",
          price: "10.00 манат за тонну",
        },
        {
          title:
            "Въезд грузового автотранспортного средства на территорию терминала для погрузки, разгрузки груза",
          price: "10.00 манат за тонну",
        },
        {
          title:
            "Въезд легкового автотранспортного средства на территорию терминала для погрузки, разгрузки груза",
          price: "5.00 манат за тонну",
        },
      ],
    },
    {
      title: "Гостиница",
      description: "Услуги гостиницы",
      sub_data: [
        {
          title: "Услуги гостиницы",
          price: "60.00 манат за сутки",
        },
        {
          title: "Полулюкс двухместный номер",
          price: "115.00 манат за сутки",
        },
      ],
    },
    {
      title: "Таможенный склад",
      description:
        "Услуги по хранению грузов размещённых согласно таможенному правилу на таможенном складе",
      sub_data: [
        {
          title: "Хранение грузов и контейнеров на площадке",
          price: "1.50 манат за 1m2 в сутки",
        },
        {
          title: "Хранение грузов в складских помещениях",
          price: "3.00 манат за 1m2 в сутки",
        },
        {
          title:
            "Хранение грузового автотранспортного средства, автобуса и иной техники",
          price: "17.00 манат за в сутки",
        },
        {
          title: "Хранение легкового автотранспортного средства",
          price: "7.00 манат за в сутки",
        },
      ],
    },
    {
      title: "Временное хранение",
      description: "Услуги по временному хранению товаров и грузов",
      sub_data: [
        {
          title: "Хранение грузов и контейнеров на площадке",
          price: "1.50 манат за 1m2 в сутки",
        },
        {
          title: "Хранение грузов в складских помещениях",
          price: "3.00 манат за 1m2 в сутки",
        },
        {
          title:
            "Хранение грузового автотранспортного средства, автобуса и иной техники",
          price: "17.00 манат за в сутки",
        },
        {
          title: "Хранение легкового автотранспортного средства",
          price: "7.00 манат за в сутки",
        },
      ],
    },
    {
      title: "Стоянки",
      description: "Услуги стоянки для грузовых и легковых автомобилей",
      sub_data: [
        {
          title:
            "Нахождение на стоянке №1 легкового автотранспортного средства",
          price: "1.00 манат за сутки",
        },
        {
          title:
            "Нахождение на стоянке №2 легкового автотранспортного средства",
          price: "3.00 манат за сутки",
        },
        {
          title: "Aхождение на стоянке №3 легкового автотранспортного средства",
          price: "17.00 манат за сутки",
        },
        {
          title: "Услуги ремонтной мастерской",
          price: "в размере предоставленных услуг",
        },
        {
          title: "Мойка грузового автотранспортного средства",
          price: "25.00 манат за автомобитль",
        },
      ],
    },
  ];
  return (
    <Layout title="Hyzmatlar" className="bg_gray">
      <BannerHero banner={banner} />
      <div className="w-full flex flex-col items-center">
        <div className="container_md">
          {data?.map((item) => {
            return (
              <>
                <div className="w-full flex flex-col items-start my-4 mt-16">
                  <p className="font-semibold text-2xl sm:text-4xl text-blue-700">
                    {item.title}
                  </p>
                  <span className="text-gray-400 text-sm sm:text-base sm:w-96 mt-4">
                    {item.description}
                  </span>
                </div>
                {item?.sub_data?.map((sub, index) => {
                  return (
                    <div
                      key={`sub${index}`}
                      className="w-full bg-white rounded-lg my-5 sm:my-10 px-3 sm:px-10 py-2 sm:py-5 shadow-md cursor-pointer"
                    >
                      <div className="w-full flex flex-col sm:flex-row justify-between py-3">
                        <div className="sm:w-1/3">
                          <p className="font-semibold  text-sm sm:text-base">
                            {sub.title}
                          </p>
                        </div>
                        <div className="sm:w-1/3 flex flex-col items-end justify-center">
                          <span className="text-gray-400 text-xs sm:text-sm mt-4 sm:mt-0">
                            {sub?.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            );
          })}
        </div>
      </div>
      <Banner />
    </Layout>
  );
};
export default Hyzmatlar;
