import { Skeleton, Grid } from "@mantine/core";
import { Icon } from "react-icons-kit";
import { arrowRight2 } from "react-icons-kit/icomoon/arrowRight2";
import { useViewportSize } from "@mantine/hooks";

const Skeletons = () => {
  const cars = [1, 2];
  const { width } = useViewportSize();

  return cars.map((index) => {
    return (
      <div
        key={index}
        className="w-full bg-white rounded-lg my-5 p-4 md:p-10  cursor-pointer shadow-md"
      >
        <div className="w-full flex justify-between items-center py-3">
          <Skeleton height={60} width={100} radius="md" my={10} />
          <Skeleton height={8} width={190} radius="xl" my={10} />
          <Skeleton height={6} width={120} radius="xl" my={10} />
          <Icon
            size={width > 500 ? 25 : 15}
            icon={arrowRight2}
            className="text-blue-700"
          />
        </div>
      </div>
    );
  });
};

export default Skeletons;
