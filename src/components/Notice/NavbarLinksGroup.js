import { useState } from "react";
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  Text,
  UnstyledButton,
  createStyles,
} from "@mantine/core";
import { IconChevronLeft, IconChevronRight, IconPhoto } from "@tabler/icons";
import { useRouter } from "next/router";
import { useWindowScroll } from "@mantine/hooks";
import Image from "next/image";
import { useSelector } from "react-redux";
import { getlang } from "../../store/selectors/auth";

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 600,
    display: "block",
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    color:
      theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.black,
    fontSize: theme.fontSizes.sm,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : // : theme.colors.blue[1],
            null,
      color: theme.colorScheme === "dark" ? theme.white : theme.colors.blue,
      // borderLeft: "4px solid blue",

      transition: "transform 600ms ease",
    },
  },

  link: {
    fontWeight: 600,
    display: "block",
    textDecoration: "none",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    paddingLeft: 31,
    marginLeft: 30,
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.black,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : // : theme.colors.blue[4],
            null,
      color: theme.colorScheme === "dark" ? theme.white : theme.colors.blue,
    },
  },

  chevron: {
    transition: "transform 200ms ease",
  },
}));

export function LinksGroup({ category, query }) {
  const lang = useSelector(getlang);
  const router = useRouter();
  const [scroll, scrollTo] = useWindowScroll();
  const handleRoute = (elements) => {
    // console.log('Elements -> ', elements, 'Query -> ',{ ...query, ...elements});
    router.push({
      pathname: "/bildirisler",
      query: { ...query, ...elements },
    });
    scrollTo({ y: 0 });
  };
  const { classes, theme } = useStyles();
  const hasLinks = Array.isArray(category?.links);
  const [opened, setOpened] = useState(category?.initiallyOpened || false);
  const ChevronIcon = theme.dir === "ltr" ? IconChevronRight : IconChevronLeft;
  const items = (hasLinks ? category?.links : []).map((link) => (
    <Text
      component="a"
      className={`${classes.link} hover:border-l hover:border-blue-700`}
      // href={link.link}
      key={link?.label}
      onClick={(event) => {
        event.preventDefault();
        console.log(link?.link);
        // router.push(`/bildirisler?sub_category=${link.label}`);
      }}
    >
      {link?.label}
    </Text>
  ));

  return (
    <>
      <UnstyledButton
        onClick={(event) => {
          event.preventDefault();
          handleRoute({
            category: category.id,
            page: 1,
          });
        }}
        className={`${classes.control}`}
      >
        <Group position="apart" spacing={0}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {category?.icon != null ? (
              <Image
                src={`http://95.85.127.198:8080/${category?.icon}`}
                width={35}
                height={35}
                className="rounded-md"
              />
            ) : (
              <ThemeIcon variant="light" size={30}>
                <IconPhoto size={18} />
              </ThemeIcon>
            )}

            <Box
              ml="md"
              className={`${
                +query?.category == +category?.id
                  ? "text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-indigo-400"
                  : ""
              }`}
            >
              {category?.name}
            </Box>
          </Box>
          {hasLinks && (
            <ChevronIcon
              className={classes.chevron}
              size={14}
              stroke={1.5}
              style={{
                transform: opened
                  ? `rotate(${theme.dir === "rtl" ? -90 : 90}deg)`
                  : "none",
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}
