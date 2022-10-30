import {
  Navbar,
  Group,
  Code,
  ScrollArea,
  createStyles,
  Checkbox,
  Input,
  Button,
} from "@mantine/core";
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
  IconSearch,
} from "@tabler/icons";
import { LinksGroup } from "./NavbarLinksGroup";
import { useViewportSize } from "@mantine/hooks";

const mockdata = [
  { label: "Ulag serişdeleri", icon: IconGauge },
  {
    label: "Ýük ulag",
    icon: IconNotes,
    initiallyOpened: false,
    links: [
      { label: "Çage-sement-kerpiç daşayan", link: "/" },
      { label: "Producta-material daşayan", link: "/" },
    ],
  },
  { label: "Yorite tehnikalar", icon: IconGauge },

  // {
  //   label: "Releases",
  //   icon: IconCalendarStats,
  //   links: [
  //     { label: "Upcoming releases", link: "/" },
  //     { label: "Previous releases", link: "/" },
  //     { label: "Releases schedule", link: "/" },
  //   ],
  // },
  // { label: "Analytics", icon: IconPresentationAnalytics },
  // { label: "Contracts", icon: IconFileAnalytics },
  // { label: "Settings", icon: IconAdjustments },
  // {
  //   label: "Security",
  //   icon: IconLock,
  //   links: [
  //     { label: "Enable 2FA", link: "/" },
  //     { label: "Change password", link: "/" },
  //     { label: "Recovery codes", link: "/" },
  //   ],
  // },
];

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    // background: "red",
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

export function Sidebar() {
  const { width } = useViewportSize();
  const { classes } = useStyles();
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <Navbar
      height={800}
      p="md"
      className={`${classes.navbar} ${
        width > 1000 ? "flex" : "hidden"
      } w-1/4 flex-col rounded-xl shadow-lg sticky top-3`}
    >
      <Navbar.Section className={classes.header}>
        <Group position="apart">
          {/* <Logo width={120} /> */}
          {/* <Code sx={{ fontWeight: 700 }}></Code> */}
          <h1 className="text-xl font-semibold">Все категории</h1>
        </Group>
      </Navbar.Section>

      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{links}</div>
      </Navbar.Section>
      <h1 className="text-xl font-semibold my-3 pl-4">Регионы</h1>
      <hr />
      <div className="mt-4 px-4 font-semibold">
        <Checkbox label="Ashgabat" className="my-5" />
        <Checkbox label="Ahal" className="my-5" />
        <Checkbox label="Mary" className="my-5" />
        <Checkbox label="Dasoguz" className="my-5" />
        <Checkbox label="Lebap" className="my-5" />
        <Checkbox label="Balkan" className="my-5" />
      </div>

      <h1 className="text-xl font-semibold my-3 pl-4">Search</h1>
      <hr />
      <div className="mt-4 px-4 flex  items-center">
        <Input placeholder="min" className="my-5 w-24 " />
        <span className="mx-2">-</span>
        <Input placeholder="max" className="my-5 w-24" />
        <Button className="bg-blue-600 ml-3">
          <IconSearch size={15} />
        </Button>
      </div>

      {/* <Navbar.Section className={classes.footer}></Navbar.Section> */}
    </Navbar>
  );
}
