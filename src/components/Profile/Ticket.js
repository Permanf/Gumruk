import { useQRCode } from "next-qrcode";
import { Grid } from "@mantine/core";
import Link from "next/link";

const Ticket = () => {
  const { Canvas } = useQRCode();

  return (
    <Grid.Col sm={12} md={6} lg={6}>
      <Link href="/profile/tickets/information">
        <div className="rounded-lg shadow-md hover:-translate-y-1 hover:scale-100 overflow-hidden cursor-pointer">
          <div className="w-full h-12 bg-gradient-to-r from-indigo-500 via-indigo-500 to-purple-500 flex items-center text-white p-4">
            Tickets
          </div>
          <div className="flex justify-between items-start p-2">
            <div className="p-2">
              <div className="my-1">
                <span className="text-gray-400 text-xs">ID</span>
                <p className="font-semibold text-sm">#FFBF60FF</p>
              </div>
              <div className="my-1">
                <span className="text-gray-400 text-xs">Firstname</span>
                <p className="font-semibold text-sm">Hello</p>
              </div>
              <div className="my-1">
                <span className="text-gray-400 text-xs">Created at</span>
                <p className="font-semibold text-sm">23/09/2022 4:53 PM</p>
              </div>
            </div>

            <div className="flex justify-end px-4">
              <Canvas
                text={"https://github.com/bunlong/next-qrcode"}
                options={{
                  type: "image/jpeg",
                  quality: 0.3,
                  level: "M",
                  margin: 3,
                  scale: 4,
                  width: 100,
                  // color: {
                  //   dark: "#010599FF",
                  //   light: "#FFBF60FF",
                  // },
                }}
              />
            </div>
          </div>
          <div className="w-full h-2 bg-gradient-to-r from-indigo-500 via-indigo-500 to-purple-500 flex items-center"></div>
        </div>
      </Link>
    </Grid.Col>
  );
};

export default Ticket;
