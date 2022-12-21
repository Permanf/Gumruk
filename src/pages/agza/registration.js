import Layout from "../../components/Layouts/Layout";
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  SimpleGrid,
} from "@mantine/core";
import { post } from "../../store/middlewares/index";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
// import InputMask from "react-input-mask";
import { IconLock, IconMail, IconCalendar } from "@tabler/icons";
import { useViewportSize } from "@mantine/hooks";
import Select from "../../components/Agza/Select";
import { DatePicker } from "@mantine/dates";
import { useState, useEffect, useReducer } from "react";
import { SetCookie } from "../../utils/cookie";
import { loginSuccess } from "../../store/actions/auth";
import { useRouter } from "next/router";
import { showNotification } from "@mantine/notifications";
import { translation } from "../../components/Agza/translation";
import { getlang } from "../../store/selectors/auth";

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

const Register = () => {
  const [state, setState] = useReducer(reducer, {
    loading: false,
  });
  const lang = useSelector(getlang);
  const { width } = useViewportSize();
  const [legal, setLegal] = useState("fiziki");
  const dispatch = useDispatch();
  const router = useRouter();
  const schema = (legal) =>
    Yup.object().shape({
      email: Yup.string()
        .min(5, "Минимум 5 значений")
        .max(255, "Максимум 255 значений")
        .required("E-mail address yazmaly")
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "E-mail address bolmaly"),
      first_name:
        legal === "fiziki"
          ? Yup.string()
              .required("Adynyzy yazmaly")
              .min(3, "minimum 3 simbol bolmaly")
              .max(35, "maxsimum 35 simbol bolmaly")
          : Yup.string()
              .required("Ederanyn adyny yazmaly")
              .min(3, "minimum 3 simbol bolmaly"),

      last_name:
        legal === "fiziki"
          ? Yup.string()
              .required("Familyanyzy yazmaly")
              .min(3, "minimum 3 simbol bolmaly")
              .max(35, "maxsimum 35 simbol bolmaly")
          : Yup.string().nullable(true),
      fathers_name:
        legal === "fiziki"
          ? Yup.string().max(35, "maxsimum 35 simbol bolmaly")
          : Yup.string().nullable(true),
      phone: Yup.string()
        .required("Telefon nomer bolmaly")
        .min(8, "minimum 8 simbol bolmaly")
        .max(8, "mixsimum 8 simbol bolmaly")
        .matches(
          /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
          "Dine san bolmaly!"
        ),
      password: Yup.string()
        .min(6, "minimum 6 simbol bolmaly")
        .max(50, "maxsimum 50 simbol bolmaly")
        .required("acar soz yazmaly"),
      password_confirmation: Yup.string()
        .min(6, "minimum 6 simbol bolmaly")
        .max(50, "maxsimum 50 simbol bolmaly")
        .required("acar soz yazmaly"),
    });
  const {
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    control,
  } = useForm({
    resolver: yupResolver(schema(legal)),
  });
  // const sene =
  //   "Wed Sep 21 2022 00:00:00 GMT+0500 (Узбекистан, стандартное время)";
  const errorData = {};
  const onSubmit = (data) => {
    if (data.password === data.password_confirmation) {
      setState({ type: "SET_LOADING", payload: true });
      data = { ...data, legal_entity: legal == "fiziki" ? 1 : 0 };
      data.phone = `+993${data.phone}`;
      // console.log(data);
      dispatch(
        post({
          url: `register`,
          data,
          action: (response) => {
            // console.log(response, "---res");
            setState({ type: "SET_LOADING", payload: false });
            if (response?.data?.success) {
              SetCookie("token", response?.data?.data?.token);
              dispatch(loginSuccess(response?.data?.data?.token));
              router.push("/");
            } else {
              // console.log(response?.data?.data, "---error");
              Object.keys(response?.data?.data)?.forEach((key) => {
                setError(key, {
                  type: "manual",
                  message: response?.data?.data[key][0],
                });
              });
            }
          },
        })
      );
    } else {
      // console.log("den dal");
      showNotification({
        color: "red",
        title: translation[lang]?.not_password,
        // message: "",
      });
    }
  };
  useEffect(() => {
    setValue("email", "");
    setValue("first_name", "");
    setValue("last_name", "");
    setValue("fathers_name", "");
    setValue("phone", "");
    setValue("password", "");
    setValue("password_confirmation", "");
  }, [legal]);

  return (
    <Layout title="Registration" className="bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container size={820} py={60} className="transition-all duration-300">
          <Title align="center">{translation[lang]?.registration}</Title>
          <Text color="dimmed" size="sm" align="center" mt={5}>
            {translation[lang]?.please_registration}
          </Text>

          <Paper
            withBorder
            shadow="md"
            p={width > 600 ? 30 : 15}
            mt={30}
            radius="md"
          >
            <Select legal={legal} setLegal={setLegal} />
            <SimpleGrid
              cols={2}
              spacing="lg"
              breakpoints={[{ maxWidth: 755, cols: 1, spacing: "sm" }]}
            >
              <Controller
                control={control}
                name="first_name"
                render={({ field: { onChange, onBlur, value, ref } }) => {
                  return (
                    <TextInput
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      ref={ref}
                      label={
                        legal == "fiziki"
                          ? translation[lang]?.name
                          : translation[lang]?.company_name
                      }
                      placeholder={
                        legal == "fiziki"
                          ? translation[lang]?.name
                          : translation[lang]?.company_name
                      }
                      error={errors?.first_name?.message}
                    />
                  );
                }}
              />

              {legal == "fiziki" ? (
                <>
                  <Controller
                    control={control}
                    name="last_name"
                    render={({ field: { onChange, onBlur, value, ref } }) => {
                      return (
                        <TextInput
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                          ref={ref}
                          label={translation[lang]?.last_name}
                          placeholder={translation[lang]?.last_name}
                          error={errors?.last_name?.message}
                        />
                      );
                    }}
                  />

                  <Controller
                    control={control}
                    name="fathers_name"
                    render={({ field: { onChange, onBlur, value, ref } }) => {
                      return (
                        <TextInput
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                          ref={ref}
                          label={translation[lang]?.fathers_name}
                          placeholder={translation[lang]?.fathers_name}
                          error={errors?.fathers_name?.message}
                        />
                      );
                    }}
                  />
                </>
              ) : null}

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
                      label={translation[lang]?.email}
                      placeholder="some@someone.dev"
                      icon={<IconMail size={16} />}
                      error={errors?.email?.message}
                    />
                  );
                }}
              />
              <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, onBlur, value, ref } }) => {
                  return (
                    <TextInput
                      className={`text-sm `}
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
                          } font-normal mt-0  text-sm mx-2`}
                        >
                          +993
                        </p>
                      }
                      // component={InputMask}
                      // mask="+993 (69) 99-99-99"
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
                      error={errors?.password?.message}
                    />
                  );
                }}
              />
              <Controller
                control={control}
                name="password_confirmation"
                render={({ field: { onChange, onBlur, value, ref } }) => {
                  return (
                    <PasswordInput
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      ref={ref}
                      label={translation[lang]?.repeat_password}
                      placeholder={translation[lang]?.repeat_password}
                      icon={<IconLock size={16} />}
                      error={errors?.password_confirmation?.message}
                    />
                  );
                }}
              />
            </SimpleGrid>
            <div className="w-full sm:w-3/5 mt-5">
              <div className="flex flex-col sm:flex-row sm:items-center my-3">
                <Button
                  type="submit"
                  loading={state.loading}
                  className="bg-blue-600 mr-4 w-full sm:w-56"
                >
                  {translation[lang]?.create_account}
                </Button>
                <Text color="dimmed" size="sm" className="mt-4 sm:mt-0">
                  {translation[lang]?.have_account}

                  <Anchor
                    href="login"
                    size="sm"
                    // onClick={(event) => event.preventDefault()}
                  >
                    {translation[lang]?.log_in}
                  </Anchor>
                </Text>
              </div>
              <div>
                <Text color="dimmed" size="sm">
                  {translation[lang]?.some_text1}

                  <Anchor
                    href="#"
                    size="sm"
                    // onClick={(event) => event.preventDefault()}
                  >
                    {translation[lang]?.some_text2}
                  </Anchor>
                  {translation[lang]?.some_text3}

                  <Anchor
                    href="#"
                    size="sm"
                    // onClick={(event) => event.preventDefault()}
                  >
                    {translation[lang]?.some_text4}
                  </Anchor>
                </Text>
              </div>
            </div>
          </Paper>
        </Container>
      </form>
    </Layout>
  );
};

export default Register;
