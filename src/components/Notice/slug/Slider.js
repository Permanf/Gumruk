import { Carousel } from "@mantine/carousel";
import Image from "next/image";
import { Icon } from "react-icons-kit";
import { arrowLeft2 } from "react-icons-kit/icomoon/arrowLeft2";
import { arrowRight2 } from "react-icons-kit/icomoon/arrowRight2";
import { IconPhoto } from "@tabler/icons";

const Slider = ({ data }) => {
  return data?.images?.[0] ? (
    <Carousel
      className="w-full h-96"
      withIndicators
      nextControlIcon={
        <Icon size={15} icon={arrowRight2} className="text-white font-bold" />
      }
      previousControlIcon={
        <Icon size={15} icon={arrowLeft2} className="text-white font-bold" />
      }
      styles={{
        indicator: {
          width: 12,
          height: 4,
          transition: "width 250ms ease",
          position: "relative",

          "&[data-active]": {
            width: 40,
          },
        },
      }}
    >
      {data?.images?.map((item, index) => {
        return (
          <Carousel.Slide key={index} className=" h-96">
            <div className="w-full h-full relative">
              <Image
                src={`${item}`}
                layout="fill"
                className="rounded-xl"
                objectFit="cover"
              />
            </div>
          </Carousel.Slide>
        );
      })}
    </Carousel>
  ) : (
    // <div className="w-full h-full flex justify-center items-center">
    <IconPhoto size={40} className="text-blue-500" />
    // </div>
  );
};

export default Slider;
