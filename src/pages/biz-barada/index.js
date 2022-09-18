import { Banner } from "../../components/Banner/Banner";
import { BannerHero } from "../../components/Banner/BannerHerro";
import Layout from "../../components/Layouts/Layout";
import { IconVideo } from "@tabler/icons";
import { Grid, Anchor, ThemeIcon } from "@mantine/core";
import image from "../../assets/About-us/banner.svg";
import { useViewportSize } from "@mantine/hooks";
const BizBarada = () => {
  const { width } = useViewportSize();

  const banner = {
    title: "О нас",
    description:
      "Была создана дирекция управления Хозяйством при Государственной таможенной службы Туркменистана по обработке грузоперевозок в международном торговом деле и по услугам их хранении.",
    // button: "Подробнее",
    image: image,
    with: "500px",
    height: "280px",
  };
  const section1 = [
    {
      id: 0,
      // title: "Служба поддержки",
      description:
        "Основной задачей Дирекции является управление деятельностью сухих портов, предоставление услуг по обработке, складированию и перевалке грузов, создание оптимальных условий для деятельности участников внешнеэкономической деятельности.",
    },
    {
      id: 1,
      // title: "Центральный таможенный терминал",
      description:
        "Основной задачей Дирекции является управление деятельностью сухих портов, предоставление услуг по обработке, складированию и перевалке грузов, создание оптимальных условий для деятельности участников внешнеэкономической деятельности.",
    },
  ];
  const section2 = [
    {
      id: 0,
      // title: "Служба поддержки",
      description:
        "Центральный таможенный терминал сухой порт «Ымамназар» сухой порт «Сарахс» сухой порт «Фарап» Стратегия развития Дирекции направлена на целенаправленное развитие инфраструктур сухих портов, повышение привлекательности транзитно-транспортных коридоров Туркменистана, увеличение объёмов международных, в том числе транзитных грузоперевозок через территорию Туркменистана и повышение качества обслуживания перевозимых грузов.",
    },
    {
      id: 1,
      // title: "Центральный таможенный терминал",
      description:
        "Дирекция предлагает всем заинтересованным лицам свои услуги в сфере обработки и хранения грузов в складах временного хранения и на таможенных складах.Если у Вас возникли какие-либо вопросы по деятельности Дирекции или есть предложения, по дальнейшему совершенствованию деятельности сухих портов, Вы можете связаться с нами удобным для Вас способом.",
    },
  ];
  return (
    <Layout title="Biz-barada" className="bg_gray">
      <BannerHero banner={banner} />
      <div className="w-full flex flex-col items-center my-20">
        <Grid
          grow
          gutter={width > 500 ? 100 : 25}
          justify="space-between"
          className="container_out"
        >
          {section1?.map((item, index) => {
            return (
              <Grid.Col key={`section1${index}`} span={6}>
                <span
                  className={`${
                    index % 2 == 0 ? "text-blue-500" : "text-gray-500"
                  }`}
                >
                  {item?.description}
                </span>
              </Grid.Col>
            );
          })}
        </Grid>
      </div>
      <div className="flex justify-center my-20">
        <div className="container_md flex flex-col">
          <p className="text-blue-500 mb-4 text-sm sm:text-base">
            Деятельность сухих портов
          </p>
          <h1 className="text-xl sm:text-3xl font-semibold mb-5">
            Дирекция управляет деятельностью <br /> следующих сухих портов:
          </h1>
          <div className="w-full flex flex-col items-center">
            <Grid
              grow
              gutter={width > 500 ? 100 : 25}
              justify="space-between"
              className="container_out"
            >
              {section2?.map((item, index) => {
                return (
                  <Grid.Col key={`section2${index}`} span={6}>
                    <span className="text-gray-500">{item?.description}</span>
                  </Grid.Col>
                );
              })}
            </Grid>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="container_out h-96 bg-gray-500 rounded-md flex justify-center items-center">
          <ThemeIcon
            size="2xl"
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan" }}
          >
            <IconVideo size={50} />
          </ThemeIcon>
        </div>
      </div>
      <Banner />
    </Layout>
  );
};
export default BizBarada;
