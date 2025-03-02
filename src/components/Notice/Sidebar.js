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
import { LinksGroup } from "./NavbarLinksGroup";
import { useViewportSize } from "@mantine/hooks";
import SkeletonsSide from "./SkeletonsSide";
import { RangePrice } from "./RangePrice";
import { useRouter } from "next/router";
import { useWindowScroll } from "@mantine/hooks";
import { useSelector } from "react-redux";
import { getlang } from "../../store/selectors/auth";
import { translation } from "./translation";

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
    // height: "900px",
  },

  footer: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

export function Sidebar({ state, setState, query, device }) {
  const lang = useSelector(getlang);
  const { width } = useViewportSize();
  const [scroll, scrollTo] = useWindowScroll();
  const router = useRouter();
  const handleRoute = (elements) => {
    // console.log('Elements -> ', elements, 'Query -> ',{ ...query, ...elements});
    router.push({
      pathname: "/bildirisler",
      query: { ...query, ...elements },
    });
    scrollTo({ y: 0 });
  };
  const { classes } = useStyles();
  const links = state.sidebar_data.categories?.map((item) => (
    <LinksGroup
      category={item}
      key={item.id}
      state={state}
      setState={setState}
      query={query}
    />
  ));

  return (
    <Navbar
      height={1000}
      p="md"
      className={`${classes.navbar} ${
        device == "mobile"
          ? `flex w-full mb-5`
          : `hidden lg:flex w-1/4 rounded-xl shadow-lg`
      } flex-col`}
    >
      <Navbar.Section className={classes.header}>
        <Group position="apart">
          <h1 className="text-xl font-semibold">
            {translation[lang]?.all_category}
          </h1>
        </Group>
      </Navbar.Section>

      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        {state.sidebar_loading ? (
          <SkeletonsSide />
        ) : (
          <div className={`${classes.linksInner}`}>{links}</div>
        )}
      </Navbar.Section>
      <h1 className="text-xl font-semibold my-3 pl-4">
        {translation[lang]?.region}
      </h1>
      <hr />
      {state.sidebar_loading ? (
        <SkeletonsSide />
      ) : (
        <div className="mt-4 px-4 font-semibold">
          {state.sidebar_data.locations?.map((location) => {
            return (
              <Checkbox
                onChange={(event) => {
                  event.preventDefault();
                  let query_locations = query?.locations
                    ? query?.locations
                    : "";
                  // console.log(location?.id);
                  if (query.locations?.includes(location.id)) {
                    handleRoute({
                      locations: query_locations
                        ?.split(",")
                        ?.filter((item) => item != location?.id)
                        ?.join(","),
                      page: 1,
                    });
                  } else {
                    handleRoute({
                      locations: query_locations + "," + location?.id,
                      page: 1,
                    });
                  }
                }}
                checked={
                  query?.locations?.includes(location?.id) ? true : false
                }
                key={location?.id}
                label={location?.title}
                className="my-5"
              />
            );
          })}
        </div>
      )}

      <h1 className="text-xl font-semibold my-3 pl-4">
        {translation[lang]?.search}
      </h1>
      <hr className="mb-6" />
      <div className="my-5">
        <RangePrice state={state} setState={setState} query={query} />
      </div>
    </Navbar>
  );
}
