import { useSelector } from "react-redux";
import LayoutProfile from "../../../../components/Profile/Layout";
import Step from "../../../../components/Profile/Stepper";
import { declaration } from "../../../../components/Profile/translation";
import { getlang } from "../../../../store/selectors/auth";

const DeclarationCreate = () => {
  const lang = useSelector(getlang);
  return (
    <LayoutProfile title="Declaration">
      <h1 className="p-4 font-semibold text-xl mb-3">
        {declaration[lang]?.declaration_create}
      </h1>
      <Step />
    </LayoutProfile>
  );
};

export default DeclarationCreate;
