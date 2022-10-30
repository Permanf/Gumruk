import { Group } from "@mantine/core";
import { IconCalendar, IconEye } from "@tabler/icons";
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
      className="w-full bg-white cursor-pointer rounded-2xl flex p-3 shadow-lg my-5 first:mt-0 hover:-translate-y-1 hover:scale-100"
    >
      <div
        // style={`background-image: url(${item?.image})`}
        style={{
          backgroundImage: `url(${item?.image.src})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className={`w-3/12 h-48 bg-gray-200 rounded-2xl flex justify-center items-center`}
      >
        {/* <Image src={item.image} className="w-full h-full" /> */}
      </div>
      <div className="ml-5 flex flex-col w-3/4 relative">
        <h1 className="text-2xl font-semibold">{item?.title}</h1>
        <h3 className="font-semibold my-2">{item?.phone}</h3>
        {/* <h3 className="font-semibold mb-2">{item?.email}</h3>` */}
        <span className="text-sm">{item?.description}</span>
        <Group className="flex justify-end w-full absolute bottom-0 right-2 text-sm">
          <span className="flex items-center">
            {" "}
            <IconEye size={18} className="mr-1" />
            {item?.eye}
          </span>
          <span className="flex items-center">
            <IconCalendar size={18} className="mr-1" />
            {item?.created_at}
          </span>
        </Group>
      </div>
    </div>
  );
};

export default Card;
