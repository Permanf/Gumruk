import {
  IconPhoneCall,
  IconWorld,
  IconChevronDown,
  IconChevronUp,
  IconMailForward,
  IconPlus,
} from "@tabler/icons";
import { Button } from "@mantine/core";
// import { ThemeIcon } from "@mantine/core";
import { LanguagePicker } from "../Language/Lang";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Link from "next/link";
import { useViewportSize } from "@mantine/hooks";

const HeaderTop = () => {
  const { lang } = useSelector((state) => state.data);
  const { width } = useViewportSize();

  return (
    <div className="w-full flex justify-center bg-blue-50">
      <div className="container_out flex justify-between items-center py-2 text-sm">
        <div>
          <span>Sene:</span>
          <span className="mx-2">{moment().format("HH:mm")}</span>
          <span>{moment().format("DD.MM.YYYY")}</span>
        </div>
        {width > 750 ? (
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
        ) : null}
        <div className="flex items-center">
          <Link href={`/bildiris-gosmak`}>
            <Button
              size="xs"
              className="rounded-full mr-3 border border-blue-500 text-blue-500 bg-white hover:bg-white"
              // leftIcon={}
            >
              <IconPlus size={14} className="mr-2" />
              Добавить объявление
            </Button>
          </Link>

          <LanguagePicker />
        </div>
      </div>
    </div>
  );
};
export default HeaderTop;
