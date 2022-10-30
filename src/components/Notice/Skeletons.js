import { Skeleton } from "@mantine/core";

const Skeletons = () => {
  return (
    <>
      <div className="w-full bg-white rounded-2xl flex p-3 shadow-lg my-5 first:mt-0">
        <div className="w-3/12 h-48 bg-gray-200 rounded-2xl flex justify-center items-center">
          <Skeleton height={`100%`} width={`100%`} className="rounded-2xl" />
        </div>
        <div className="ml-5 flex flex-col w-3/4 relative">
          <Skeleton height={11} width={200} radius="xl" mt={3} />
          <Skeleton height={11} width={140} radius="xl" my={20} />
          {/* <h3 className="font-semibold mb-2">{item?.email}</h3>` */}
          <Skeleton height={7} radius="xl" my={6} />
          <Skeleton height={7} radius="xl" my={6} />
          <Skeleton height={7} radius="xl" my={6} />
        </div>
      </div>
      <div className="w-full bg-white rounded-2xl flex p-3 shadow-lg my-5 first:mt-0">
        <div className="w-3/12 h-48 bg-gray-200 rounded-2xl flex justify-center items-center">
          <Skeleton height={`100%`} width={`100%`} className="rounded-2xl" />
        </div>
        <div className="ml-5 flex flex-col w-3/4 relative">
          <Skeleton height={11} width={200} radius="xl" mt={3} />
          <Skeleton height={11} width={140} radius="xl" my={20} />
          {/* <h3 className="font-semibold mb-2">{item?.email}</h3>` */}
          <Skeleton height={7} radius="xl" my={6} />
          <Skeleton height={7} radius="xl" my={6} />
          <Skeleton height={7} radius="xl" my={6} />
        </div>
      </div>
      <div className="w-full bg-white rounded-2xl flex p-3 shadow-lg my-5 first:mt-0">
        <div className="w-3/12 h-48 bg-gray-200 rounded-2xl flex justify-center items-center">
          <Skeleton height={`100%`} width={`100%`} className="rounded-2xl" />
        </div>
        <div className="ml-5 flex flex-col w-3/4 relative">
          <Skeleton height={11} width={200} radius="xl" mt={3} />
          <Skeleton height={11} width={140} radius="xl" my={20} />
          {/* <h3 className="font-semibold mb-2">{item?.email}</h3>` */}
          <Skeleton height={7} radius="xl" my={6} />
          <Skeleton height={7} radius="xl" my={6} />
          <Skeleton height={7} radius="xl" my={6} />
        </div>
      </div>
    </>
  );
};

export default Skeletons;
