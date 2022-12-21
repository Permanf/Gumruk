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
import { translation } from "../../components/Agza/translation";

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
  const dispatch = useDispatch();
  const router = useRouter();
  const { token } = useSelector((state) => state.auth);
  const lang = useSelector(getlang);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema(lang)),
  });

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
            // console.log(response?.data?.data?.message);
            setState({
              type: "SET_ERROR_MESSAGE",
              payload: response?.data?.data?.message,
            });
          }
        },
      })
    );
  };
  return (
    <Layout title="Login" className="bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container size={420} py={60}>
          <Title align="center">{translation[lang]?.personal_account}</Title>
          <Text color="dimmed" size="sm" align="center" mt={5}>
            {translation[lang]?.please}
          </Text>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            {state.error?.ru?.length ? (
              <div className="bg-red-100 p-2 py-3 mb-4 rounded-md flex justify-center transition-all ease-out duration-1000">
                <span className="text-red-500 text-sm">
                  {lang == "English"
                    ? state?.error?.en
                    : lang == "Turkmen"
                    ? state?.error?.tm
                    : state?.error?.ru}
                </span>
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
                    label={translation[lang]?.phone}
                    placeholder={translation[lang]?.phone_last}
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
                    label={translation[lang]?.password}
                    placeholder={translation[lang]?.password}
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
              {translation[lang]?.log_in}
            </Button>
            <Group position="center" mt="md" className="flex flex-col">
              {/* Do not have an account yet?{" "} */}
              <Anchor href="/agza/registration" size="sm">
                {translation[lang]?.registration}
              </Anchor>

              <Anchor
                href="/agza/forgot"
                // onClick={(event) => event.preventDefault()}
                size="sm"
              >
                {translation[lang]?.forgot}
              </Anchor>
            </Group>
          </Paper>
        </Container>
      </form>
    </Layout>
  );
};

const schema = (lang) =>
  Yup.object().shape({
    phone: Yup.string()
      .required(translation[lang]?.required_phone)
      .min(8, translation[lang]?.min_phone)
      .max(8, translation[lang]?.max_phone)
      .matches(
        /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
        translation[lang]?.only_number
      ),
    password: Yup.string()
      .min(5, translation[lang]?.min_password)
      .max(50, translation[lang]?.max_password)
      .required(translation[lang]?.required_password),
  });
export default Login;
