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
  SimpleGrid,
  InputBase,
} from "@mantine/core";
import InputMask from "react-input-mask";
import { IconLock, IconMail } from "@tabler/icons";

const Registr = () => {
  return (
    <Layout title="Registration" className="bg-gray-100">
      <Container size={820} py={60}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Регистрация
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Для входа в кабинет, пожалуйста, зарегистрируйтесь
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <SimpleGrid
            cols={2}
            spacing="lg"
            // breakpoints={[
            //   { maxWidth: 980, cols: 3, spacing: "md" },
            //   { maxWidth: 755, cols: 2, spacing: "sm" },
            //   { maxWidth: 600, cols: 1, spacing: "sm" },
            // ]}
          >
            <TextInput label="Фамилия" placeholder="Фамилия" />
            <TextInput label="Имя" placeholder="Имя" />
            <TextInput label="Отчество" placeholder="Отчество" />
            <TextInput
              label="Название компинии"
              placeholder="Название компинии"
            />
            <TextInput label="ИНН" placeholder="ИНН" />
            <InputBase
              label="Телефон"
              placeholder="Телефон"
              component={InputMask}
              mask="+993 (69) 99-99-99"
            />
            <PasswordInput
              label="Пароль"
              placeholder="Пароль"
              icon={<IconLock size={16} />}
              required
            />
            <PasswordInput
              label="подтвердите пароль"
              placeholder="подтвердите пароль"
              icon={<IconLock size={16} />}
              required
            />
            <Button className="bg-blue-700" fullWidth mt="xl">
              Создать аккаунт
            </Button>
            <div className="flex items-center">
              <Text color="dimmed" size="sm">
                Есть аккаунт?
                <Anchor
                  href="login"
                  size="sm"
                  // onClick={(event) => event.preventDefault()}
                >
                  Войти!
                </Anchor>
              </Text>
            </div>
            <div>
              <Text color="dimmed" size="sm">
                Нажимая Создать аккаунт, вы даете согласие на обработку данных в
                соответствии с
                <Anchor
                  href="#"
                  size="sm"
                  // onClick={(event) => event.preventDefault()}
                >
                  Политикой обработки информации
                </Anchor>
                и принимаете
                <Anchor
                  href="#"
                  size="sm"
                  // onClick={(event) => event.preventDefault()}
                >
                  Правила оказания услуг
                </Anchor>
              </Text>
            </div>
          </SimpleGrid>
        </Paper>
      </Container>
    </Layout>
  );
};
export default Registr;
