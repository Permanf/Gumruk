import { useRouter } from "next/router";
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
  Center,
} from "@mantine/core";
import { post } from "../../store/middlewares/index";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import InputMask from "react-input-mask";
import { IconLock, IconMail, IconCalendar } from "@tabler/icons";
import { useViewportSize } from "@mantine/hooks";
import { DatePicker } from "@mantine/dates";
import { useState, useEffect, useReducer } from "react";
import LayoutProfile from "../../components/Profile/Layout";

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

const Settings = () => {
  const [state, setState] = useReducer(reducer, {
    loading: false,
  });
  // const { width } = useViewportSize();
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  // console.log(user);
  const schema = () =>
    Yup.object().shape({
      email: Yup.string()
        .required("E-mail address yazmaly")
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "E-mail address bolmaly"),
      first_name: Yup.string()
        .required("Adynyzy yazmaly")
        .min(3, "minimum 3 simbol bolmaly")
        .max(35, "maxsimum 35 simbol bolmaly"),

      last_name: Yup.string()
        .required("Familyanyzy yazmaly")
        .min(3, "minimum 3 simbol bolmaly")
        .max(35, "maxsimum 35 simbol bolmaly"),
      fathers_name: Yup.string()
        .required("Atanyzyn adyny yazmaly")
        .min(3, "minimum 3 simbol bolmaly")
        .max(35, "maxsimum 35 simbol bolmaly"),
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
      birthday: Yup.string().required("Doglan senaniz bolmaly"),
      passport_number: Yup.string()
        .required("Seria nomer yazmaly")
        .min(10, "minimum 10 simbol bolmaly")
        .max(11, "maxsimum 11 simbol bolmaly"),
    });
  const {
    handleSubmit,
    formState: { errors },
    // setError,
    setValue,
    control,
  } = useForm({
    resolver: yupResolver(schema()),
  });
  useEffect(() => {
    if (user?.id) {
      setValue("first_name", user?.first_name);
      setValue("last_name", user?.last_name);
      setValue("fathers_name", user?.fathers_name);
      setValue("email", user?.email);
      setValue("phone", user?.phone);
      setValue("password", user?.password);
      setValue("passport_number", user?.passport_number);
      setValue("birthday", user?.birthday);
      // setValue("fathers_name", user?.fathers_name);
    }
  }, [user]);
  // const sene =
  //   "Wed Sep 21 2022 00:00:00 GMT+0500 (Узбекистан, стандартное время)";

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <LayoutProfile title="Profile">
      <form onSubmit={handleSubmit(onSubmit)} className="p-10">
        <h1 className="mb-5 text-lg font-semibold">Şahsy maglumatlar</h1>
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
                label={"Имя"}
                placeholder={"Имя"}
                error={errors?.first_name?.message}
                className="my-2"
              />
            );
          }}
        />
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
                className="my-2"
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
                className="my-2"
              />
            );
          }}
        />

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
                className="my-2"
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
                className={`text-sm  my-2`}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                ref={ref}
                label="Телефон"
                placeholder="Телефон"
                type="tel"
                // icon={
                //   <p
                //     className={`${
                //       errors?.phone ? "text-red-500" : "text-black"
                //     } font-normal mx-2`}
                //   >
                //     +993
                //   </p>
                // }
                error={errors?.phone?.message}
              />
            );
          }}
        />
        <h1 className="mb-3 text-lg font-semibold my-5">Açar sözi uytgetmek</h1>

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
        <h1 className="mb-3 text-lg font-semibold my-5">
          Passport maglumatlary
        </h1>
        <Controller
          control={control}
          name="passport_number"
          render={({ field: { onChange, onBlur, value, ref } }) => {
            return (
              <TextInput
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                ref={ref}
                label="Seria nomer"
                placeholder="Seria nomer"
                error={errors?.seria?.message}
                className="my-2"
              />
            );
          }}
        />
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
        <Center>
          <Button
            type="submit"
            // loading={state.loading}
            className="bg-blue-600 mr-4 w-full sm:w-56 mt-5"
          >
            Update
          </Button>
        </Center>
      </form>
    </LayoutProfile>
  );
};

export default Settings;
