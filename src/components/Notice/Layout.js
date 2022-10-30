import { Center, Group, Select } from "@mantine/core";
import Layout from "../Layouts/Layout";
import { useViewportSize } from "@mantine/hooks";
import Link from "next/link";
import { Sidebar } from "./Sidebar";

function LayoutNotice({ children, title }) {
  const { width } = useViewportSize();

  return (
    <Layout title={title}>
      <Center className="bg_gray">
        <div className="container_out py-10 px-1">
          <h1 className="text-xl sm:text-3xl font-semibold">Oбъявление</h1>
          <Group position="right">
            <Select
              // label="Your favorite framework/library"
              placeholder="Saylanmadyk"
              data={[
                { value: "high", label: "По цене убывания" },
                { value: "loew", label: "По цене возрастания" },
                { value: "time1", label: "По дате убывания" },
                { value: "time2", label: "По дате возрастания" },
              ]}
            />
          </Group>
          <div className="w-full flex my-10">
            <Sidebar />
            {/* part2 */}
            <div
              className={`${
                width > 1000 ? "w-3/4 ml-5" : "w-full relative overflow-hidden"
              }`}
            >
              {children}
            </div>
          </div>
        </div>
      </Center>
    </Layout>
  );
}

export default LayoutNotice;
