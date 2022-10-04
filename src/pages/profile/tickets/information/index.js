import LayoutProfile from "../../../../components/Profile/Layout";
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
// import { post } from "../../store/middlewares/index";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { IconLock, IconMail, IconCalendar } from "@tabler/icons";

const Information = () => {
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
    });
  const {
    handleSubmit,
    formState: { errors },
    // setError,
    setValue,
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <LayoutProfile title="Information">
      <h1 className="p-4 font-semibold">Ticket data</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SimpleGrid
          cols={2}
          className="p-4 text-sm"
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
                  label={"Имя"}
                  placeholder={"Имя"}
                  error={errors?.first_name?.message}
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
                  // icon={
                  //   <p
                  //     className={`${
                  //       errors?.phone ? "text-red-500" : "text-black"
                  //     } font-normal mx-2`}
                  //   >
                  //     +993
                  //   </p>
                  // }
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
                  label="Password"
                  placeholder="Your password"
                  icon={<IconLock size={16} />}
                  error={errors?.password?.message}
                />
              );
            }}
          />
        </SimpleGrid>
        <Center className="my-4">
          <Button
            type="submit"
            // loading={state.loading}
            className="bg-blue-600 mr-4 w-full sm:w-56"
          >
            Send
          </Button>
        </Center>
      </form>
    </LayoutProfile>
  );
};

export default Information;
