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
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import {
  IconSettings,
  IconDotsVertical,
  IconTrash,
  IconEdit,
} from "@tabler/icons";

function StepAdd({ data, active, setActive }) {
  const [opened, setOpened] = useState(false);
  console.log(data, "--dec");
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
  const elements = [
    { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
    { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
    { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
    { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
    { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
  ];
  const rows = elements.map((element) => (
    <tr key={element.name}>
      <td>Американское Самоа</td>
      <td>{element.name}</td>
      <td>{element.symbol}</td>
      <td>{element.mass}</td>
      <td>{element.mass}</td>
      <td>{element.mass}</td>
      <td>{element.mass}</td>
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
                    label="name"
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
                  <Select
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    ref={ref}
                    label={"uom_quantity"}
                    placeholder="Select"
                    data={["IM", "EX"]}
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
                  <Select
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    ref={ref}
                    label={"uom_price"}
                    placeholder="Select"
                    data={["IM", "EX"]}
                    error={errors?.uom_price?.message}
                  />
                );
              }}
            />
          </SimpleGrid>
          <Center className="mt-10">
            <Button className="bg-blue-500">Save</Button>
          </Center>
        </form>
      </Modal>
      <Table striped highlightOnHover withBorder>
        <thead>
          <tr>
            {/* <th>#Id</th> */}
            <th>Harydyn ady</th>
            {/* <th>Code</th> */}
            <th>Gelip cykan yurdy</th>
            <th>Brutto agramy</th>
            <th>Netto agramy</th>
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
