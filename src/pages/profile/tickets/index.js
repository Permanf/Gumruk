import LayoutProfile from "../../../components/Profile/Layout";
import { Grid, Button } from "@mantine/core";
import Ticket from "../../../components/Profile/Ticket";

const Tickets = () => {
  return (
    <LayoutProfile title="Bilet">
      <div className="p-7">
        <div className="flex justify-between mb-5">
          <h1 className="my-3">Ticket upload</h1>
          <Button className="bg-blue-500">Create Ticket</Button>
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
