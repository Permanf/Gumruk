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
  Text,
} from "@mantine/core";
import { Plus } from "tabler-icons-react";
import { useState, useReducer, useEffect } from "react";
import { post } from "../../../../store/middlewares/index";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";
// import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { openConfirmModal } from "@mantine/modals";
import {
  IconSettings,
  IconDotsVertical,
  IconTrash,
  IconEdit,
  IconX,
  IconCheck,
} from "@tabler/icons";
import {
  getDeclarationId,
  getlang,
  getToken,
} from "../../../../store/selectors/auth";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import Lottie from "lottie-react";
import notFound from "../../../../assets/Lottiefiles/not-found.json";
import ModalForm from "./ModalForm";
import { declaration } from "../../translation";

function StepAdd({ active, setActive, state, setState }) {
  // console.log(state.products);
  const [opened, setOpened] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const lang = useSelector(getlang);
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
  for (let i = 0; i < state.data_declaration?.countries?.length; i++) {
    data_yurt.push({
      value: state.data_declaration?.countries[i]?.id,
      label: state.data_declaration?.countries[i]?.short_name,
    });
  }
  const data_size = [];
  for (let i = 0; i < state.data_declaration?.unit?.length; i++) {
    data_size.push({
      value: state.data_declaration?.unit[i]?.id,
      label: state.data_declaration?.unit[i]?.name,
    });
  }
  const routeTickets = () => {
    if (state.products.length == 0) {
      showNotification({
        color: "red",
        title: declaration[lang]?.not_success,
        message: declaration[lang]?.at_least,
        icon: <IconX />,
        autoClose: 5000,
      });
    } else {
      router.push("/profile/tickets");
    }
  };

  const data_items = {};
  const nextStep = () => {
    // setActive((current) => (current > 0 ? current - 1 : current));
    // scrollTo({ y: 0 });

    data_items = {
      items: state.products,
      declaration_id: get_declaration_id,
    };
    const data = {};
    data = data_items;
    // console.log(data_items, "--gitmeli");
    setState({ type: "SET_LOADING", payload: true });
    dispatch(
      post({
        url: `user/declaration/create-items`,
        data,
        token,
        action: (response) => {
          setState({ type: "SET_LOADING", payload: false });
          if (response.success) {
            // console.log(response?.data);
            showNotification({
              color: "green",
              title: declaration[lang]?.success_declaration,
              icon: <IconCheck />,
            });
            router.push("/profile/tickets");
            // console.log(response);
          } else {
            // console.log(response.data);
            showNotification({
              color: "red",
              title: declaration[lang]?.not_success,
              // message: "",
              icon: <IconX />,
              autoClose: 5000,
            });
          }
        },
      })
    );
  };
  const openDeleteModal = (id) =>
    openConfirmModal({
      title: declaration[lang]?.delete_title,
      centered: true,
      children: <Text size="sm">{declaration[lang]?.delete_question}</Text>,
      labels: {
        confirm: declaration[lang]?.remove_item,
        cancel: declaration[lang]?.cancel,
      },
      confirmProps: { className: "bg-red-600", color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => {
        // console.log("Confirmed");
        // console.log(id, "---");
        // console.log(state.products, "---pp");
        if (id && state.update_id) {
          dispatch(
            post({
              url: `user/declaration/${id}/delete-one-item`,
              token,
              action: (response) => {
                if (response.success) {
                  // console.log(response?.data);
                  setState({
                    type: "SET_DELETE_ITEM",
                    payload: id,
                  });

                  showNotification({
                    color: "green",
                    title: declaration[lang]?.delete_item,
                    icon: <IconCheck />,
                  });
                  // console.log(response);
                } else {
                  // console.log(response.data);
                  showNotification({
                    color: "red",
                    title: declaration[lang]?.not_success,
                    // message: "",
                    icon: <IconX />,
                    autoClose: 5000,
                  });
                }
              },
            })
          );
        } else {
          setState({
            type: "SET_DELETE_ITEM",
            payload: id,
          });
          showNotification({
            color: "green",
            title: "Haryt elementiňiz pozuldy!",
            icon: <IconCheck />,
          });
        }
      },
    });

  // console.log(state.products, "---pp");
  const rows = state?.products?.map((element) => (
    <tr key={element?.code}>
      <td>
        {element?.name?.length > 20
          ? element?.name.slice(0, 20) + "..."
          : element?.name}
      </td>
      <td>{data_yurt[parseInt(element?.country_of_origin_code) - 1]?.label}</td>
      <td>{element?.brutto_weight}</td>
      <td>{element?.netto_weight}</td>
      <td>{data_size[parseInt(element?.uom_name) - 1]?.label}</td>
      <td>{element?.uom_quantity}</td>
      <td>{element?.uom_price}</td>
      <td>
        <Menu>
          <Menu.Target>
            <ActionIcon>
              <IconDotsVertical size={20} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              icon={<IconEdit size={16} />}
              className="px-6"
              onClick={() => {
                setState({
                  type: "SET_UPDATE_ITEM",
                  payload: element,
                });
              }}
            >
              {declaration[lang]?.update}
            </Menu.Item>
            <Menu.Item
              color="red"
              className="px-6"
              icon={<IconTrash size={15} />}
              onClick={() => {
                if (state.update_id) {
                  openDeleteModal(element?.id);
                } else {
                  openDeleteModal(element?.name);
                }
              }}
            >
              {declaration[lang]?.delete}
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
          onClick={() => {
            setState({
              type: "SET_UPDATE_ITEM",
              payload: {},
            });
            setOpened(true);
          }}
        >
          <Plus size={18} />
        </Button>
      </Group>
      {state.products?.length == 0 ? (
        <div className="bg-red-100 w-full rounded-xl p-4">
          <span className="text-red-500">{declaration[lang]?.at_least}</span>
        </div>
      ) : null}

      <ModalForm
        data_yurt={data_yurt}
        data_size={data_size}
        opened={opened}
        setOpened={setOpened}
        state={state}
        setState={setState}
      />

      {state.products?.length > 0 ? (
        <>
          <Table striped highlightOnHover>
            <thead>
              <tr>
                {/* <th>Id</th> */}
                <th>{declaration[lang]?.product_name}</th>
                <th>{declaration[lang]?.origin_country}</th>
                <th>{declaration[lang]?.brutto}</th>
                <th>{declaration[lang]?.netto}</th>
                <th>{declaration[lang]?.unit_measurement}</th>
                <th>{declaration[lang]?.valume}</th>
                <th>{declaration[lang]?.price}</th>
                <th>
                  <IconDotsVertical size={20} />
                </th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </>
      ) : (
        <div className="flex flex-col items-center my-10">
          <Lottie animationData={notFound} loop={true} className="h-52" />
          <span>нет данных</span>
        </div>
      )}
      <Group position="center" mt="xl" className="mt-10">
        <>
          <div
            onClick={prevStep}
            className="bg-gray-200 hover:bg-gray-100 rounded-md border px-5 py-2 cursor-pointer font-semibold text-sm"
          >
            {declaration[lang]?.back}
          </div>
          {state.update_id ? (
            <Button
              disabled={state.products.length ? false : true}
              type="submit"
              onClick={routeTickets}
              className="bg-blue-600 hover:bg-blue-500 hover:text-white rounded-md px-5 py-2 cursor-pointer font-semibold text-sm text-white"
            >
              {declaration[lang]?.confirmation}
            </Button>
          ) : (
            <Button
              disabled={state.products.length ? false : true}
              type="submit"
              onClick={nextStep}
              loading={state.loading}
              className="bg-blue-600 hover:bg-blue-500 rounded-md px-5 py-2 cursor-pointer font-semibold text-sm text-white"
            >
              {declaration[lang]?.save}
            </Button>
          )}
        </>
      </Group>
    </div>
  );
}

export default StepAdd;
