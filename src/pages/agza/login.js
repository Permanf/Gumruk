import Layout from "../../components/Layouts/Layout";
import {
  TextInput,
  PasswordInput,
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
import { getlang } from "../../store/selectors/auth";

function reducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_ERROR_MESSAGE":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

const Login = () => {
  const [state, setState] = useReducer(reducer, {
    loading: false,
    error: {},
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
  const lang = useSelector(getlang);
  // console.log(lang);
  // console.log(token);
  useEffect(() => {
    if (token) {
      router.push("/");
    } else {
      router.push("/agza/login");
    }
  }, [token]);

  const onSubmit = (data) => {
    // console.log(data);
    data.phone = `+993${data.phone}`;
    setState({ type: "SET_LOADING", payload: true });
    setState({ type: "SET_ERROR_MESSAGE", payload: {} });
    dispatch(
      post({
        url: `login`,
        data,
        action: (response) => {
          setState({ type: "SET_LOADING", payload: false });
          console.log(response.data);
          if (response?.data?.success) {
            SetCookie("token", response?.data?.data?.token);
            dispatch(loginSuccess(response?.data?.data?.token));
            router.push("/");
          } else {
            console.log(response?.data?.data?.message);

            setState({
              type: "SET_ERROR_MESSAGE",
              payload: response?.data?.data?.message,
            });
            //   Object.keys(response.message)?.forEach(key =>{
            //     setError(key, {
            //         type: "manual",
            //         message: response.message[key],
            //     })
            // });
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
            {state.error?.ru?.length ? (
              <div className="bg-red-100 p-2 py-3 mb-4 rounded-md flex justify-center transition-all ease-out duration-1000">
                <span className="text-red-500 text-sm">{state.error.ru}</span>
              </div>
            ) : null}

            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, onBlur, value, ref } }) => {
                return (
                  <TextInput
                    className={`text-sm`}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    ref={ref}
                    label="Телефон"
                    placeholder="Телефон"
                    type="tel"
                    icon={
                      <p
                        className={`${
                          errors?.phone ? "text-red-500" : "text-black"
                        } font-normal text-sm mx-2 mt-0.5`}
                      >
                        +993
                      </p>
                    }
                    error={errors?.phone?.message}
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
  // email: Yup.string()
  //   .min(5, "Минимум 5 значений")
  //   .max(255, "Максимум 255 значений")
  //   .required("E-mail address yazmaly")
  //   .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "E-mail address bolmaly"),
  phone: Yup.string()
    .required("Telefon nomer bolmaly")
    .min(8, "minimum 8 simbol bolmaly")
    .max(8, "mixsimum 8 simbol bolmaly")
    .matches(
      /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
      "Dine san bolmaly!"
    ),
  password: Yup.string()
    .min(5, "Минимум 5 значений")
    .max(50, "Максимум 50 значений")
    .required("Пароль обязателен"),
});
export default Login;
