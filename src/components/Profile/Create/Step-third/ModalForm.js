import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, post } from "../../../../store/middlewares/index";
import { showNotification } from "@mantine/notifications";
import { getToken } from "../../../../store/selectors/auth";
import { IconX, IconCheck, IconHash, IconLoader } from "@tabler/icons";
import {
  TextInput,
  SimpleGrid,
  Grid,
  Select,
  Button,
  Modal,
  Center,
  Autocomplete,
} from "@mantine/core";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import loader from "../../../../assets/Lottiefiles/loader.json";
import { useDebouncedValue } from "@mantine/hooks";

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
  // const [searchValue, onSearchChange] = useState("");
  const [valueName, setValueName] = useState("");
  const [searchValue] = useDebouncedValue(valueName, 500);
  const schema = () =>
    Yup.object().shape({
      // name: Yup.string()
      //   .required("Harydyn ady hokman yazmaly")
      //   .min(5, "minimum 5 simbol bolmaly"),
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
      // setValue("name", state.update_item?.name);
      setValueName(state.update_item?.name);
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
      // setValue("name", "");
      setValueName("");
      setValue("code", "");
      setValue("country_of_origin_code", "");
      setValue("uom_name", "");
      setValue("uom_quantity", "");
      setValue("uom_price", "");
      setValue("brutto_weight", "");
      setValue("netto_weight", "");
    }
  }, [state.update_item]);
  const search_products = [];
  useEffect(() => {
    if (searchValue != "") {
      setState({ type: "SET_LOADING_NAME", payload: true });
      dispatch(
        fetchData({
          url: `user/wares/search?search=${searchValue}`,
          token,
          action: (response) => {
            setState({ type: "SET_LOADING_NAME", payload: false });
            if (response.success) {
              // console.log(searchValue, "--gitmeli");
              // console.log(response?.data);
              search_products = [];
              for (let i = 0; i < response?.data.length; i++) {
                search_products.push({
                  value: response?.data[i].ware_name,
                  label: response?.data[i].ware_name,
                });
              }
              setState({
                type: "SET_SEARCH_PRODUCTS",
                payload: search_products,
              });
            } else {
              console.log(response.data);
            }
          },
        })
      );
    } else {
      setState({
        type: "SET_SEARCH_PRODUCTS",
        payload: search_products,
      });
    }
  }, [searchValue]);

  const onSubmit = (data) => {
    setState({ type: "SET_MODAL_BTN", payload: true });
    // console.log(searchValue, "--");
    // console.log(state.modal_btn);
    if (searchValue != "") {
      data = {
        ...data,
        uom_code: data?.uom_name,
        name: searchValue,
      };
      // console.log(data);
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
      setState({ type: "SET_MODAL_BTN", payload: false });
      setValueName("");
      setValue("name", "");
      setValue("code", "");
      setValue("country_of_origin_code", "");
      setValue("uom_name", "");
      setValue("uom_quantity", "");
      setValue("uom_price", "");
      setValue("brutto_weight", "");
      setValue("netto_weight", "");
    }
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
          <Grid
            // cols={2}
            className="text-sm"
            // spacing="lg"
            // breakpoints={[{ maxWidth: 755, cols: 1, spacing: "sm" }]}
          >
            <Grid.Col span={12} className="relative">
              <Autocomplete
                value={valueName}
                onChange={setValueName}
                label="Name"
                placeholder="Search..."
                data={state.search_products}
                nothingFound="No data"
                error={
                  searchValue.length == 0 && state.modal_btn
                    ? "Minimum 5 simbol bolmaly"
                    : null
                }
              />
              {state.loading_name ? (
                <div className="w-14 h-9  absolute right-3 top-8 cursor-text">
                  <Lottie animationData={loader} loop={true} />
                </div>
              ) : null}
            </Grid.Col>

            <Grid.Col span={6}>
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
                      label="Harydyň kody"
                      placeholder="code"
                      error={errors?.code?.message}
                    />
                  );
                }}
              />
            </Grid.Col>
            <Grid.Col span={6}>
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
                      label={"Harydyň gelip çykan ýurdy"}
                      placeholder="Select"
                      data={data_yurt}
                      searchable
                      error={errors?.country_of_origin_code?.message}
                    />
                  );
                }}
              />
            </Grid.Col>
            <Grid.Col span={6}>
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
                      label="Harydyň brutto agramy"
                      placeholder="brutto_weight"
                      error={errors?.brutto_weight?.message}
                    />
                  );
                }}
              />
            </Grid.Col>

            <Grid.Col span={6}>
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
                      label="Harydyň netto agramy"
                      placeholder="netto_weight"
                      error={errors?.netto_weight?.message}
                    />
                  );
                }}
              />
            </Grid.Col>

            <Grid.Col span={6}>
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
                      label={"Harydyň möçberi"}
                      placeholder="quantity"
                      error={errors?.uom_quantity?.message}
                    />
                  );
                }}
              />
            </Grid.Col>

            <Grid.Col span={6}>
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
                      label={"Harydyň bahasy"}
                      placeholder="price"
                      error={errors?.uom_price?.message}
                    />
                  );
                }}
              />
            </Grid.Col>
            <Grid.Col span={12}>
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
                      label={"Harydyň ölçeg birligi"}
                      placeholder="Select"
                      data={data_size}
                      error={errors?.uom_name?.message}
                    />
                  );
                }}
              />
            </Grid.Col>
          </Grid>
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
