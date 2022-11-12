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
import { post } from "../../store/middlewares/index";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import InputMask from "react-input-mask";
import { IconLock, IconMail, IconCalendar } from "@tabler/icons";
import { useViewportSize } from "@mantine/hooks";
import Select from "../../components/Agza/Select";
import { DatePicker } from "@mantine/dates";
import { useState, useEffect, useReducer } from "react";
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

const Register = () => {
  const [state, setState] = useReducer(reducer, {
    loading: false,
  });
  const { width } = useViewportSize();
  const [legal, setLegal] = useState("fiziki");
  const dispatch = useDispatch();
  const router = useRouter();
  const schema = (legal) =>
    Yup.object().shape({
      email: Yup.string()
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
          ? Yup.string()
              .required("Atanyzyn adyny yazmaly")
              .min(3, "minimum 3 simbol bolmaly")
              .max(35, "maxsimum 35 simbol bolmaly")
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
      birthday:
        legal === "fiziki"
          ? Yup.string().required("Doglan senaniz bolmaly")
          : Yup.string().nullable(true),
    });
  const {
    handleSubmit,
    formState: { errors },
    // setError,
    setValue,
    control,
  } = useForm({
    resolver: yupResolver(schema(legal)),
  });
  // const sene =
  //   "Wed Sep 21 2022 00:00:00 GMT+0500 (Узбекистан, стандартное время)";

  const onSubmit = (data) => {
    setState({ type: "SET_LOADING", payload: true });
    data = { ...data, legal_entity: legal == "fiziki" ? 0 : 1 };
    data.phone = `+993${data.phone}`;
    function convert(str) {
      var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("/");
    }
    data.birthday = data.legal_entity == 1 ? "" : convert(data.birthday);
    console.log(data);
    dispatch(
      post({
        url: `register`,
        data,
        action: (response) => {
          console.log(response?.data);
          setState({ type: "SET_LOADING", payload: false });
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
  useEffect(() => {
    setValue("email", "");
    setValue("first_name", "");
    setValue("last_name", "");
    setValue("fathers_name", "");
    setValue("phone", "");
    setValue("password", "");
    setValue("password_confirmation", "");
    setValue("birthday", "");
  }, [legal]);

  // const onSubmit = (data) => {
  //   // setState({ type: "SET_LOADING", payload: true });
  //   dispatch(
  //     post({
  //       url: `/api/register`,
  //       data,
  //       action: (response) => {
  //         console.log(response);
  //         // setState({ type: "SET_LOADING", payload: false });
  //         // if (response.success) {
  //         //   SetCookie("refresh_token", response.data.refresh_token);
  //         //   dispatch(loginSuccess(response.data));
  //         // } else {
  //         //   console.log(response);
  //         //   if (response.message) {
  //         //     Object.keys(response.message)?.forEach((key) => {
  //         //       setError(key, {
  //         //         type: "manual",
  //         //         message: response.message[key],
  //         //       });
  //         //     });
  //         //   } else {
  //         //     // toast.error('Operation Not successfull')
  //         //   }
  //         //   if (response?.message?.user?.length > 0) {
  //         //     showNotification({
  //         //       color: "red",
  //         //       message: "User not founded",
  //         //     });
  //         //   }
  //         // }
  //       },
  //       // token: "",
  //     })
  //   );
  // };

  return (
    <Layout title="Registration" className="bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container size={820} py={60} className="transition-all duration-300">
          <Title align="center">Регистрация</Title>
          <Text color="dimmed" size="sm" align="center" mt={5}>
            Для входа в кабинет, пожалуйста, зарегистрируйтесь
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
                      label={legal == "fiziki" ? "Имя" : "Edara"}
                      placeholder={legal == "fiziki" ? "Имя" : "Edaranyn ady"}
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
                          label="Фамилия"
                          placeholder="Фамилия"
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
                          label="Отчество"
                          placeholder="Отчество"
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
                name="phone"
                render={({ field: { onChange, onBlur, value, ref } }) => {
                  return (
                    <TextInput
                      className={`text-sm  `}
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
                          } font-normal mx-2`}
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
              {legal == "fiziki" ? (
                <Controller
                  control={control}
                  name="birthday"
                  render={({ field: { onChange, onBlur, value, ref } }) => {
                    return (
                      <DatePicker
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        ref={ref}
                        placeholder="Birthday"
                        label="Date"
                        inputFormat="YYYY/MM/DD"
                        // labelFormat="YYYY/MM"
                        // defaultValue={new Date()}
                        icon={<IconCalendar size={16} />}
                        error={errors?.birthday?.message}
                      />
                    );
                  }}
                />
              ) : null}
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
                      label="Password confirmation"
                      placeholder="Repeat password"
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
                  Создать аккаунт
                </Button>
                <Text color="dimmed" size="sm" className="mt-4 sm:mt-0">
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
                  Нажимая Создать аккаунт, вы даете согласие на обработку данных
                  в соответствии с
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
            </div>
          </Paper>
        </Container>
      </form>
    </Layout>
  );
};

// const schema = Yup.object().shape({
//   phone: Yup.string()
//     .min(8, "Минимум 8 значений")
//     .max(8, "Максимум 8 значений")
//     .required("Номер телефона обязателен")
//     .matches(
//       /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
//       "Должен быть номер телефона"
//     ),
//   password: Yup.string()
//     .min(8, "Минимум 8 значений")
//     .max(50, "Максимум 50 значений")
//     .required("Пароль обязателен"),
// });

export default Register;
