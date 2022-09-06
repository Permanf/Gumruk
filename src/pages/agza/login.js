import Layout from "../../components/Layouts/Layout";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { IconLock, IconMail } from "@tabler/icons";

const Login = () => {
  return (
    <Layout title="Login" className="bg-gray-100">
      <Container size={420} py={60}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Личный кабинет
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Для входа в кабинет, пожалуйста, авторизуйтесь
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Email"
            placeholder="you@something.dev"
            required
            icon={<IconMail size={16} />}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            icon={<IconLock size={16} />}
            required
            mt="md"
          />

          <Button className="bg-blue-700" fullWidth mt="xl">
            Войти в систему
          </Button>
          <Group position="center" mt="md" className="flex flex-col">
            {/* Do not have an account yet?{" "} */}
            <Anchor href="/agza/registration" size="sm">
              Регистрация
            </Anchor>

            <Anchor
              href="/agza/forgot"
              // onClick={(event) => event.preventDefault()}
              size="sm"
            >
              Забыли пароль?
            </Anchor>
          </Group>
        </Paper>
      </Container>
    </Layout>
  );
};
export default Login;
