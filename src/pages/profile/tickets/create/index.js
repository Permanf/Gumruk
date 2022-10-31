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
      // email: Yup.string()
      //   .required("E-mail address yazmaly")
      //   .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "E-mail address bolmaly"),
      // first_name: Yup.string()
      //   .required("Adynyzy yazmaly")
      //   .min(3, "minimum 3 simbol bolmaly")
      //   .max(35, "maxsimum 35 simbol bolmaly"),
      // last_name: Yup.string()
      //   .required("Familyanyzy yazmaly")
      //   .min(3, "minimum 3 simbol bolmaly")
      //   .max(35, "maxsimum 35 simbol bolmaly"),
      // fathers_name: Yup.string()
      //   .required("Atanyzyn adyny yazmaly")
      //   .min(3, "minimum 3 simbol bolmaly")
      //   .max(35, "maxsimum 35 simbol bolmaly"),
      // phone: Yup.string()
      //   .required("Telefon nomer bolmaly")
      //   .min(8, "minimum 8 simbol bolmaly")
      //   .max(8, "mixsimum 8 simbol bolmaly")
      //   .matches(
      //     /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
      //     "Dine san bolmaly!"
      //   ),
      // password: Yup.string()
      //   .min(6, "minimum 6 simbol bolmaly")
      //   .max(50, "maxsimum 50 simbol bolmaly")
      //   .required("acar soz yazmaly"),
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
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <LayoutProfile title="Bilet doretmek">
      <h1 className="p-4 font-semibold text-xl">Ticket create</h1>
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
                  label={"Iberiji/Export ediji"}
                  placeholder={"Iberiji/Export ediji"}
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
                  label="Iberiji/Export ediji nomeri"
                  placeholder="Iberiji/Export ediji nomeri"
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
                  label="Alyjy"
                  placeholder="Alyjy"
                  error={errors?.fathers_name?.message}
                />
              );
            }}
          />

          <Controller
            control={control}
            name="alyjy"
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <TextInput
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  label="Alyjynyň nomeri"
                  placeholder="Alyjynyň nomeri"
                  error={errors?.name?.message}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="alyjy"
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <TextInput
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  label="Maliýe taýdan düzgünlerşdirmäge degişli şahs"
                  placeholder="Maliýe taýdan düzgünlerşdirmäge degişli şahs"
                  error={errors?.name?.message}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="alyjy"
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <TextInput
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  label="Iberiş ýurdy"
                  placeholder="Iberiş ýurdy"
                  error={errors?.name?.message}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="alyjy"
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <TextInput
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  label="Gelip çykan ýurdy"
                  placeholder="Gelip çykan ýurdy"
                  error={errors?.name?.message}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="alyjy"
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <TextInput
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  label="Gelip çykan ýurdyň nomeri"
                  placeholder="Gelip çykan ýurdyň nomeri"
                  error={errors?.name?.message}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="alyjy"
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <TextInput
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  label="Belgileri we mukdary"
                  placeholder="Belgileri we mukdary"
                  error={errors?.name?.message}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="alyjy"
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <TextInput
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  label="Konteýnerleriň belgileri"
                  placeholder="Konteýnerleriň belgileri"
                  error={errors?.name?.message}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="alyjy"
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <TextInput
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  label="Möçberi we tapawutlandyryş aýratynlyklary"
                  placeholder="Iberiş ýurdy"
                  error={errors?.name?.message}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="alyjy"
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <TextInput
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  label="Harydyň kody"
                  placeholder="Harydyň kody"
                  error={errors?.name?.message}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="alyjy"
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <TextInput
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  label="Gelip çykan ýurdy"
                  placeholder="Gelip çykan ýurdy"
                  error={errors?.name?.message}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="alyjy"
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <TextInput
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  label="Brutto agramy kg"
                  placeholder="Brutto agramy kg"
                  error={errors?.name?.message}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="alyjy"
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <TextInput
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  label="Netto agramy"
                  placeholder="Netto agramy"
                  error={errors?.name?.message}
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
            Save
          </Button>
        </Center>
      </form>
    </LayoutProfile>
  );
};

export default Information;
