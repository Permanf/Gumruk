import LayoutProfile from "../../../components/Profile/Layout";
import { Grid } from "@mantine/core";
import Ticket from "../../../components/Profile/Ticket";

const Tickets = () => {
  return (
    <LayoutProfile title="Bilet">
      <div className="p-7">
        <h1 className="my-3">Ticket upload</h1>
        <Grid gutter={30} className="w-full">
          <Ticket />
          <Ticket />
          <Ticket />
        </Grid>
      </div>
    </LayoutProfile>
  );
};

export default Tickets;
