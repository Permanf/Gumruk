import { Group } from "@mantine/core";
import { IconCalendar, IconEye } from "@tabler/icons";
import { CurrentLocation } from "tabler-icons-react";
import { useRouter } from "next/router";

const Card = ({ item, key }) => {
  const router = useRouter();

  return (
    <div
      onClick={(event) => {
        event.preventDefault();
        router.push(`/bildirisler/${item.id}`);
      }}
      key={key}
      className="w-full bg-white cursor-pointer rounded-2xl flex p-3 py-5 shadow-lg my-5 first:mt-0 hover:-translate-y-1 hover:scale-100 relative"
    >
      <div
        // style={`background-image: url(${item?.image})`}
        style={{
          backgroundImage: `url(${item?.image.src})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className={`w-1/3 h-52 bg-gray-200 rounded-2xl flex justify-center items-center`}
      >
        {/* <Image src={item.image} className="w-full h-full" /> */}
      </div>
      <div className="ml-5 flex flex-col w-2/3">
        <h1 className="text-xl font-semibold pt-5">{item?.title}</h1>
        <div className="flex items-center font-semibold">
          <h1 className="text-2xl  text-blue-500 mr-3">{item?.price}</h1>
          <span className="text-sm">TMT</span>
        </div>
        <h3 className="font-semibold my-2">{item?.phone}</h3>
        <div className="flex items-center font-semibold my-2">
          <CurrentLocation size={20} className="mr-1" />
          <span>Ashgabat</span>
        </div>
        {/* <h3 className="font-semibold mb-2">{item?.email}</h3>` */}
        <span className="text-sm my-5">{item?.description}</span>
      </div>
      <Group className="flex justify-end w-full absolute top-4 right-4 text-sm">
        <span className="flex items-center">
          {" "}
          <IconEye size={20} className="mr-1" />
          {item?.eye}
        </span>
        <span className="flex items-center">
          <IconCalendar size={20} className="mr-1" />
          {item?.created_at}
        </span>
      </Group>
    </div>
  );
};

export default Card;
