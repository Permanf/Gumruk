import {
  createStyles,
  Image,
  Container,
  Title,
  Text,
  Button,
  SimpleGrid,
} from "@mantine/core";
import Link from "next/link";
import { useSelector } from "react-redux";
import image from "../../assets/Banner/Group.svg";
import { getlang } from "../../store/selectors/auth";
import { translation } from "../Header/translation";

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  title: {
    fontWeight: 600,
    fontSize: 28,
    marginBottom: theme.spacing.md,
    // fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 27,
    },
  },

  control: {
    [theme.fn.smallerThan("sm")]: {
      width: "100%",
    },
  },

  mobileImage: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  desktopImage: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
}));

export function Banner() {
  const { classes } = useStyles();
  const lang = useSelector(getlang);

  return (
    <div className="w-full flex justify-center bg_gray">
      <div className={`container_banner`}>
        <SimpleGrid
          spacing={80}
          cols={2}
          breakpoints={[{ maxWidth: "sm", cols: 1, spacing: 40 }]}
          className="w-full blue1 my-10 sm:rounded-xl px-3 sm:px-10 py-5 sm:py-0"
        >
          {/* <Image src={image} alt="image" className={classes.mobileImage} /> */}
          <div className="flex flex-col justify-center ">
            <Title
              className={`${classes.title} text-white text-xl sm:text-3xl uppercase`}
            >
              {translation[lang]?.banner2_title}
            </Title>
            <Text color="dimmed" size="lg" className="text-sm sm:text-lg">
              {translation[lang]?.banner2_description}
            </Text>
            <Link href="/detail">
              <Button
                size="md"
                mt="xl"
                className="bg-blue-700 w-44 text-sm sm:text-lg"
              >
                {translation[lang]?.banner_button}
              </Button>
            </Link>
          </div>
          <div>
            <Image
              src={image.src}
              alt="image"
              className={`${classes.desktopImage}`}
            />
          </div>
        </SimpleGrid>
      </div>
    </div>
  );
}
