import { Skeleton, Grid } from "@mantine/core";

const Skeletons = () => {
  const cars = [1, 2, 3, 4];

  return cars.map((index) => {
    return (
      <Grid.Col
        key={index}
        xs={6}
        md={4}
        lg={3}
        className="bg-white rounded-md p-5 flex flex-col border cursor-pointer hover:text-blue-500"
      >
        <Skeleton height={8} width={120} radius="xl" my={10} />
        <Skeleton height={10} radius="xl" my={5} />
        <Skeleton height={10} radius="xl" my={5} />
        <Skeleton height={10} radius="xl" my={5} />

        <Skeleton height={8} width={90} radius="xl" my={10} />
      </Grid.Col>
    );
  });
};

export default Skeletons;
