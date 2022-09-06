import {
  IconPhoneCall,
  IconWorld,
  IconChevronDown,
  IconChevronUp,
  IconMailForward,
} from "@tabler/icons";
// import { ThemeIcon } from "@mantine/core";
import { LanguagePicker } from "../Language/Lang";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const HeaderTop = () => {
  const { lang } = useSelector((state) => state.data);
  console.log(lang);

  return (
    <div className="w-full flex justify-center bg-blue-50">
      <div className="container_out flex justify-between items-center py-2 text-sm">
        <div>
          <span>Sene:</span>
          <span className="mx-2">{moment().format("HH:mm")}</span>
          <span>{moment().format("DD.MM.YYYY")}</span>
        </div>
        <div className="flex">
          <div className="flex mr-10 items-center cursor-pointer">
            <IconMailForward size={20} />
            <a className="pl-2 font-semibold" href="info@terminal@.gov.tm">
              info@terminal@.gov.tm
            </a>
          </div>
          <div className="flex items-center cursor-pointer">
            <IconPhoneCall size={20} />
            <a className="pl-2 font-semibold" href="+99361181818">
              +993 61181818
            </a>
          </div>
        </div>
        <LanguagePicker />
      </div>
    </div>
  );
};
export default HeaderTop;
