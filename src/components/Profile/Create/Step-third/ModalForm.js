import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { post } from "../../../../store/middlewares/index";
import { showNotification } from "@mantine/notifications";
import { getToken } from "../../../../store/selectors/auth";
import { IconX, IconCheck } from "@tabler/icons";
import {
  TextInput,
  SimpleGrid,
  Select,
  Button,
  Modal,
  Center,
} from "@mantine/core";
import { useEffect } from "react";

const ModalForm = ({
  data_yurt,
  data_size,
  opened,
  setOpened,
  state,
  setState,
}) => {
  // console.log(state);
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const schema = () =>
    Yup.object().shape({
      name: Yup.string()
        .required("Harydyn ady hokman yazmaly")
        .min(5, "minimum 5 simbol bolmaly"),
      code: Yup.number().required("code hokman yazmaly"),
      country_of_origin_code: Yup.string().required(
        "country_of_origin_code hokman yazmaly"
      ),
      uom_name: Yup.string().required("uom_name hokman yazmaly"),
      uom_quantity: Yup.number().required("uom_quantity hokman yazmaly"),
      uom_price: Yup.number().required("uom_price hokman yazmaly"),
      brutto_weight: Yup.number().required("brutto_weight hokman yazmaly"),
      netto_weight: Yup.number().required("netto_weight hokman yazmaly"),
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
    // console.log(state.update_item.id, "----+++");
    // console.log(state.update_item, "----+++");
    if (state.update_item.id || state.update_item.code) {
      setValue("name", state.update_item?.name);
      setValue("code", state.update_item?.code);
      setValue(
        "country_of_origin_code",
        parseInt(state.update_item?.country_of_origin_code)
      );
      setValue("uom_name", parseInt(state.update_item?.uom_name));
      setValue("uom_quantity", state.update_item?.uom_quantity);
      setValue("uom_price", state.update_item?.uom_price);
      setValue("brutto_weight", state.update_item?.brutto_weight);
      setValue("netto_weight", state.update_item?.netto_weight);
      setOpened(true);
    } else {
      setValue("name", "");
      setValue("code", "");
      setValue("country_of_origin_code", "");
      setValue("uom_name", "");
      setValue("uom_quantity", "");
      setValue("uom_price", "");
      setValue("brutto_weight", "");
      setValue("netto_weight", "");
    }
  }, [state.update_item]);

  const onSubmit = (data) => {
    data = {
      ...data,
      uom_code: data?.uom_name,
    };
    // console.log(state.update_id, "--up");
    if (state.update_id > 0) {
      setState({ type: "SET_LOADING", payload: true });
      // console.log(data, "--gitmeli");
      dispatch(
        post({
          url: state.update_item?.id
            ? `user/declaration/${state.update_item?.id}/update-one-item`
            : `user/declaration/${state.update_id}/create-one-item`,
          data,
          token,
          action: (response) => {
            setState({ type: "SET_LOADING", payload: false });
            setOpened(false);

            if (response.success) {
              // console.log(response?.data.data);
              if (state.update_item?.id) {
                setState({
                  type: "SET_UPDATE_PRODUCT_ITEM",
                  payload: response?.data?.data.data,
                });
              } else {
                setState({
                  type: "SET_PRODUCTS",
                  payload: response?.data?.data.data,
                });
              }
              showNotification({
                color: "green",
                title: state.update_item?.id
                  ? "Siz üstünlikli üýtgetdiňiz!"
                  : "Siz üstünlikli haryt goşdynyz!",
                icon: <IconCheck />,
              });

              // console.log(response);
            } else {
              // console.log(response.data);
              showNotification({
                color: "red",
                title: "Üstünlikli bolmady!",
                // message: "",
                icon: <IconX />,
                autoClose: 5000,
              });
            }
          },
        })
      );
      setState({
        type: "SET_UPDATE_ITEM",
        payload: {},
      });
    } else {
      setOpened(false);

      if (state.update_item.code) {
        setState({
          type: "SET_UPDATE_PRODUCT_ITEM",
          payload: data,
        });
      } else {
        setState({ type: "SET_PRODUCTS", payload: data });
      }
    }
    // console.log(state.update_id, "---iddd");
    // console.log(state.product_status, "---status"); false added???

    // console.log(data);
    setValue("name", "");
    setValue("code", "");
    setValue("country_of_origin_code", "");
    setValue("uom_name", "");
    setValue("uom_quantity", "");
    setValue("uom_price", "");
    setValue("brutto_weight", "");
    setValue("netto_weight", "");
  };
  return (
    <>
      <Modal
        size="lg"
        overlayOpacity={0.55}
        overlayBlur={3}
        opened={opened}
        onClose={() => setOpened(false)}
        title="Product create!"
      >
        {/* Modal content */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <SimpleGrid
            cols={2}
            className="text-sm"
            spacing="lg"
            breakpoints={[{ maxWidth: 755, cols: 1, spacing: "sm" }]}
          >
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value, ref } }) => {
                return (
                  <TextInput
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    ref={ref}
                    label="Name"
                    placeholder="Name"
                    error={errors?.name?.message}
                  />
                );
              }}
            />
            <Controller
              control={control}
              name="code"
              render={({ field: { onChange, onBlur, value, ref } }) => {
                return (
                  <TextInput
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    ref={ref}
                    label="Code"
                    placeholder="code"
                    error={errors?.code?.message}
                  />
                );
              }}
            />
            <Controller
              control={control}
              name="country_of_origin_code"
              className="w-full"
              render={({ field: { onChange, onBlur, value, ref } }) => {
                return (
                  <Select
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    ref={ref}
                    label={"Country_of_origin_code"}
                    placeholder="Select"
                    data={data_yurt}
                    error={errors?.country_of_origin_code?.message}
                  />
                );
              }}
            />
            <Controller
              control={control}
              name="brutto_weight"
              render={({ field: { onChange, onBlur, value, ref } }) => {
                return (
                  <TextInput
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    ref={ref}
                    label="Brutto_weight"
                    placeholder="brutto_weight"
                    error={errors?.brutto_weight?.message}
                  />
                );
              }}
            />
            <Controller
              control={control}
              name="netto_weight"
              render={({ field: { onChange, onBlur, value, ref } }) => {
                return (
                  <TextInput
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    ref={ref}
                    label="Netto_weight"
                    placeholder="netto_weight"
                    error={errors?.netto_weight?.message}
                  />
                );
              }}
            />
            <Controller
              control={control}
              name="uom_name"
              className="w-full"
              render={({ field: { onChange, onBlur, value, ref } }) => {
                return (
                  <Select
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    ref={ref}
                    label={"uom_name"}
                    placeholder="Select"
                    data={data_size}
                    error={errors?.uom_name?.message}
                  />
                );
              }}
            />
            <Controller
              control={control}
              name="uom_quantity"
              className="w-full"
              render={({ field: { onChange, onBlur, value, ref } }) => {
                return (
                  <TextInput
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    ref={ref}
                    label={"Uom_quantity"}
                    placeholder="quantity"
                    error={errors?.uom_quantity?.message}
                  />
                );
              }}
            />
            <Controller
              control={control}
              name="uom_price"
              className="w-full"
              render={({ field: { onChange, onBlur, value, ref } }) => {
                return (
                  <TextInput
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    ref={ref}
                    label={"Uom_price"}
                    placeholder="price"
                    error={errors?.uom_price?.message}
                  />
                );
              }}
            />
          </SimpleGrid>
          <Center className="mt-10">
            <Button
              type="submit"
              loading={state.loading}
              className="bg-blue-500"
            >
              {state.update_item?.id ? "Update" : "Save"}
            </Button>
          </Center>
        </form>
      </Modal>
    </>
  );
};

export default ModalForm;
