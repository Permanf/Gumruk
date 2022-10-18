import { Skeleton } from "@mantine/core";

const Skeletons = () => {
  return (
    <>
      <div className="w-full bg-white rounded-lg my-5 sm:my-10 px-3 sm:px-10 py-2 sm:py-5 shadow-md cursor-pointer">
        <div className="py-3 border-b-2 border-gray-300">
          <Skeleton height={15} radius="xl" my={20} />
        </div>
        <div className="w-full flex flex-col sm:flex-row justify-between py-3">
          <div className="sm:w-1/3">
            <Skeleton height={10} width={200} radius="xl" />
          </div>
          <div className="sm:w-1/3 flex flex-col items-end mt-3 sm:mt-0">
            <Skeleton height={10} width={200} radius="xl" my={5} />
            <span className="text-gray-300 text-sm">э-почта</span>
            <Skeleton height={10} width={200} radius="xl" my={5} />
            <span className="text-gray-300 text-sm">телефон</span>
          </div>
        </div>
      </div>
      <div className="w-full bg-white rounded-lg my-5 sm:my-10 px-3 sm:px-10 py-2 sm:py-5 shadow-md cursor-pointer">
        <div className="py-3 border-b-2 border-gray-300">
          <Skeleton height={15} radius="xl" my={20} />
        </div>
        <div className="w-full flex flex-col sm:flex-row justify-between py-3">
          <div className="sm:w-1/3">
            <Skeleton height={10} width={200} radius="xl" />
          </div>
          <div className="sm:w-1/3 flex flex-col items-end mt-3 sm:mt-0">
            <Skeleton height={10} width={200} radius="xl" my={5} />
            <span className="text-gray-300 text-sm">э-почта</span>
            <Skeleton height={10} width={200} radius="xl" my={5} />
            <span className="text-gray-300 text-sm">телефон</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Skeletons;
