import { Skeleton } from "@mantine/core";

const Skeletons = () => {
  return (
    <>
      <div className="w-full shadow-md bg-white rounded-lg my-5 sm:my-10 px-3 sm:px-10 py-2 sm:py-5 cursor-pointer transition ease-in-out delay-200  hover:text-white">
        <div className="py-3 border-b-2 border-gray-300">
          <Skeleton height={15} radius="xl" my={15} />

          <Skeleton height={8} width={200} radius="xl" />
        </div>
        <div className="w-full flex flex-col sm:flex-row justify-between py-3">
          <div>
            <Skeleton height={8} width={200} radius="xl" my={10} />

            <span className="text-gray-300 text-xs sm:text-sm">телефон</span>
          </div>
          <div>
            <Skeleton height={8} width={200} radius="xl" my={10} />

            <span className="text-gray-300 text-xs sm:text-sm">э-почта</span>
          </div>
        </div>
      </div>
      <div className="w-full shadow-md bg-white rounded-lg my-5 sm:my-10 px-3 sm:px-10 py-2 sm:py-5 cursor-pointer transition ease-in-out delay-200  hover:text-white">
        <div className="py-3 border-b-2 border-gray-300">
          <Skeleton height={15} radius="xl" my={15} />

          <Skeleton height={8} width={200} radius="xl" />
        </div>
        <div className="w-full flex flex-col sm:flex-row justify-between py-3">
          <div>
            <Skeleton height={8} width={200} radius="xl" my={10} />

            <span className="text-gray-300 text-xs sm:text-sm">телефон</span>
          </div>
          <div>
            <Skeleton height={8} width={200} radius="xl" my={10} />

            <span className="text-gray-300 text-xs sm:text-sm">э-почта</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Skeletons;
