import { TextInput, Button, SimpleGrid, Select, Group } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { memo, useEffect, useReducer } from "react";
import { post } from "../../../../store/middlewares/index";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import {
  getImageIds,
  getlang,
  getToken,
} from "../../../../store/selectors/auth";
import {
  setDeclarationId,
  setFileProgress,
} from "../../../../store/actions/data";
import { showNotification } from "@mantine/notifications";
import { IconX, IconCheck } from "@tabler/icons";
import { declaration } from "../../translation";

const StepForm = ({ active, setActive, state, setState }) => {
  const dispatch = useDispatch();
  const [scroll, scrollTo] = useWindowScroll();
  const ids = useSelector(getImageIds);
  const token = useSelector(getToken);
  const lang = useSelector(getlang);
  if (ids.length == 0 && state.data_declaration?.id == "undefined") {
    setActive((current) => (current > 0 ? current - 1 : current));
    scrollTo({ y: 0 });
  }
  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
    scrollTo({ y: 0 });
  };

  // console.log(token);
  // console.log(state.data_declaration, "---step1");
  const type_of_declaration = [];
  const data_yurt_different = [];
  const data_yurt = [];
  const data_yurt_short = [];
  const data_inco_terms = [];
  const data_check_points = [];
  for (let i = 0; i < state.data_declaration?.typeOfDeclaration?.length; i++) {
    type_of_declaration.push({
      value: state.data_declaration?.typeOfDeclaration[i]?.id,
      label: `${state.data_declaration?.typeOfDeclaration[i]?.code} - ${state.data_declaration?.typeOfDeclaration[i]?.name} - ${state.data_declaration?.typeOfDeclaration[i]?.description}`,
    });
  }

  for (let i = 0; i < state.data_declaration?.countries?.length; i++) {
    data_yurt.push({
      value: state.data_declaration?.countries[i]?.id,
      label: state.data_declaration?.countries[i]?.name,
    });
    data_yurt_short.push({
      value: state.data_declaration?.countries[i]?.id,
      label: state.data_declaration?.countries[i]?.short_name,
    });
  }
  for (let i = 0; i < state.data_declaration?.inco_terms?.length; i++) {
    data_inco_terms.push({
      value: state.data_declaration?.inco_terms[i]?.id,
      label: state.data_declaration?.inco_terms[i]?.code,
    });
  }
  for (let i = 0; i < state.data_declaration?.check_points?.length; i++) {
    data_check_points.push({
      value: state.data_declaration?.check_points[i]?.id,
      label: `${state.data_declaration?.check_points[i]?.code} - ${state.data_declaration?.check_points[i]?.name}`,
    });
  }
  if (state.data_declaration?.different?.[0]?.id > 0) {
    data_yurt_different.push({
      value: state.data_declaration?.different?.[0]?.id,
      label: state.data_declaration?.different?.[0]?.name,
    });
    data_yurt_different = data_yurt_different.concat(data_yurt);
  }

  const schema = (lang) =>
    Yup.object().shape({
      type_declaration_id: Yup.string().required(declaration[lang].error1),
      exporter_name: Yup.string()
        .required(declaration[lang].error2)
        .min(3, declaration[lang].error2_min)
        .max(500, declaration[lang].error1_max),
      exporter_code: Yup.number(),
      consignee_name: Yup.string()
        .required(declaration[lang].error3)
        .min(10, declaration[lang].error3_min)
        .max(500, declaration[lang].error3_max),
      consignee_code: Yup.number(),
      financial_name: Yup.string()
        .required(declaration[lang].error4)
        .min(10, declaration[lang].error3_max)
        .max(500, declaration[lang].error3_max),
      financial_code: Yup.number(),
      trading_country: Yup.string().required(declaration[lang].error5),
      export_country_name: Yup.string().required(declaration[lang].error6),
      destination_country_name: Yup.string().required(declaration[lang].error7),
      country_of_origin_name: Yup.string().required(declaration[lang].error8),
      departure_arrival_information_identity: Yup.string()
        .required(declaration[lang].error9)
        .min(3, declaration[lang].error9_min)
        .max(255, declaration[lang].error9_max),
      departure_arrival_information_nationality: Yup.string().required(
        declaration[lang].error10
      ),
      border_information_identity: Yup.string()
        .required(declaration[lang].error11)
        .min(3, declaration[lang].error9_min)
        .max(255, declaration[lang].error9_max),
      border_information_nationality: Yup.string().required(
        declaration[lang].error12
      ),
      delivery_terms_code: Yup.string().required(declaration[lang].error13),
      delivery_terms_place: Yup.string()
        .required(declaration[lang].error14)
        .min(3, declaration[lang].error9_max)
        .max(255, declaration[lang].error9_max),
      delivery_terms_situation: Yup.string().required(
        declaration[lang].error15
      ),
      border_office_name: Yup.string().required(declaration[lang].error16),
    });
  const {
    handleSubmit,
    formState: { errors },
    // setError,
    setValue,
    control,
  } = useForm({
    resolver: yupResolver(schema(lang)),
  });
  useEffect(() => {
    if (state.update_2step?.id) {
      dispatch(setFileProgress({}));
      setValue("type_declaration_id", state.update_2step.type_declaration_id);
      setValue("exporter_name", state.update_2step.exporter_name);
      setValue("exporter_code", state.update_2step.exporter_code);
      setValue("consignee_name", state.update_2step.consignee_name);
      setValue("consignee_code", state.update_2step.consignee_code);
      setValue("financial_name", state.update_2step.financial_name);
      setValue("financial_code", state.update_2step.financial_code);
      setValue("trading_country", parseInt(state.update_2step.trading_country));
      setValue(
        "export_country_name",
        parseInt(state.update_2step.export_country_name)
      );
      setValue(
        "destination_country_name",
        parseInt(state.update_2step.destination_country_name)
      );
      setValue(
        "country_of_origin_name",
        parseInt(state.update_2step.country_of_origin_name)
      );
      setValue(
        "departure_arrival_information_identity",
        state.update_2step.departure_arrival_information_identity
      );
      setValue(
        "departure_arrival_information_nationality",
        parseInt(state.update_2step.departure_arrival_information_nationality)
      );
      setValue(
        "border_information_identity",
        state.update_2step.border_information_identity
      );
      setValue(
        "border_information_nationality",
        parseInt(state.update_2step.border_information_nationality)
      );
      setValue(
        "delivery_terms_code",
        parseInt(state.update_2step.delivery_terms_code)
      );
      setValue("delivery_terms_place", state.update_2step.delivery_terms_place);
      setValue(
        "delivery_terms_situation",
        parseInt(state.update_2step.delivery_terms_situation)
      );
      setValue(
        "border_office_name",
        parseInt(state.update_2step.border_office_name)
      );
    }
  }, [state.update_2step]);

  const onSubmit = (data) => {
    data = {
      ...data,
      export_country_code: data?.export_country_name,
      destination_country_code: data?.destination_country_name,
      border_office_code: data?.border_office_name,
      representative_id: 1,
      images_id: ids ? ids : [],
      id: state.update_2step.id,
    };
    // console.log(data, "2 step data");
    setState({ type: "SET_LOADING", payload: true });
    dispatch(
      post({
        url: state.update_2step?.id
          ? `user/declaration/${state.update_2step?.id}/update-declaration`
          : `user/declaration/create-declaration`,
        data,
        token,
        action: (response) => {
          console.log(response?.data, "---2step");
          setState({ type: "SET_LOADING", payload: false });
          if (response.success) {
            // console.log(response?.data?.data);
            setState({ type: "SET_UPDATE_2STEP", payload: data });
            if (state.update_2step?.id) {
              if (!state.update_2step?.items) {
                showNotification({
                  color: "green",
                  title: "Siz üstünlikli üýtgetdiňiz!",
                  icon: <IconCheck />,
                });
              }

              setActive((current) => (current < 3 ? current + 1 : current));
              scrollTo({ y: 0 });
            } else {
              dispatch(setDeclarationId(response?.data?.data?.declaration_id));
              setActive((current) => (current < 3 ? current + 1 : current));
              scrollTo({ y: 0 });
            }

            // console.log(response);
          } else {
            console.log(response.data);
          }
        },
      })
    );
    // export_country_code
  };

  // console.log(state.update_2step, "---declaration");
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
            name="type_declaration_id"
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <Select
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  searchable
                  nothingFound="No options"
                  maxDropdownHeight={280}
                  label={declaration[lang]?.input1}
                  placeholder={declaration[lang]?.input1}
                  data={type_of_declaration}
                  error={errors?.type_declaration_id?.message}
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
                  label={declaration[lang]?.input2}
                  placeholder={declaration[lang]?.input2}
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
                  label={declaration[lang]?.input3}
                  placeholder={declaration[lang]?.input3}
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
                  label={declaration[lang]?.input4}
                  placeholder={declaration[lang]?.input4}
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
                  label={declaration[lang]?.input5}
                  placeholder={declaration[lang]?.input5}
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
                  label={declaration[lang]?.input6}
                  placeholder={declaration[lang]?.input6}
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
                  label={declaration[lang]?.input7}
                  placeholder={declaration[lang]?.input7}
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
                  label={declaration[lang]?.input8}
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
                  label={declaration[lang]?.input9}
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
                  label={declaration[lang]?.input10}
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
                  label={declaration[lang]?.input11}
                  placeholder="Select"
                  searchable
                  nothingFound="No options"
                  maxDropdownHeight={280}
                  data={data_yurt_different}
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
                  label={declaration[lang]?.input12}
                  placeholder={declaration[lang]?.input12}
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
                  label={declaration[lang]?.input13}
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
                  label={declaration[lang]?.input14}
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
                  label={declaration[lang]?.input15}
                  placeholder={declaration[lang]?.input15}
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
                  label={declaration[lang]?.input16}
                  placeholder={declaration[lang]?.input16}
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
                  label={declaration[lang]?.input17}
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
                  label={declaration[lang]?.input18}
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
                  label={declaration[lang]?.input19}
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
        </SimpleGrid>
        <Group position="center" mt="xl">
          <>
            <div
              onClick={prevStep}
              className="bg-gray-200 hover:bg-gray-100 rounded-md border px-5 py-2 cursor-pointer font-semibold text-sm"
            >
              {declaration[lang]?.back}
            </div>
            <Button
              type="submit"
              loading={state.loading}
              className="bg-blue-600 hover:bg-blue-500 rounded-md px-5 py-2 cursor-pointer font-semibold text-sm text-white"
            >
              {declaration[lang]?.next}
            </Button>
          </>
        </Group>
      </form>
    </>
  );
};

export default memo(StepForm);
