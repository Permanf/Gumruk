import { useRouter } from "next/router";
import LayoutProfile from "../../../../components/Profile/Layout";
import Step from "../../../../components/Profile/Stepper";

const DeclarationUpdate = () => {
  const router = useRouter();
  // console.log(router.query.slug);
  return (
    <LayoutProfile title="Declaration">
      <h1 className="p-4 font-semibold text-xl mb-3">Declaration update</h1>
      <Step update_id={router?.query?.slug} />
    </LayoutProfile>
  );
};

export default DeclarationUpdate;
