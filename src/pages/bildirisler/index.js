import Card from "../../components/Notice/Card";
import LayoutNotice from "../../components/Notice/Layout";
import Skeletons from "../../components/Notice/Skeletons";
import image1 from "../../assets/Notice/truck.webp";
import image2 from "../../assets/Notice/truck1.webp";
import image3 from "../../assets/Notice/truck3.webp";
import image4 from "../../assets/Notice/truck4.webp";
import image5 from "../../assets/Notice/truck5.webp";
import { Button, Center } from "@mantine/core";
import { IconRefresh } from "@tabler/icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
const Notice = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const data = [
    {
      id: 0,
      title: "Yuk mashyn",
      description: "hello hello hello",
      phone: "+99361 87654321",
      email: "hello@gmail.com",
      created_at: "25.10.2022",
      eye: 65,
      image: image1,
      price: 642,
    },
    {
      id: 1,
      title: "Yuk mashyn",
      description: "hello hello hello",
      phone: "+99361 87654321",
      email: "hello@gmail.com",
      created_at: "25.10.2022",
      eye: 86,
      image: image2,
      price: 8934,
    },
    {
      id: 2,
      title: "Yuk mashyn",
      description: "hello hello hello",
      phone: "+99361 87654321",
      email: "hello@gmail.com",
      created_at: "25.10.2022",
      eye: 546,
      image: image3,
      price: 3422,
    },
    {
      id: 3,
      title: "Yuk mashyn",
      description: "hello hello hello",
      phone: "+99361 87654321",
      email: "hello@gmail.com",
      created_at: "25.10.2022",
      eye: 789,
      image: image4,
      price: 89998,
    },
    {
      id: 4,
      title: "Yuk mashyn",
      description: "hello hello hello",
      phone: "+99361 87654321",
      email: "hello@gmail.com",
      created_at: "25.10.2022",
      eye: 3,
      image: image5,
      price: 76765,
    },
    {
      id: 5,
      title: "Yuk mashyn",
      description: "hello hello hello",
      phone: "+99361 87654321",
      email: "hello@gmail.com",
      created_at: "25.10.2022",
      eye: 33,
      image: image5,
      price: 3249,
    },
    {
      id: 6,
      title: "Yuk mashyn",
      description: "hello hello hello",
      phone: "+99361 87654321",
      email: "hello@gmail.com",
      created_at: "25.10.2022",
      eye: 323,
      image: image4,
      price: 8773,
    },
    {
      id: 7,
      title: "Yuk mashyn",
      description: "hello hello hello",
      phone: "+99361 87654321",
      email: "hello@gmail.com",
      created_at: "25.10.2022",
      eye: 3,
      image: image3,
      price: 78723,
    },
    {
      id: 8,
      title: "Yuk mashyn",
      description: "hello hello hello",
      phone: "+99361 87654321",
      email: "hello@gmail.com",
      created_at: "25.10.2022",
      eye: 1367,
      image: image1,
      price: 8934,
    },
    {
      id: 9,
      title: "Yuk mashyn",
      description: "hello hello hello",
      phone: "+99361 87654321",
      email: "hello@gmail.com",
      created_at: "25.10.2022",
      eye: 45,
      image: image5,
      price: 73648,
    },
  ];
  // console.log(router);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [router?.asPath]);

  return (
    <LayoutNotice title="Bildiris">
      {loading ? (
        <Skeletons />
      ) : data?.length ? (
        data?.map((item) => {
          return <Card item={item} />;
        })
      ) : (
        <h1>Tapylmady</h1>
      )}
      <Center>
        <Button className="bg-blue-500">
          <IconRefresh size={18} className="mr-2" />
          show more
        </Button>
      </Center>
    </LayoutNotice>
  );
};

export default Notice;
