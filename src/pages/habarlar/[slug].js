import { Banner } from "../../components/Banner/Banner";
import { BannerHero } from "../../components/Banner/BannerHerro";
import Layout from "../../components/Layouts/Layout";
import { IconVideo } from "@tabler/icons";
import { Grid, Anchor, ThemeIcon, Tabs, Button } from "@mantine/core";
import { useRouter } from "next/router";
import { fetchData, post } from "../../store/middlewares/index";
import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeletons from "../../components/News/Skeletons";
import SkeletonSlug from "../../components/News/SkeletonSlug";
import { translation } from "../../components/News/translation";

function reducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_DATA":
      return {
        ...state,
        data: action.payload,
      };
    case "SET_SLUG":
      return {
        ...state,
        slug_data: action.payload,
      };
    default:
      return state;
  }
}

const News = () => {
  const [state, setState] = useReducer(reducer, {
    loading: false,
    data: [],
    slug_data: {},
  });
  const router = useRouter();
  const dispatch = useDispatch();
  const { lang } = useSelector((state) => state.data);

  useEffect(() => {
    setState({ type: "SET_LOADING", payload: true });
    dispatch(
      fetchData({
        url: `news/${router.query.slug}/show`,
        lang: lang,
        action: (response) => {
          console.log(response, "-news slug");
          if (response?.success) {
            setState({ type: "SET_SLUG", payload: response?.data?.data });
          } else {
            console.log(response);
          }
        },
      })
    );
    dispatch(
      fetchData({
        url: `news`,
        lang: lang,
        action: (response) => {
          setState({ type: "SET_LOADING", payload: false });
          console.log(response, "-news");
          if (response?.success) {
            setState({ type: "SET_DATA", payload: response?.data?.data });
          } else {
            console.log(response);
          }
        },
      })
    );
  }, [lang, router.query.slug]);

  const banner = {
    title: state.slug_data.title,
    description: state.slug_data.category,
  };

  // const detail =
  //   "8 июня 2022 года в Нур-Султане, Казахстан, завершилось Третье совещание Министров иностранных дел формата «Центральная Азия – Китай».В её ходе состоялся конструктивный и заинтересованный многосторонний диалог о ходе и перспективах сотрудничества в данном формате. Среди обсуждавшихся тем особое внимание было уделено необходимости консолидации совместных усилий для обеспечения долгосрочного мира и стабильности, вопросам активизации торгово-экономического и инвестиционного сотрудничества, раширению культурно-гуманитарных связей.Обращаясь к участникам, Министр иностранных дел Туркменистана Р.Мередов отметил плодотворный ход политико-дипломатического диалога, нацеленного на упрочение стратегического партнерства стран Центральной Азии и Китая, в русле достигнутых главами государств договоренностей.В этом контексте руководитель туркменского МИД сделал особый акцент на перспективах энергетического и транспортно-коммуникационного взаимодействия по линии Центральная Азия – Китай, отметив готовность Туркменистана к последовательному наращиванию поставок природного газа в Китай через территорию ЦентральнойАзии.В плане транспортного сотрудничества Р.Мередов отметил обоснованность и реальную возможность налаживания мультимодальных транспортных сообщений из Китая в западном направлении через территорию  Центральной Азии. В данном контексте, закономерным выглядит использование возможностей портовой инфраструктуры Туркменистана на Каспийском море.В ходе встречи также было уделено отдельное внимание афганской проблематике, объединению усилий по борьбе с новыми угрозами и вызовами, совместной работе по проедолению послествий пандемии, ряду других важных вопросов.По итогам встречи приняты Совместное заявление, Дорожная карта по развитию регионального сотрудничества на 2022-2025 годы, Инициатива об углублении сотрудничества между государствами Центральной Азии и Китаем в области взаимосвязанности, Инициатива по взаимодействию в обеспечении безопасности цифровых данных между Китаем и странами Центральной Азии.В рамках мероприятия Министр иностранных дел Туркменистана провел встречи с министрами иностранных дел КНР, Республики Казахстан, Кыргызской Республики и исполняющим обязанности министра иностранных дел Республики Узбекистан, в ходе которых обсуждались вопросы двустороннего сотрудничества, региональная и международная проблематика.";

  return (
    <Layout title="Habarlar" className="bg_gray">
      <BannerHero banner={banner} />
      <div className="flex justify-center items-center">
        <div className="container_out">
          {state.loading ? (
            <SkeletonSlug />
          ) : (
            <p className="text-sm sm:text-base p-2">
              {state.slug_data.description}
            </p>
          )}
        </div>
      </div>
      <Banner />
      <div className="w-full flex flex-col items-center py-20">
        <div className="container_out flex justify-between mb-4">
          <h1 className="font-bold text-2xl sm:text-4xl mb-4">
            {translation[lang]?.other_publications}
          </h1>
          <Button
            variant="outline"
            radius="md"
            size="md"
            className="text-sm sm:text-base"
            onClick={() => {
              router.push(`/habarlar`);
            }}
          >
            {translation[lang]?.all_publications}
          </Button>
        </div>
        <Grid className="container_out">
          {!state.loading ? (
            state?.data?.slice(0, 4)?.map((item) => {
              return (
                <Grid.Col
                  key={item.id}
                  xs={6}
                  md={4}
                  lg={3}
                  className="bg-white rounded-md p-5 flex flex-col border cursor-pointer"
                  onClick={() => {
                    router.push(`/habarlar/${item.id}`);
                  }}
                >
                  <h1 className="text-blue-500 mb-3 font-medium ">
                    {item.category}
                  </h1>
                  <span className="mb-2 font-semibold text-sm sm:text-base">
                    {item?.title}
                  </span>
                  <span className="text-sm">{item?.date}</span>
                </Grid.Col>
              );
            })
          ) : (
            <Skeletons />
          )}
        </Grid>
      </div>
    </Layout>
  );
};
export default News;
