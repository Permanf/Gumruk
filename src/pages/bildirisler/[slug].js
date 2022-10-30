import { Button, Center } from "@mantine/core";
import Layout from "../../components/Layouts/Layout";
import image1 from "../../assets/Notice/truck3.webp";
import { IconPhone } from "@tabler/icons";

const NoticeSlug = () => {
  const data = {
    id: 0,
    title: "Yuk mashyn",
    description:
      "hello hello hello hello hello hellohello hello hello hello hello hellohello hello hellohello hello hellohello hello hellohello hello hellohello hello hellohello hello hellohello hello hellohello hello hellohello hello hellohello hello hello hello hello hello hello hello hellohello hello hello",
    phone: "+99361 87654321",
    email: "hello@gmail.com",
    created_at: "25.10.2022",
    eye: 65,
    image: image1,
    price: 34359,
  };
  return (
    <Layout title={"Bildiris detail"}>
      <div className="bg_gray">
        <Center className="py-10">
          <div className="container_out bg-white rounded-xl p-5 flex ">
            <div className="w-3/4 mr-10 p-5">
              <h1 className="font-semibold text-2xl mb-5">{data.title}</h1>
              <div
                className="w-full h-96 rounded-2xl"
                style={{
                  backgroundImage: `url(${data?.image?.src})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              ></div>
              <div className="w-full flex py-5">
                <div className="w-3/12">
                  <span className="text-base font-semibold">Description</span>
                </div>
                <div className="w-3/4">
                  <span className="text-base text-gray-500">
                    {data.description}
                  </span>
                </div>
              </div>
              <div className="w-full flex py-5">
                <div className="w-3/12">
                  <span className="text-base font-semibold">Created at</span>
                </div>
                <div className="w-3/4">
                  <span className="text-base text-gray-500">
                    {data.created_at}
                  </span>
                </div>
              </div>
              <div className="w-full flex py-5">
                <div className="w-3/12">
                  <span className="text-base font-semibold">Категория</span>
                </div>
                <div className="w-3/4">
                  <span className="text-base text-gray-500">
                    Ulag serişdeleri
                  </span>
                </div>
              </div>
              <div className="w-full flex py-5">
                <div className="w-3/12">
                  <span className="text-base font-semibold">Состояние</span>
                </div>
                <div className="w-3/4">
                  <span className="text-base text-gray-500">Новoe</span>
                </div>
              </div>
            </div>
            <div className="w-3/12 h-40 py-5">
              <h1 className="font-bold text-2xl mb-5">
                {data.price} <span className="text-base">TMT</span>
              </h1>
              <Button size="lg" className="bg-blue-500 w-full mb-5">
                <IconPhone size={23} className="mr-4" />
                {data.phone}
              </Button>
              <div className="flex text-sm items-center py-3">
                <span className="font-semibold text-base mr-3">
                  Пользователь:{" "}
                </span>
                <span className="text-gray-500">The best</span>
              </div>
              <div className="flex text-sm items-center py-3">
                <span className="font-semibold text-base mr-3">
                  Просмотры:{" "}
                </span>
                <span className="text-gray-500">{data.eye}</span>
              </div>
            </div>
          </div>
        </Center>
      </div>
    </Layout>
  );
};

export default NoticeSlug;
