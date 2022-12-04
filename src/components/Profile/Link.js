import {
  User,
  FileUpload,
  Logout,
  Speakerphone,
  FileCheck,
} from "tabler-icons-react";

export const links = (lang) => [
  {
    id: 1,
    name: "Профиль",
    link: "/profile",
    icon: <User size={22} className="cursor-pointer mr-2" />,
  },
  {
    id: 2,
    name: "Деклораций",
    link: "/profile/tickets",
    icon: <FileUpload size={22} className="cursor-pointer mr-2" />,
  },
  {
    id: 3,
    name: "История деклораций",
    link: "/profile/history",
    icon: <FileCheck size={22} className="cursor-pointer mr-2" />,
  },
  {
    id: 4,
    name: "Oбъявление",
    link: "/profile/announcements",
    icon: <Speakerphone size={22} className="cursor-pointer mr-2" />,
  },
  {
    id: 5,
    name: "Выйти",
    icon: <Logout size={22} className="cursor-pointer mr-2" />,
  },
];
