import {
  TextInput,
  SimpleGrid,
  Select,
  Button,
  Group,
  Table,
  Menu,
  Modal,
  ActionIcon,
  Center,
} from "@mantine/core";
import { Plus } from "tabler-icons-react";
import { useState, useReducer, useEffect } from "react";
import { post } from "../../../../store/middlewares/index";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import {
  IconSettings,
  IconDotsVertical,
  IconTrash,
  IconEdit,
  IconX,
  IconCheck,
} from "@tabler/icons";
import { getDeclarationId, getToken } from "../../../../store/selectors/auth";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";

function reducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_PRODUCTS":
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    default:
      return state;
  }
}
function StepAdd({ data, active, setActive }) {
  const [state, setState] = useReducer(reducer, {
    loading: false,
    products: [],
  });
  const [opened, setOpened] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const get_declaration_id = useSelector(getDeclarationId);
  const router = useRouter();

  // if (state.products.length == 0) {
  //   setActive((current) => (current > 0 ? current - 1 : current));
  //   scrollTo({ y: 0 });
  // }
  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
    scrollTo({ y: 0 });
  };
  // console.log(data, "--dec");
  const data_yurt = [];
  for (let i = 0; i < data?.countries?.length; i++) {
    data_yurt.push({
      value: data?.countries[i]?.id,
      label: data?.countries[i]?.short_name,
    });
  }
  const data_size = [];
  for (let i = 0; i < data?.unit?.length; i++) {
    data_size.push({
      value: data?.unit[i]?.id,
      label: data?.unit[i]?.name?.ru,
    });
  }
  const schema = () =>
    Yup.object().shape({
      name: Yup.string()
        .required("Harydyn ady hokman yazmaly")
        .min(3, "minimum 3 simbol bolmaly"),
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

  const onSubmit = (data) => {
    data = {
      ...data,
      uom_code: data?.uom_name,
    };

    console.log(data);
    setState({ type: "SET_PRODUCTS", payload: data });
    setOpened(false);
    setValue("name", "");
    setValue("code", "");
    setValue("country_of_origin_code", "");
    setValue("uom_name", "");
    setValue("uom_quantity", "");
    setValue("uom_price", "");
    setValue("brutto_weight", "");
    setValue("netto_weight", "");
  };

  const data_items = {};
  const nextStep = () => {
    // setActive((current) => (current > 0 ? current - 1 : current));
    // scrollTo({ y: 0 });
    console.log(state.products);

    data_items = {
      items: state.products,
      declaration_id: get_declaration_id,
    };
    const data = {};
    data = data_items;
    console.log(data_items, "--gitmeli");
    setState({ type: "SET_LOADING", payload: true });
    dispatch(
      post({
        url: `user/declaration/create-items`,
        data,
        token,
        action: (response) => {
          if (response.success) {
            setState({ type: "SET_LOADING", payload: false });
            console.log(response?.data);
            showNotification({
              color: "green",
              title: "Siz üstünlikli deklarasiýa goşdynyz!",
              icon: <IconCheck />,
            });
            router.push("/profile/tickets");
            // console.log(response);
          } else {
            console.log(response.data);
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
  };
  // const elements = [
  //   { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
  //   { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
  //   { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
  //   { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
  //   { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
  // ];
  const rows = state?.products.map((element) => (
    <tr key={element.code}>
      <td>{element.name}</td>
      {/* <td>{element.code}</td> */}
      <td>{data_yurt[parseInt(element.country_of_origin_code) - 1].label}</td>
      <td>{element.brutto_weight}</td>
      <td>{element.netto_weight}</td>
      <td>{data_size[parseInt(element.uom_name) - 1].label}</td>
      <td>{element.uom_quantity}</td>
      <td>{element.uom_price}</td>
      <td>
        <Menu>
          <Menu.Target>
            <ActionIcon>
              <IconDotsVertical size={20} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item icon={<IconEdit size={16} />} className="px-6">
              Update
            </Menu.Item>
            <Menu.Item
              color="red"
              className="px-6"
              icon={<IconTrash size={15} />}
            >
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </td>
    </tr>
  ));

  return (
    <div className="mb-10">
      <Group position="right">
        <Button
          size="xs"
          className="bg-blue-500 mb-5"
          onClick={() => setOpened(true)}
        >
          <Plus size={18} />
        </Button>
      </Group>
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
              // loading={state.loading}
              className="bg-blue-500"
            >
              Save
            </Button>
          </Center>
        </form>
      </Modal>
      {state.products.length > 0 ? (
        <>
          <Table striped highlightOnHover withBorder>
            <thead>
              <tr>
                {/* <th>#Id</th> */}
                <th>Harydyn ady</th>
                {/* <th>Code</th> */}
                <th>Gelip cykan yurdy</th>
                <th>Brutto</th>
                <th>Netto</th>
                {/* <th>Uom_code</th> */}
                <th>Olcheg birligi</th>
                <th>Mochberi</th>
                <th>Bahasy</th>
                <th>
                  Action
                  {/* <IconSettings /> */}
                </th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
          <Group position="center" mt="xl" className="mt-10">
            <>
              <div
                onClick={prevStep}
                className="bg-gray-200 hover:bg-gray-100 rounded-md border px-5 py-2 cursor-pointer font-semibold text-sm"
              >
                Back
              </div>
              <Button
                type="submit"
                onClick={nextStep}
                loading={state.loading}
                className="bg-blue-600 hover:bg-blue-500 rounded-md px-5 py-2 cursor-pointer font-semibold text-sm text-white"
              >
                Save
              </Button>
            </>
          </Group>
        </>
      ) : (
        <h1 className="text-center mt-5">No data</h1>
      )}
    </div>
  );
}

export default StepAdd;

// data =[
//   {
//     email:"email nadogry",
//   }
//   {
//     password:"password na"
//   }
// ]
