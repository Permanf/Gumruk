import {
  createStyles,
  Image,
  Container,
  Title,
  Text,
  Button,
  SimpleGrid,
} from "@mantine/core";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  title: {
    fontWeight: 700,
    fontSize: 34,
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
    height: "100px",
    width: "100px",
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
}));

export function BannerHero({ banner }) {
  const { classes } = useStyles();
  const router = useRouter();

  return (
    <div
      className={`${router.pathname == "/" ? "bannerHome" : "bg_gray"} w-full`}
    >
      <Container className={`${classes.root}`}>
        <SimpleGrid
          spacing={80}
          cols={2}
          breakpoints={[{ maxWidth: "sm", cols: 1, spacing: 40 }]}
        >
          <Image
            src={banner.image}
            alt="image"
            className={classes.mobileImage}
          />
          <div>
            <Title
              className={`${classes.title} ${
                router.pathname == "/" ? "text-white" : ""
              }`}
            >
              {banner?.title}
            </Title>
            <Text color="dimmed" size="lg">
              {banner?.description}
            </Text>
            {banner?.button ? (
              <Button
                // variant="outline"
                size="md"
                mt="xl"
                className={` bg-blue-700`}
              >
                {banner?.button}
              </Button>
            ) : null}
            {banner?.info ? (
              <div className="flex justify-between mt-7 mb-3">
                {banner?.info?.map((item) => {
                  return (
                    <div
                      key={`${item?.id}`}
                      className="flex flex-col items-center mx-3"
                    >
                      <p className="rounded-full bg-blue-700 text-white font-medium text-xl w-20 h-20 flex justify-center items-center">
                        {item.qty}
                      </p>
                      <span className="text-xs font-medium text-center mt-2">
                        {item.description}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
          <div
            // className="bg-yellow-400"
            style={{
              backgroundImage: `url(${banner?.image?.src})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              width: `${banner.width}`,
              height: `${banner.height}`,
            }}
          >
            {/* <Image src={banner.image.src} className={classes.desktopImage} /> */}
          </div>
        </SimpleGrid>
      </Container>
    </div>
  );
}
