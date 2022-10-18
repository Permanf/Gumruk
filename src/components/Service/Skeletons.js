import { Skeleton } from "@mantine/core";

const Skeletons = () => {
  return (
    <>
      <div className="w-full flex flex-col items-start my-4 mt-16">
        <Skeleton height={15} width={350} radius="xl" my={15} />

        <Skeleton height={8} width={200} radius="xl" />
      </div>
      <div className="w-full bg-white rounded-lg my-5 sm:my-10 px-3 sm:px-10 py-2 sm:py-5 shadow-md cursor-pointer">
        <div className="w-full flex flex-col sm:flex-row justify-between py-3">
          <div className="sm:w-1/3">
            <Skeleton height={10} width={200} radius="xl" my={10} />
          </div>
          <div className="sm:w-1/3 flex flex-col items-end justify-center">
            <Skeleton height={8} width={200} radius="xl" my={10} />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-start my-4 mt-16">
        <Skeleton height={15} width={350} radius="xl" my={15} />

        <Skeleton height={8} width={200} radius="xl" />
      </div>
      <div className="w-full bg-white rounded-lg my-5 sm:my-10 px-3 sm:px-10 py-2 sm:py-5 shadow-md cursor-pointer">
        <div className="w-full flex flex-col sm:flex-row justify-between py-3">
          <div className="sm:w-1/3">
            <Skeleton height={10} width={200} radius="xl" my={10} />
          </div>
          <div className="sm:w-1/3 flex flex-col items-end justify-center">
            <Skeleton height={8} width={200} radius="xl" my={10} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Skeletons;
