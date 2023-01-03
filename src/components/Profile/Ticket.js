import { useQRCode } from "next-qrcode";
import { Grid, Badge } from "@mantine/core";
import Link from "next/link";
import { ticket } from "./translation";
import { useSelector } from "react-redux";
import { getlang } from "../../store/selectors/auth";

const Ticket = ({ element }) => {
  // const { Canvas } = useQRCode();
  // console.log(element);
  const lang = useSelector(getlang);

  return (
    <Grid.Col sm={6} lg={6}>
      <Link href={`/profile/tickets/declaration/${element?.id}`}>
        <div className="rounded-2xl shadow-md hover:-translate-y-1 hover:scale-100 overflow-hidden cursor-pointer">
          <div className="w-full justify-between h-12 font-semibold bg-gradient-to-r from-indigo-500 via-indigo-500 to-purple-500 flex items-center text-white p-4">
            <h1>{ticket[lang]?.tickets}</h1>
            <span>№ {element?.id}</span>
          </div>
          <div className="flex justify-between items-start p-2">
            <div className="p-2">
              <div className="my-1">
                <span className="text-gray-400 text-xs">ID</span>
                <p className="font-semibold text-sm break-words w-2/3">
                  #{element.unique_number}
                </p>
              </div>
              <div className="my-1">
                <span className="text-gray-400 text-xs">
                  {ticket[lang]?.support_username}
                </span>
                <p className="font-semibold text-sm">
                  {element?.support_id?.id ? (
                    <>
                      {element?.support_id.first_name}{" "}
                      {element?.support_id.last_name}
                    </>
                  ) : (
                    <span>{ticket[lang]?.unknown}</span>
                  )}
                </p>
              </div>
              <div className="my-1">
                <span className="text-gray-400 text-xs">
                  {ticket[lang]?.created_at}
                </span>
                <p className="font-semibold text-sm">{element?.created_at}</p>
              </div>
              <div className="my-1 flex flex-col">
                <span className="text-gray-400 text-xs">
                  {ticket[lang]?.status}
                </span>
                {element.status == "PENDING" ? (
                  <Badge
                    variant="gradient"
                    className="mt-1 w-28"
                    gradient={{ from: "yellow.3", to: "yellow" }}
                  >
                    {ticket[lang]?.pending}
                  </Badge>
                ) : element.status == "RETURNED" ? (
                  <Badge
                    variant="gradient"
                    className="mt-1 w-28"
                    gradient={{ from: "red.3", to: "red" }}
                  >
                    {ticket[lang]?.returned}
                  </Badge>
                ) : (
                  <Badge
                    variant="gradient"
                    className="mt-1 w-28"
                    gradient={{ from: "green.3", to: "green" }}
                  >
                    {ticket[lang]?.accept}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="w-full h-2 bg-gradient-to-r from-indigo-500 via-indigo-500 to-purple-500 flex items-center"></div>
        </div>
      </Link>
    </Grid.Col>
  );
};

export default Ticket;
