import { Skeleton } from "@mantine/core";

const SkeletonsSide = () => {
  return (
    <div className="p-3 px-4 w-full">
      <Skeleton height={7} radius="xl" className="my-5" />
      <Skeleton height={7} radius="xl" className="my-5" />
      <Skeleton height={7} radius="xl" className="my-5" />
      <Skeleton height={7} radius="xl" className="my-5" />
      <Skeleton height={7} radius="xl" className="my-5" />
      <Skeleton height={7} radius="xl" className="my-5" />
      <Skeleton height={7} radius="xl" className="my-5" />
    </div>
  );
};

export default SkeletonsSide;
