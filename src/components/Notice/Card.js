import { Group, Badge, ThemeIcon } from "@mantine/core";
import {
  IconCalendar,
  IconEye,
  IconTrash,
  IconEdit,
  IconPhoto,
} from "@tabler/icons";
import { CurrentLocation } from "tabler-icons-react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useSelector } from "react-redux";
import { getlang } from "../../store/selectors/auth";
import { ticket } from "../Profile/translation";

const Card = ({ item, type }) => {
  const router = useRouter();
  const lang = useSelector(getlang);
  // console.log(item.images);

  return (
    <div
      onClick={(event) => {
        event.preventDefault();
        if (type != 1) {
          router.push(`/bildirisler/${item.id}`);
        }
      }}
      className={` w-full bg-white cursor-pointer rounded-2xl flex flex-col sm:flex-row p-3 py-5 shadow-lg my-5 first:mt-0 hover:-translate-y-1 hover:scale-100 relative ${
        type == 1 ? "border bg-none shadow-none" : ""
      }`}
    >
      <div className={`sm:w-1/3 w-full h-60 sm:h-52`}>
        {item?.images[0] ? (
          <div className="w-full h-full relative">
            <Image
              src={`${item?.images}`}
              layout="fill"
              className="rounded-2xl"
              // objectFit="cover"
            />
          </div>
        ) : (
          <div className="w-full h-full bg-gray-200 flex justify-center items-center rounded-2xl">
            <IconPhoto size={40} className="text-blue-500" />
          </div>
        )}
      </div>
      <div className="ml-5 flex flex-col w-full sm:w-2/3">
        <h1 className="text-xl font-semibold pt-5">{item?.title}</h1>
        <div className="flex items-center font-semibold">
          <h1 className="text-2xl  text-blue-500 mr-3">{item?.price}</h1>
          <span className="text-sm">TMT</span>
        </div>
        <h3 className="font-semibold my-2">+993 {item?.phone}</h3>
        <div className="flex items-center font-semibold my-2">
          <CurrentLocation size={20} className="mr-1" />
          <span>{item?.location}</span>
        </div>

        {/* <h3 className="font-semibold mb-2">{item?.email}</h3>` */}
        <span className="text-sm my-5">{item?.description}</span>
      </div>
      <Group className="flex justify-end w-full absolute top-4 right-4 text-sm">
        <span className="flex items-center bg-blue-600 px-3 py-1 sm:px-0 sm:py-0 sm:bg-white rounded-full text-white sm:text-black">
          <IconCalendar size={20} className="mr-1" />
          {item?.created_at}
        </span>
        {type == 1 ? (
          <>
            <ThemeIcon
              size="lg"
              variant="gradient"
              gradient={{ from: "pink", to: "red" }}
            >
              <IconTrash size={18} />
            </ThemeIcon>
            <ThemeIcon
              size="lg"
              variant="gradient"
              gradient={{ from: "indigo", to: "violet" }}
            >
              <IconEdit size={18} />
            </ThemeIcon>
          </>
        ) : null}
      </Group>
      <Group className="flex justify-end w-full absolute bottom-4 right-4 text-sm">
        {type == 1 ? (
          item.moderation == 0 ? (
            <Badge
              variant="gradient"
              className="mt-1 w-28"
              gradient={{ from: "yellow.3", to: "yellow" }}
            >
              {ticket[lang]?.pending}
            </Badge>
          ) : item.moderation == 2 ? (
            <Badge
              variant="gradient"
              className="mt-1 w-28"
              gradient={{ from: "red.3", to: "red" }}
            >
              {ticket[lang]?.returned}
            </Badge>
          ) : (
            <Badge
              variant="gradient"
              className="mt-1 w-28"
              gradient={{ from: "green.3", to: "green" }}
            >
              {ticket[lang]?.accept}
            </Badge>
          )
        ) : null}
      </Group>
    </div>
  );
};

export default Card;
