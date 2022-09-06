import Layout from "../../components/Layouts/Layout";
import {
  createStyles,
  Paper,
  Title,
  Text,
  TextInput,
  PasswordInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box,
} from "@mantine/core";

import { IconLock, IconMail, IconArrowLeft } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 26,
    fontWeight: 900,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  controls: {
    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column-reverse",
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      width: "100%",
      textAlign: "center",
    },
  },
}));

const Forgot = () => {
  const { classes } = useStyles();
  return (
    <Layout title="Forgot" className="bg-gray-100">
      <Container size={460} py={60}>
        <Title className={classes.title} align="center">
          Forgot your password?
        </Title>
        <Text color="dimmed" size="sm" align="center">
          Enter your email to get a reset link
        </Text>

        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
          <TextInput
            label="Your email"
            placeholder="me@something.dev"
            required
            icon={<IconMail size={16} />}
          />
          <PasswordInput
            label="Password"
            placeholder="New password"
            icon={<IconLock size={16} />}
            required
            mt="md"
          />
          <Group position="apart" mt="lg" className={classes.controls}>
            <Anchor
              href="login"
              color="dimmed"
              size="sm"
              className={classes.control}
            >
              <Center inline>
                <IconArrowLeft size={12} stroke={1.5} />
                <Box ml={5}>Back to login page</Box>
              </Center>
            </Anchor>
            <Button className={`${classes.control} bg-blue-700`}>
              Reset password
            </Button>
          </Group>
        </Paper>
      </Container>
    </Layout>
  );
};
export default Forgot;
