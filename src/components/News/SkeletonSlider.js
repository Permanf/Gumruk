import { Skeleton } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { Icon } from "react-icons-kit";
import { arrowLeft2 } from "react-icons-kit/icomoon/arrowLeft2";
import { arrowRight2 } from "react-icons-kit/icomoon/arrowRight2";

const SkeletonSlider = () => {
  const cars = [1, 2, 3, 4, 5, 6];

  return (
    <Carousel
      withIndicators
      withControls={false}
      slideSize="33.333333%"
      slideGap="md"
      loop
      align="start"
      nextControlIcon={
        <Icon size={20} icon={arrowRight2} className="text-white font-bold" />
      }
      previousControlIcon={
        <Icon size={20} icon={arrowLeft2} className="text-white font-bold" />
      }
    >
      {cars?.map((item, index) => {
        return (
          <Carousel.Slide
            key={index}
            onClick={() => {
              router.push(`/habarlar/${item.id}`);
            }}
            className="bg-white flex flex-col py-5 px-5 border rounded-md cursor-pointer hover:text-blue-600"
          >
            <Skeleton height={8} width={120} radius="xl" my={10} />
            <Skeleton height={10} radius="xl" my={5} />
            <Skeleton height={10} radius="xl" my={5} />
            <Skeleton height={10} radius="xl" my={5} />

            <Skeleton height={8} width={90} radius="xl" my={10} />
          </Carousel.Slide>
        );
      })}
    </Carousel>
  );
};

export default SkeletonSlider;
