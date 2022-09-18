import { Carousel } from "@mantine/carousel";
import { Icon } from "react-icons-kit";
import { arrowLeft2 } from "react-icons-kit/icomoon/arrowLeft2";
import { arrowRight2 } from "react-icons-kit/icomoon/arrowRight2";
import { useRouter } from "next/router";

function SliderHome() {
  const router = useRouter();

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
    <Carousel
      withIndicators
      height={220}
      slideSize="33.333333%"
      slideGap="md"
      breakpoints={[
        { maxWidth: "md", slideSize: "50%" },
        { maxWidth: "sm", slideSize: "100%", slideGap: 0 },
      ]}
      loop
      align="start"
      nextControlIcon={
        <Icon size={20} icon={arrowRight2} className="text-white font-bold" />
      }
      previousControlIcon={
        <Icon size={20} icon={arrowLeft2} className="text-white font-bold" />
      }
    >
      {news?.map((item, index) => {
        return (
          <Carousel.Slide
            key={`slide${index}`}
            onClick={() => {
              router.push(`/habarlar/${index}`);
            }}
            className="bg-white flex flex-col py-5 px-5 border rounded-md cursor-pointer hover:text-blue-600"
          >
            <h1 className="text-blue-500 mb-3 font-medium">{item.title}</h1>
            <span className="mb-2 font-medium text-sm sm:text-base">
              {item?.description}
            </span>
            <span className="text-sm">{item?.date}</span>
          </Carousel.Slide>
        );
      })}
    </Carousel>
  );
}

export default SliderHome;
