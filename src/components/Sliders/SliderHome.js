import { Carousel } from "@mantine/carousel";
import { Icon } from "react-icons-kit";
import { arrowLeft2 } from "react-icons-kit/icomoon/arrowLeft2";
import { arrowRight2 } from "react-icons-kit/icomoon/arrowRight2";
import { useRouter } from "next/router";
import SkeletonSlider from "../News/SkeletonSlider";

function SliderHome({ data, withControls }) {
  const router = useRouter();

  return (
    <Carousel
      withIndicators
      withControls={withControls}
      // height={220}
      // className="bg-red-300 py-10"
      slideSize="33.333333%"
      slideGap="md"
      breakpoints={[
        { maxWidth: "md", slideSize: "50%" },
        { maxWidth: "sm", slideSize: "100%", slideGap: 0 },
      ]}
      loop
      align="start"
      nextControlIcon={
        <Icon size={15} icon={arrowRight2} className="text-white font-bold" />
      }
      previousControlIcon={
        <Icon size={15} icon={arrowLeft2} className="text-white font-bold" />
      }
    >
      {data?.length ? (
        data?.map((item) => {
          return (
            <Carousel.Slide
              key={item?.id}
              onClick={() => {
                router.push(`/habarlar/${item?.id}`);
              }}
              className="bg-white flex flex-col py-5 px-5 border rounded-md cursor-pointer hover:text-blue-600"
            >
              <h1 className="text-blue-500 mb-3 font-medium ">
                {item?.category}
              </h1>
              <span className="mb-2 font-semibold text-sm sm:text-base">
                {item?.title}
              </span>
              <span className="text-sm">{item?.created_at}</span>
            </Carousel.Slide>
          );
        })
      ) : (
        <SkeletonSlider />
      )}
    </Carousel>
  );
}

export default SliderHome;
