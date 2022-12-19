import { IconPhoneCall, IconMailForward, IconPlus } from "@tabler/icons";
import { Button } from "@mantine/core";
// import { ThemeIcon } from "@mantine/core";
import { LanguagePicker } from "../Language/Lang";
import { useSelector } from "react-redux";
import moment from "moment";
import Link from "next/link";
import { useViewportSize } from "@mantine/hooks";
import { translation } from "./translation";

const HeaderTop = () => {
  const { lang } = useSelector((state) => state.data);
  const { token } = useSelector((state) => state.auth);
  const { width } = useViewportSize();

  return (
    <div className="w-full flex justify-center bg-blue-50 sticky top-0 z-50">
      <div className="container_out flex justify-between items-center py-2 text-sm">
        <div>
          <span>{translation[lang]?.date}:</span>
          <span className="mx-2">{moment().format("HH:mm")}</span>
          <span>{moment().format("DD.MM.YYYY")}</span>
        </div>
        {width > 750 ? (
          <div className="flex">
            <div className="flex mr-10 items-center cursor-pointer">
              <IconMailForward size={20} />
              <a
                className="pl-2 font-semibold"
                href="mailto:info@terminal@.gov.tm"
              >
                info@terminal@.gov.tm
              </a>
            </div>
            <div className="flex items-center cursor-pointer">
              <IconPhoneCall size={20} />
              <a className="pl-2 font-semibold" href="tel:+99361181818">
                +993 61181818
              </a>
            </div>
          </div>
        ) : null}
        <div className="flex items-center">
          <Link href={token?.length ? `/bildiris-gosmak` : `/agza/login`}>
            <Button
              size="xs"
              className="rounded-full mr-3 border bg-blue-500 text-white"
              // leftIcon={}
            >
              <IconPlus size={14} className="mr-2" />
              {translation[lang]?.create}
            </Button>
          </Link>
          {width > 750 ? <LanguagePicker /> : null}
        </div>
      </div>
    </div>
  );
};
export default HeaderTop;
