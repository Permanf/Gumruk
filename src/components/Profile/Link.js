import {
  User,
  FileUpload,
  Logout,
  Speakerphone,
  FileCheck,
} from "tabler-icons-react";
import { profile_links } from "./translation";

export const links = (lang) => [
  {
    id: 1,
    name: profile_links[lang]?.profile,
    link: "/profile",
    icon: <User size={18} className="cursor-pointer" />,
  },
  {
    id: 2,
    name: profile_links[lang]?.declaration,
    link: "/profile/tickets",
    icon: <FileUpload size={18} className="cursor-pointer" />,
  },
  {
    id: 3,
    name: profile_links[lang]?.history_declaration,
    link: "/profile/history",
    icon: <FileCheck size={18} className="cursor-pointer" />,
  },
  {
    id: 4,
    name: profile_links[lang]?.announcement,
    link: "/profile/announcements",
    icon: <Speakerphone size={18} className="cursor-pointer" />,
  },
  {
    id: 5,
    name: profile_links[lang]?.logout,
    icon: <Logout size={18} className="cursor-pointer" />,
  },
];
