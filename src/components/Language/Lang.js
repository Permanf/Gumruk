import { useState, useEffect } from "react";
import {
  createStyles,
  UnstyledButton,
  Menu,
  Image,
  Group,
} from "@mantine/core";
import { useDispatch } from "react-redux";
import { setHelperData } from "../../store/actions/data";
import { IconChevronDown } from "@tabler/icons";
import ru from "../../assets/Lang/ru.png";
import tm from "../../assets/Lang/tm.png";
import en from "../../assets/Lang/en.png";

const data = [
  { label: "Russian", image: ru.src },
  { label: "Turkmen", image: tm.src },
  { label: "English", image: en.src },
];
const useStyles = createStyles((theme, { opened }) => ({
  control: {
    width: 150,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 15px",
    borderRadius: theme.radius.md,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2]
    }`,
    transition: "background-color 150ms ease",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[opened ? 5 : 6]
        : opened
        ? theme.colors.gray[0]
        : theme.white,

    // "&:hover": {
    //   backgroundColor:
    //     theme.colorScheme === "dark"
    //       ? theme.colors.dark[5]
    //       : theme.colors.gray[0],
    // },
  },

  label: {
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,
  },

  icon: {
    transition: "transform 150ms ease",
    transform: opened ? "rotate(180deg)" : "rotate(0deg)",
  },
}));

export function LanguagePicker() {
  const dispatch = useDispatch();
  const [opened, setOpened] = useState(false);
  const { classes } = useStyles({ opened });

  const lang = localStorage.getItem("lang");
  useEffect(() => {
    if (lang == null) {
      localStorage.setItem("lang", "Russian");
      dispatch(setHelperData({ lang: "Russian" }));
    } else {
      dispatch(setHelperData({ lang: lang }));
    }
  }, []);

  const [selected, setSelected] = useState(
    lang == "Turkmen" ? data[1] : lang == "English" ? data[2] : data[0]
  );

  const items = data.map((item) => (
    <Menu.Item
      icon={<Image src={item?.image} alt="image" width={18} height={13} />}
      onClick={() => {
        setSelected(item);
        localStorage.setItem("lang", item.label);
        dispatch(setHelperData({ lang: item.label }));
      }}
      key={item?.label}
    >
      {item?.label}
    </Menu.Item>
  ));

  return (
    <Menu
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
      width="target"
      className="bg-none border-none hover:bg-none"
    >
      <Menu.Target>
        <UnstyledButton className={classes.control}>
          <Group spacing="xs">
            <Image src={selected?.image} alt="image" width={22} height={15} />
            <span className={classes.label}>{selected?.label}</span>
          </Group>
          <IconChevronDown size={16} className={classes.icon} stroke={1.5} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>{items}</Menu.Dropdown>
    </Menu>
  );
}
