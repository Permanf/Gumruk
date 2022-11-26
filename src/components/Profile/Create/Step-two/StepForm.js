import { TextInput, Button, SimpleGrid, Select, Group } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { memo, useEffect, useReducer } from "react";
import { post } from "../../../../store/middlewares/index";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { getImageIds, getToken } from "../../../../store/selectors/auth";
import { setDeclarationId } from "../../../../store/actions/data";
import { showNotification } from "@mantine/notifications";
import { IconX, IconCheck } from "@tabler/icons";

const StepForm = ({ active, setActive, state, setState }) => {
  const dispatch = useDispatch();
  const [scroll, scrollTo] = useWindowScroll();
  const ids = useSelector(getImageIds);
  const token = useSelector(getToken);
  if (ids.length == 0 && state.data_declaration?.id == "undefined") {
    setActive((current) => (current > 0 ? current - 1 : current));
    scrollTo({ y: 0 });
  }
  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
    scrollTo({ y: 0 });
  };
  // console.log(data, "---step1");
  const data_yurt = [];
  const data_yurt_short = [];
  const data_inco_terms = [];
  const data_check_points = [];

  for (let i = 0; i < state.data_declaration?.countries?.length; i++) {
    data_yurt.push({
      value: state.data_declaration?.countries[i]?.id,
      label: state.data_declaration?.countries[i]?.name?.ru,
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
      label: state.data_declaration?.check_points[i]?.name?.ru,
    });
  }
  const schema = () =>
    Yup.object().shape({
      type_of_declaration: Yup.string().required(
        "type_of_declaration hokman yazmaly"
      ),
      exporter_name: Yup.string()
        .required("exporter_name hokman yazmaly")
        .min(3, "minimum 3 simbol bolmaly")
        .max(500, "maxsimum 500 simbol bolmaly"),
      exporter_code: Yup.number(),
      consignee_name: Yup.string()
        .required("consignee_name hokman yazmaly")
        .min(10, "minimum 10 simbol bolmaly")
        .max(500, "maxsimum 500 simbol bolmaly"),
      consignee_code: Yup.number(),
      financial_name: Yup.string()
        .required("financial_name hokman yazmaly")
        .min(10, "minimum 10 simbol bolmaly")
        .max(500, "maxsimum 500 simbol bolmaly"),
      financial_code: Yup.number(),
      trading_country: Yup.string().required("trading_country hokman yazmaly"),
      export_country_name: Yup.string().required(
        "export_country_name hokman yazmaly"
      ),
      destination_country_name: Yup.string().required(
        "destination_country_name hokman yazmaly"
      ),
      country_of_origin_name: Yup.string().required(
        "country_of_origin_name hokman yazmaly"
      ),
      departure_arrival_information_identity: Yup.string()
        .required("departure_arrival_information_identity hokman yazmaly")
        .min(3, "minimum 3 simbol bolmaly")
        .max(255, "maxsimum 255 simbol bolmaly"),
      departure_arrival_information_nationality: Yup.string().required(
        "departure_arrival_information_nationality hokman yazmaly"
      ),
      border_information_identity: Yup.string()
        .required("border_information_identity hokman yazmaly")
        .min(3, "minimum 3 simbol bolmaly")
        .max(255, "maxsimum 255 simbol bolmaly"),
      border_information_nationality: Yup.string().required(
        "border_information_nationality hokman yazmaly"
      ),
      delivery_terms_code: Yup.string().required(
        "delivery_terms_code hokman yazmaly"
      ),
      delivery_terms_place: Yup.string()
        .required("delivery_terms_place hokman yazmaly")
        .min(3, "minimum 3 simbol bolmaly")
        .max(255, "maxsimum 255 simbol bolmaly"),
      delivery_terms_situation: Yup.string().required(
        "delivery_terms_situation hokman yazmaly"
      ),
      border_office_name: Yup.string().required(
        "border_office_name hokman yazmaly"
      ),
    });
  useEffect(() => {
    if (state.update_data?.declaration?.id) {
      setValue(
        "type_of_declaration",
        state.update_data?.declaration.type_of_declaration
      );
      setValue("exporter_name", state.update_data?.declaration.exporter_name);
      setValue("exporter_code", state.update_data?.declaration.exporter_code);
      setValue("consignee_name", state.update_data?.declaration.consignee_name);
      setValue("consignee_code", state.update_data?.declaration.consignee_code);
      setValue("financial_name", state.update_data?.declaration.financial_name);
      setValue("financial_code", state.update_data?.declaration.financial_code);
      setValue(
        "trading_country",
        state.update_data?.declaration.trading_country
      );
      setValue(
        "export_country_name",
        state.update_data?.declaration.export_country_name
      );
      setValue(
        "destination_country_name",
        state.update_data?.declaration.destination_country_name
      );
      setValue(
        "country_of_origin_name",
        state.update_data?.declaration.country_of_origin_name
      );
      setValue(
        "departure_arrival_information_identity",
        state.update_data?.declaration.departure_arrival_information_identity
      );
      setValue(
        "departure_arrival_information_nationality",
        state.update_data?.declaration.departure_arrival_information_nationality
      );
      setValue(
        "border_information_identity",
        state.update_data?.declaration.border_information_identity
      );
      setValue(
        "border_information_nationality",
        state.update_data?.declaration.border_information_nationality
      );
      setValue(
        "delivery_terms_code",
        state.update_data?.declaration.delivery_terms_code
      );
      setValue(
        "delivery_terms_place",
        state.update_data?.declaration.delivery_terms_place
      );
      setValue(
        "delivery_terms_situation",
        state.update_data?.declaration.delivery_terms_situation
      );
      setValue(
        "border_office_name",
        state.update_data?.declaration.border_office_name
      );
    }
  }, [state.update_data?.declaration]);
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
    data = {
      ...data,
      export_country_code: data?.export_country_name,
      destination_country_code: data?.destination_country_name,
      border_office_code: data?.border_office_name,
      representative_id: 1,
      images_id: ids ? ids : [],
    };
    // console.log(data, "2 step data");
    setState({ type: "SET_LOADING", payload: true });
    dispatch(
      post({
        url: state.update_data?.declaration?.id
          ? `user/declaration/${state.update_data?.declaration?.id}/update-declaration`
          : `user/declaration/create-declaration`,
        data,
        token,
        action: (response) => {
          // console.log(response?.data);
          setState({ type: "SET_LOADING", payload: false });
          if (response.success) {
            // console.log(response?.data?.data);

            if (state.update_data?.declaration?.id) {
              showNotification({
                color: "green",
                title: "Siz üstünlikli üýtgetdiňiz!",
                icon: <IconCheck />,
              });
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

  // console.log(state.update_data?.declaration, "---declaration");
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
                  data={
                    state?.data_declaration?.typeOfDeclaration
                      ? state?.data_declaration?.typeOfDeclaration
                      : []
                  }
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
              loading={state.loading}
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
