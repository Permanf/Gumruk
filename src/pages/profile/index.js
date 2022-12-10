import { useRouter } from "next/router";
import {
  TextInput,
  PasswordInput,
  Button,
  Center,
  SegmentedControl,
  Box,
} from "@mantine/core";
import { post } from "../../store/middlewares/index";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
// import InputMask from "react-input-mask";
import {
  IconLock,
  IconMail,
  IconCalendar,
  // IconLock,
  IconUser,
} from "@tabler/icons";
// import { useViewportSize } from "@mantine/hooks";
import { DatePicker } from "@mantine/dates";
import { useEffect, useReducer, useState } from "react";
import LayoutProfile from "../../components/Profile/Layout";
import { getToken } from "../../store/selectors/auth";
import { showNotification } from "@mantine/notifications";
import { userData } from "../../store/actions/auth";

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
  const [tabs, setTabs] = useState("info");
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const token = useSelector(getToken);
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
        .nullable()
        .max(35, "maxsimum 35 simbol bolmaly"),
      phone: Yup.string()
        .required("Telefon nomer bolmaly")
        .min(8, "minimum 8 simbol bolmaly")
        .max(8, "mixsimum 8 simbol bolmaly")
        .matches(
          /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
          "Dine san bolmaly!"
        ),
      birthday: Yup.string().required("Doglan senaniz bolmaly"),
      old_password: Yup.string()
        .min(6, "minimum 6 simbol bolmaly")
        .max(50, "maxsimum 50 simbol bolmaly"),
      new_password: Yup.string()
        .min(6, "minimum 6 simbol bolmaly")
        .max(50, "maxsimum 50 simbol bolmaly"),
      new_password_confirmation: Yup.string()
        .min(6, "minimum 6 simbol bolmaly")
        .max(50, "maxsimum 50 simbol bolmaly"),
    });
  const {
    handleSubmit,
    formState: { errors },
    setError,
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
      setValue(
        "phone",
        user?.phone?.length > 8 ? user?.phone?.substr(4, 10) : user?.phone
      );
      // setValue("password", user?.password);
      // setValue("passport_number", user?.passport_number);
      setValue("birthday", user?.birthday);
    }
  }, [user]);

  const onSubmit = (data) => {
    // console.log(data);
    setState({ type: "SET_LOADING", payload: true });
    function convert(str) {
      var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("/");
    }
    data.birthday = convert(data.birthday);
    dispatch(
      post({
        url: `${tabs == "info" ? "user/update" : "user/reset-password"}`,
        data,
        token,
        action: (response) => {
          // console.log(response, "---res");
          setState({ type: "SET_LOADING", payload: false });
          if (response?.data?.success) {
            if (tabs == "info") {
              dispatch(userData(data));
            } else {
              setValue("old_password", "");
              setValue("new_password", "");
              setValue("new_password_confirmation", "");
            }
            showNotification({
              color: "green",
              title: "Siz üstünlikli üýtgetdiňiz!",
              // message: "",
            });
          } else {
            console.log(response?.data?.data, "---error");
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
  };
  return (
    <LayoutProfile title="Profile">
      <form onSubmit={handleSubmit(onSubmit)} className="p-10">
        <SegmentedControl
          value={tabs}
          onChange={setTabs}
          className="mb-5"
          size="sm"
          color="blue"
          data={[
            {
              value: "info",
              label: (
                <Center>
                  <IconUser size={16} />
                  <Box ml={10} mt={2}>
                    Şahsy maglumatlar
                  </Box>
                </Center>
              ),
            },
            {
              value: "password",
              label: (
                <Center>
                  <IconLock size={16} />
                  <Box ml={10} mt={2}>
                    Açar sözi uytgetmek
                  </Box>
                </Center>
              ),
            },
          ]}
        />
        {tabs == "info" ? (
          <>
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
            {user?.fathers_name == null ? null : (
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
              </>
            )}

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
                    icon={
                      <p
                        className={`${
                          errors?.phone ? "text-red-500" : "text-black"
                        } font-normal mx-2`}
                      >
                        +993
                      </p>
                    }
                    error={errors?.phone?.message}
                  />
                );
              }}
            />
          </>
        ) : (
          <>
            <h1 className="mb-3 text-lg font-semibold my-5">
              Açar sözi uytgetmek
            </h1>

            <Controller
              control={control}
              name="old_password"
              render={({ field: { onChange, onBlur, value, ref } }) => {
                return (
                  <PasswordInput
                    className={`text-sm  my-2`}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    ref={ref}
                    label="Old Password"
                    placeholder="Old password"
                    icon={<IconLock size={16} />}
                    error={errors?.password?.message}
                  />
                );
              }}
            />
            <Controller
              control={control}
              name="new_password"
              render={({ field: { onChange, onBlur, value, ref } }) => {
                return (
                  <PasswordInput
                    className={`text-sm  my-2`}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    ref={ref}
                    label="New Password"
                    placeholder="New password"
                    icon={<IconLock size={16} />}
                    error={errors?.password?.message}
                  />
                );
              }}
            />
            <Controller
              control={control}
              name="new_password_confirmation"
              render={({ field: { onChange, onBlur, value, ref } }) => {
                return (
                  <PasswordInput
                    className={`text-sm  my-2`}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    ref={ref}
                    label="New password corformation"
                    placeholder="New password confirmation"
                    icon={<IconLock size={16} />}
                    error={errors?.password?.message}
                  />
                );
              }}
            />
          </>
        )}

        <Center>
          <Button
            type="submit"
            loading={state.loading}
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
