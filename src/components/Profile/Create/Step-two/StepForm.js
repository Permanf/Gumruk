import { TextInput, Button, SimpleGrid, Select, Group } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { memo } from "react";
// import { post } from "../../store/middlewares/index";
import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { fetchData } from "../../../store/middlewares";
// import { userData } from "../../../../store/actions/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { getImageIds } from "../../../../store/selectors/auth";
// import { IconLock, IconMail, IconCalendar } from "@tabler/icons";

const StepForm = ({ data, active, setActive }) => {
  const [scroll, scrollTo] = useWindowScroll();
  const ids = useSelector(getImageIds);
  if (ids.length == 0) {
    setActive((current) => (current > 0 ? current - 1 : current));
    scrollTo({ y: 0 });
  }
  // const nextStep = () => {
  //   if (ids.length > 0) {
  //     setActive((current) => (current < 3 ? current + 1 : current));
  //     scrollTo({ y: 0 });
  //   } else {
  //     showNotification({
  //       color: "red",
  //       title: "Surat hokman bolmaly!",
  //       // message: "",
  //     });
  //   }
  // };
  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
    scrollTo({ y: 0 });
  };
  // console.log(data, "---step1");
  const data_yurt = [];
  const data_yurt_short = [];
  const data_inco_terms = [];
  const data_check_points = [];

  for (let i = 0; i < data?.countries?.length; i++) {
    data_yurt.push({
      value: data?.countries[i]?.id,
      label: data?.countries[i]?.name?.ru,
    });
    data_yurt_short.push({
      value: data?.countries[i]?.id,
      label: data?.countries[i]?.short_name,
    });
  }
  for (let i = 0; i < data?.inco_terms?.length; i++) {
    data_inco_terms.push({
      value: data?.inco_terms[i]?.id,
      label: data?.inco_terms[i]?.code,
    });
  }
  for (let i = 0; i < data?.check_points?.length; i++) {
    data_check_points.push({
      value: data?.check_points[i]?.id,
      label: data?.check_points[i]?.name?.ru,
    });
  }
  // console.log(data_yurt);
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
    setActive((current) => (current < 3 ? current + 1 : current));
    scrollTo({ y: 0 });
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SimpleGrid
          cols={2}
          className="text-sm"
          spacing="lg"
          breakpoints={[{ maxWidth: 755, cols: 1, spacing: "sm" }]}
        >
          <Controller
            control={control}
            name="type_of_declaration"
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <Select
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  label={"Type_of_declaration"}
                  placeholder={"Type_of_declaration"}
                  data={["IM", "EX"]}
                  error={errors?.type_of_declaration?.message}
                />
              );
            }}
          />

          <Controller
            control={control}
            name="exporter_name"
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <TextInput
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  label="Exporter_name"
                  placeholder="Exporter_name"
                  error={errors?.exporter_name?.message}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="exporter_code"
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <TextInput
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  label="Exporter_code"
                  placeholder="Exporter_code"
                  error={errors?.exporter_code?.message}
                />
              );
            }}
          />

          <Controller
            control={control}
            name="consignee_name"
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <TextInput
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  label="Consignee_name"
                  placeholder="Consignee_name"
                  error={errors?.consignee_name?.message}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="consignee_code"
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <TextInput
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  label="Consignee_code"
                  placeholder="Consignee_code"
                  error={errors?.consignee_code?.message}
                />
              );
            }}
          />

          <Controller
            control={control}
            name="financial_name"
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <TextInput
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  label="Financial_name"
                  placeholder="Financial_name"
                  error={errors?.financial_name?.message}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="financial_code"
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <TextInput
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  label="Financial_code"
                  placeholder="Financial_code"
                  error={errors?.financial_code?.message}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="trading_country"
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <Select
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  className="text-sm"
                  label="Trading_country"
                  placeholder="Select"
                  searchable
                  nothingFound="No options"
                  maxDropdownHeight={280}
                  data={data_yurt_short}
                  error={errors?.trading_country?.message}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="export_country_name"
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <Select
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  className="text-sm"
                  label="Export_country_name"
                  placeholder="Select"
                  searchable
                  nothingFound="No options"
                  maxDropdownHeight={280}
                  data={data_yurt}
                  error={errors?.export_country_name?.message}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="destination_country_name"
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <Select
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  className="text-sm"
                  label="Destination_country_name"
                  placeholder="Select"
                  searchable
                  nothingFound="No options"
                  maxDropdownHeight={280}
                  data={data_yurt}
                  error={errors?.destination_country_name?.message}
                />
              );
            }}
          />
          {/* <Controller
          control={control}
          name="destination_country_code"
          render={({ field: { onChange, onBlur, value, ref } }) => {
            return (
              <TextInput
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                ref={ref}
                label="Destination_country_code"
                placeholder="Destination_country_code"
                error={errors?.destination_country_code?.message}
              />
            );
          }}
        /> */}
          <Controller
            control={control}
            name="country_of_origin_name"
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <Select
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  className="text-sm"
                  label="Country_of_origin_name"
                  placeholder="Select"
                  searchable
                  nothingFound="No options"
                  maxDropdownHeight={280}
                  data={data_yurt}
                  error={errors?.country_of_origin_name?.message}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="departure_arrival_information_identity"
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <TextInput
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  label="departure_arrival_information_identity"
                  placeholder="departure_arrival_information_identity"
                  error={
                    errors?.departure_arrival_information_identity?.message
                  }
                />
              );
            }}
          />
          <Controller
            control={control}
            name="departure_arrival_information_nationality"
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <Select
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  className="text-sm"
                  label="Departure_arrival_information_nationality"
                  placeholder="Select"
                  searchable
                  nothingFound="No options"
                  maxDropdownHeight={280}
                  data={data_yurt_short}
                  error={
                    errors?.departure_arrival_information_nationality?.message
                  }
                />
              );
            }}
          />

          <Controller
            control={control}
            name="border_information_nationality"
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <Select
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  className="text-sm"
                  label="border_information_nationality"
                  placeholder="Select"
                  searchable
                  nothingFound="No options"
                  maxDropdownHeight={280}
                  data={data_yurt_short}
                  error={errors?.border_information_nationality?.message}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="border_information_identity"
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <TextInput
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  label="Border_information_identity"
                  placeholder="Border_information_identity"
                  error={errors?.border_information_identity?.message}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="delivery_terms_place"
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <TextInput
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  label="Delivery_terms_place"
                  placeholder="Delivery_terms_place"
                  error={errors?.delivery_terms_place?.message}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="delivery_terms_code"
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <Select
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  className="text-sm"
                  label="Delivery_terms_code"
                  placeholder="Select"
                  searchable
                  nothingFound="No options"
                  maxDropdownHeight={280}
                  data={data_inco_terms}
                  error={errors?.delivery_terms_code?.message}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="delivery_terms_situation"
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <Select
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  className="text-sm"
                  label="Delivery_terms_situation"
                  placeholder="Select"
                  searchable
                  nothingFound="No options"
                  maxDropdownHeight={280}
                  data={data_yurt_short}
                  error={errors?.delivery_terms_situation?.message}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="border_office_name"
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <Select
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  className="text-sm"
                  label="Border_office_name"
                  placeholder="Select"
                  searchable
                  nothingFound="No options"
                  maxDropdownHeight={280}
                  data={data_check_points}
                  error={errors?.border_office_name?.message}
                />
              );
            }}
          />
          {/* <Controller
          control={control}
          name="representative_id"
          render={({ field: { onChange, onBlur, value, ref } }) => {
            return (
              <TextInput
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                ref={ref}
                label="Representative_id"
                placeholder="Representative_id"
                error={errors?.representative_id?.message}
              />
            );
          }}
        /> */}
        </SimpleGrid>
        <Group position="center" mt="xl">
          <>
            <div
              onClick={prevStep}
              className="bg-gray-200 hover:bg-gray-100 rounded-md border px-5 py-2 cursor-pointer font-semibold text-sm"
            >
              Back
            </div>
            <Button
              type="submit"
              // loading={state.loading}
              className="bg-blue-600 hover:bg-blue-500 rounded-md px-5 py-2 cursor-pointer font-semibold text-sm text-white"
            >
              Next step
            </Button>
          </>
        </Group>
      </form>
    </>
  );
};

export default memo(StepForm);
