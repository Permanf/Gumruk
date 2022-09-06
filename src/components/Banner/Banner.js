import {
  createStyles,
  Image,
  Container,
  Title,
  Text,
  Button,
  SimpleGrid,
} from "@mantine/core";
import image from "../../assets/Banner/Group.svg";

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
      fontSize: 32,
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

  return (
    <div className="w-full flex justify-center bg_gray">
      <div className={` container_out blue1 my-10 rounded-xl px-10`}>
        <SimpleGrid
          spacing={80}
          cols={2}
          breakpoints={[{ maxWidth: "sm", cols: 1, spacing: 40 }]}
        >
          <Image src={image} alt="image" className={classes.mobileImage} />
          <div className="flex flex-col justify-center ">
            <Title className={`${classes.title} text-white`}>
              ГОСУДАРСТВЕННАЯ ТАМОЖЕННАЯ СЛУЖБА ТУРКМЕНИСТАНА
            </Title>
            <Text color="dimmed" size="lg">
              Посмотрите на новую систему декларирования поближе
            </Text>
            <Button size="md" mt="xl" className="bg-blue-700 w-36">
              Подробнее
            </Button>
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
