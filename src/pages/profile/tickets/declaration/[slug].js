import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import LayoutProfile from "../../../../components/Profile/Layout";
import Step from "../../../../components/Profile/Stepper";
import { declaration } from "../../../../components/Profile/translation";
import { getlang } from "../../../../store/selectors/auth";

const DeclarationUpdate = () => {
  const router = useRouter();
  // console.log(router.query.slug);
  const lang = useSelector(getlang);
  return (
    <LayoutProfile title="Declaration">
      <h1 className="p-4 font-semibold text-xl mb-3">
        {declaration[lang]?.declaration_update}
      </h1>
      <Step update_id={router?.query?.slug} />
    </LayoutProfile>
  );
};

export default DeclarationUpdate;
