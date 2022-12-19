import { Container } from "@mantine/core";
import { Banner } from "../../components/Banner/Banner";
import { BannerHero } from "../../components/Banner/BannerHerro";
import Layout from "../../components/Layouts/Layout";
import image from "../../assets/Potlar/banner.svg";
import { fetchData, post } from "../../store/middlewares/index";
import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeletons from "../../components/Ports/Skeletons";

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
    default:
      return state;
  }
}

const Portlar = () => {
  const [state, setState] = useReducer(reducer, {
    loading: false,
    data: [],
  });
  const dispatch = useDispatch();
  const { lang } = useSelector((state) => state.data);
  console.log(lang);

  useEffect(() => {
    setState({ type: "SET_LOADING", payload: true });
    dispatch(
      fetchData({
        url: `ports`,
        lang: lang == "English" ? "en" : lang == "Turkmen" ? "tm" : "ru",
        action: (response) => {
          setState({ type: "SET_LOADING", payload: false });
          setState({ type: "SET_DATA", payload: response.data.data });
          console.log(response.data.data, "-portlar");
        },
      })
    );
  }, [lang]);

  const banner = {
    title: "Сухие порты",
    description:
      "Имеется в наличии 4 сухих портов принадлежащих дирекцию управления хозяйства. Предоставляем подробную информацию о спецификациях этих портов.",
    info: [
      {
        qty: 57000,
        description: "Открытая площадка общей площадью",
      },
      {
        qty: 300,
        description: "Стоянка для легковых автотранспортных средств",
      },
      {
        qty: 600,
        description: "Стоянка для грузовых автотранспортных средств",
      },
    ],
    image: image,
    with: "600px",
    height: "250px",
  };
  const data = [
    {
      id: 0,
      title: "Центральный таможенный терминал",
      region: "Ашхабад, Туркменистан",
      email: "info@terminal@.gov.tm",
      phone: "+993 12 57-49-50",
    },
    {
      id: 1,
      title: "Центральный таможенный терминал",
      region: "Лебапский велаят",
      email: "info@terminal@.gov.tm",
      phone: "+993 12 57-49-50",
    },
    {
      id: 2,
      title: "Сухой порт «Сарахс»",
      region: "Ахалский велаят",
      email: "info@terminal@.gov.tm",
      phone: "+993 12 57-49-50",
    },
    {
      id: 3,
      title: "Сухой порт «Фарап»",
      region: "Лебапский велаят",
      email: "info@terminal@.gov.tm",
      phone: "+993 12 57-49-50",
    },
  ];
  return (
    <Layout title="Portlar" className="bg_gray">
      <BannerHero banner={banner} />
      <div className="w-full flex flex-col items-center">
        <div className="container_md ">
          {state.data ? (
            state.data?.map((item, index) => {
              return (
                <div
                  key={`port${index}`}
                  className="w-full shadow-md bg-white rounded-lg my-5 sm:my-10 px-3 sm:px-10 py-2 sm:py-5 cursor-pointer transition ease-in-out delay-200  hover:bg-blue-700  hover:text-white"
                >
                  <div className="py-3 border-b-2 border-gray-300">
                    <p className="font-semibold text-lg sm:text-xl mb-3">
                      {item.title}
                    </p>
                    <span className="text-gray-400 text-xs sm:text-sm">
                      {item.address}
                    </span>
                  </div>
                  <div className="w-full flex flex-col sm:flex-row justify-between py-3">
                    <div>
                      <p className="font-medium text-base sm:text-lg">
                        {item.phone}
                      </p>
                      <span className="text-gray-300 text-xs sm:text-sm">
                        телефон
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-base sm:text-lg">
                        {item.email}
                      </p>
                      <span className="text-gray-300 text-xs sm:text-sm">
                        э-почта
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <Skeletons />
          )}
        </div>
      </div>
      <Banner />
    </Layout>
  );
};
export default Portlar;
