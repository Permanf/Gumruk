import LayoutProfile from "../../../components/Profile/Layout";
import Step from "../../../components/Profile/Stepper";

const Document = () => {
  return (
    <LayoutProfile title="Document">
      <div className="p-10">
        <h1 className="my-3">Ticket upload</h1>
        <Step />
      </div>
    </LayoutProfile>
  );
};

export default Document;
