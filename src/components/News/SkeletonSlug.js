import { Skeleton, Grid } from "@mantine/core";

const SkeletonSlug = () => {
  const cars = [1, 2, 3, 4];

  return cars.map((index) => {
    return (
      <>
        <Skeleton height={6} radius="xl" my={15} />
        <Skeleton height={6} radius="xl" my={15} />
        <Skeleton height={6} radius="xl" my={15} />
        <Skeleton height={6} radius="xl" my={15} />
        <Skeleton height={6} radius="xl" my={15} />
      </>
    );
  });
};

export default SkeletonSlug;
