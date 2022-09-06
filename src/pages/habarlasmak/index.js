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

const Habarlasmak = () => {
  const banner = {
    title: "Контакты",
    description:
      "Подавайте декларации и оплачивайте таможенные платежи онлайн — экономьте время и сокращайте расходы",
    image: image,
    with: "500px",
    height: "300px",
  };
  const data = [
    {
      id: 0,
      title: "Служба поддержки",
      description: "",
      email: "info@terminal@.gov.tm",
      phone: "+993 12 57-49-50",
    },
    {
      id: 1,
      title: "Центральный таможенный терминал",
      description:
        "744205, Туркменистан, Ахалский велаят, этрап Ак бугдай, 3000 м на север от Каракумского канала, восточная сторона кольцевой дороги Анау-Дашогуз",
      email: "info@terminal@.gov.tm",
      phone: "+993 12 57-49-50",
    },
    {
      id: 2,
      title: "Сухой порт «Сарахс»",
      description:
        "Стоянка Сарахс – расположен вблизи Сарахского автодорожного таможенного поста Таможни Ахалского велаята",
      email: "info@terminal@.gov.tm",
      phone: "+993 12 57-49-50",
    },
    {
      id: 3,
      title: "Сухой порт «Фарап»",
      description:
        "Стоянка Фарап – расположен вблизи Фарапского автодорожного таможенного поста Таможни Лебапского велаята",
      email: "info@terminal@.gov.tm",
      phone: "+993 12 57-49-50",
    },
  ];
  return (
    <Layout title="Habarlasmak" className="bg_gray">
      <BannerHero banner={banner} />
      <div className="w-full flex flex-col items-center">
        {data?.map((item, index) => {
          return (
            <div
              key={`item${index}`}
              className="container_md bg-white rounded-lg my-5 px-10 py-5"
            >
              <div className="py-3 border-b-2 border-gray-300">
                <p className="font-semibold text-xl">{item.title}</p>
              </div>
              <div className="w-full flex justify-between py-3">
                <div className="w-1/3">
                  <span className="text-gray-400 text-sm">
                    {item.description}
                  </span>
                </div>
                <div className="w-1/3 flex flex-col items-end">
                  <p className="font-medium text-lg">{item.email}</p>
                  <span className="text-gray-300 text-sm">э-почта</span>
                  <p className="font-medium text-lg">{item.phone}</p>
                  <span className="text-gray-300 text-sm">телефон</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center container my-5 mx-5">
        <div className="container_md flex flex-col">
          <p className="text-blue-500 mb-4 ml-5">не нашли ответа?</p>
          <h1 className="text-3xl font-medium ml-5">
            Задайте ворпрос службе <br /> поддержки
          </h1>
          <form>
            <Grid grow className="my-5">
              <Grid.Col span={6}>
                <TextInput size="lg" placeholder="Ваш телефон" />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput size="lg" placeholder="Ваша почта" />
              </Grid.Col>
              <Grid.Col>
                <Textarea
                  size="lg"
                  placeholder="Ваш вопрос"
                  autosize
                  minRows={6}
                />
              </Grid.Col>
            </Grid>
            <div className="flex justify-between">
              <Button className="bg-blue-700">Отправить</Button>
              <Text color="dimmed" size="sm">
                Нажимая Отправить, вы принимаете{" "}
                <Anchor
                  href="#"
                  size="sm"
                  // onClick={(event) => event.preventDefault()}
                >
                  политику конфиденциальности
                </Anchor>
              </Text>
            </div>
          </form>
        </div>
      </div>
      <Banner />
    </Layout>
  );
};
export default Habarlasmak;
