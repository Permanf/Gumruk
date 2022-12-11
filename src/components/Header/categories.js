import { category } from "./translation";

export const categories = (lang) => [
  {
    id: 0,
    name: category[lang]?.portlar,
    link: "/portlar",
  },

  {
    id: 1,
    name: category[lang]?.service,
    link: "/hyzmatlar",
  },
  {
    id: 1,
    name: category[lang]?.notice,
    link: "/bildirisler?page=1",
  },

  {
    id: 2,
    name: category[lang]?.news,
    link: "/habarlar",
  },
  {
    id: 3,
    name: category[lang]?.about_us,
    link: "/biz-barada",
  },
  {
    id: 4,
    name: category[lang]?.contact,
    link: "/habarlasmak",
  },
];
