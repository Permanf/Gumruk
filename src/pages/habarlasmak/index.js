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
import { useViewportSize } from "@mantine/hooks";
import { fetchData, post } from "../../store/middlewares/index";
import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";

function reducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}

const Habarlasmak = () => {
  const { width } = useViewportSize();
  const { lang } = useSelector((state) => state.data);
  // console.log(lang);
  const dispatch = useDispatch();

  useEffect(() => {
    // setState({ type: "SET_LOADING", payload: true });
    dispatch(
      fetchData({
        url: `contact`,
        lang: lang == "Russian" ? "ru" : lang == "Turkmen" ? "tm" : "en",
        action: (response) => {
          // setState({ type: "SET_LOADING", payload: false });
          console.log(response);
        },
      })
    );
  }, [lang]);

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
        <div className="container_md">
          {data?.map((item, index) => {
            return (
              <div
                key={`item${index}`}
                className="w-full bg-white rounded-lg my-5 sm:my-10 px-3 sm:px-10 py-2 sm:py-5 shadow-md cursor-pointer"
              >
                <div className="py-3 border-b-2 border-gray-300">
                  <p className="font-semibold text-base sm:text-xl">
                    {item.title}
                  </p>
                </div>
                <div className="w-full flex flex-col sm:flex-row justify-between py-3">
                  <div className="sm:w-1/3">
                    <span className="text-gray-400 text-xs sm:text-sm">
                      {item.description}
                    </span>
                  </div>
                  <div className="sm:w-1/3 flex flex-col items-end mt-3 sm:mt-0">
                    <p className="font-medium text-sm sm:text-lg">
                      {item.email}
                    </p>
                    <span className="text-gray-300 text-sm">э-почта</span>
                    <p className="font-medium text-sm sm:text-lg">
                      {item.phone}
                    </p>
                    <span className="text-gray-300 text-sm">телефон</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center container my-5">
        <div className="container_md flex flex-col">
          <p className="text-blue-500 mb-4 ml-5 text-sm sm:text-base">
            не нашли ответа?
          </p>
          <h1 className="text-xl sm:text-3xl font-medium ml-5">
            Задайте ворпрос службе <br /> поддержки
          </h1>
          <form>
            <Grid grow className="my-5 px-1">
              <Grid.Col span={width > 500 ? 6 : 12}>
                <TextInput
                  size={width > 500 ? "lg" : "md"}
                  placeholder="Ваш телефон"
                />
              </Grid.Col>
              <Grid.Col span={width > 500 ? 6 : 12}>
                <TextInput
                  size={width > 500 ? "lg" : "md"}
                  placeholder="Ваша почта"
                />
              </Grid.Col>
              <Grid.Col>
                <Textarea
                  size={width > 500 ? "lg" : "md"}
                  placeholder="Ваш вопрос"
                  autosize
                  minRows={6}
                />
              </Grid.Col>
            </Grid>
            <div className="flex flex-col sm:flex-row justify-between px-1">
              <Button className="bg-blue-700 mb-3 sm:mb-0">Отправить</Button>
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
