import { useQRCode } from "next-qrcode";
import { Grid, Badge } from "@mantine/core";
import Link from "next/link";

const Ticket = ({ nomer }) => {
  const { Canvas } = useQRCode();

  return (
    <Grid.Col sm={12} md={6} lg={6}>
      {/* <Link href="/profile/tickets/create"> */}
      <div className="rounded-2xl shadow-md hover:-translate-y-1 hover:scale-100 overflow-hidden cursor-pointer">
        <div className="w-full justify-between h-12 font-semibold bg-gradient-to-r from-indigo-500 via-indigo-500 to-purple-500 flex items-center text-white p-4">
          <h1>Tickets</h1>
          <span>№ {nomer}</span>
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
            <div className="my-1 flex flex-col">
              <span className="text-gray-400 text-xs">Status</span>
              {/* <Badge
                  variant="gradient"
                  className="mt-1"
                  gradient={{ from: "indigo", to: "cyan" }}
                >
                  Pending
                </Badge> */}
              <Badge
                variant="gradient"
                className="mt-1"
                gradient={{ from: "green", to: "teal" }}
              >
                Success
              </Badge>
              {/* <Badge
                  variant="gradient"
                  className="mt-1"
                  gradient={{ from: "red", to: "yellow" }}
                >
                  Error
                </Badge> */}
            </div>
          </div>

          {/* <div className="flex justify-end px-4">
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
            </div> */}
        </div>
        <div className="w-full h-2 bg-gradient-to-r from-indigo-500 via-indigo-500 to-purple-500 flex items-center"></div>
      </div>
      {/* </Link> */}
    </Grid.Col>
  );
};

export default Ticket;
