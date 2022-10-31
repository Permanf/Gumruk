import LayoutProfile from "../../../components/Profile/Layout";
import { Grid, Button } from "@mantine/core";
import Ticket from "../../../components/Profile/Ticket";
import Link from "next/link";
import { IconPlus } from "@tabler/icons";

const Tickets = () => {
  return (
    <LayoutProfile title="Bilet">
      <div className="p-7">
        <div className="flex justify-between mb-5">
          <h1 className="my-3 font-semibold text-xl">Ticket list</h1>
          <Link href={"/profile/tickets/create"}>
            <Button className="bg-blue-500">
              <IconPlus size={14} className="mr-2" />
              Create Ticket
            </Button>
          </Link>
        </div>

        <Grid gutter={30} className="w-full">
          <Ticket nomer="1" />
          <Ticket nomer="2" />
          <Ticket nomer="3" />
        </Grid>
      </div>
    </LayoutProfile>
  );
};

export default Tickets;
