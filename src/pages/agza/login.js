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
import { post } from "../../store/middlewares/index";
import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconLock, IconMail } from "@tabler/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { SetCookie } from "../../utils/cookie";
import { loginSuccess } from "../../store/actions/auth";
import { useRouter } from "next/router";

function reducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}

const Login = () => {
  const [state, setState] = useReducer(reducer, {
    loading: false,
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const { token } = useSelector((state) => state.auth);
  // console.log(token);
  useEffect(() => {
    if (token) {
      router.push("/");
    } else {
      router.push("/agza/login");
    }
  }, [token]);
  // useEffect(() => {
  //   fetch("http://192.168.21.72:9000/sanctum/csrf-cookie")
  //     .then((response) => response)
  //     .then((json) => console.log(json));
  // }, []);

  const onSubmit = (data) => {
    console.log(data);
    setState({ type: "SET_LOADING", payload: true });
    dispatch(
      post({
        url: `login`,
        data,
        action: (response) => {
          setState({ type: "SET_LOADING", payload: false });
          console.log(response);
          if (response.success) {
            SetCookie("token", response?.data?.data?.token);
            dispatch(loginSuccess(response?.data?.data?.token));
            router.push("/");
          } else {
            console.log(response);
          }
        },
      })
    );
  };
  return (
    <Layout title="Login" className="bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container size={420} py={60}>
          <Title align="center">Личный кабинет</Title>
          <Text color="dimmed" size="sm" align="center" mt={5}>
            Для входа в кабинет, пожалуйста, авторизуйтесь
          </Text>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value, ref } }) => {
                return (
                  <TextInput
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    ref={ref}
                    label="Email"
                    placeholder="you@something.dev"
                    icon={<IconMail size={16} />}
                    error={errors?.email?.message}
                  />
                );
              }}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value, ref } }) => {
                return (
                  <PasswordInput
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    ref={ref}
                    label="Password"
                    placeholder="Your password"
                    icon={<IconLock size={16} />}
                    mt="md"
                    error={errors?.password?.message}
                  />
                );
              }}
            />

            <Button
              type="submit"
              className="bg-blue-700"
              fullWidth
              mt="xl"
              loading={state.loading}
            >
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
      </form>
    </Layout>
  );
};

const schema = Yup.object().shape({
  email: Yup.string()
    .min(5, "Минимум 5 значений")
    .max(255, "Максимум 255 значений")
    .required("E-mail address yazmaly")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "E-mail address bolmaly"),
  password: Yup.string()
    .min(5, "Минимум 5 значений")
    .max(50, "Максимум 50 значений")
    .required("Пароль обязателен"),
});
export default Login;
