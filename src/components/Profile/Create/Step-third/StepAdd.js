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
import { getDeclarationId, getToken } from "../../../../store/selectors/auth";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import Lottie from "lottie-react";
import notFound from "../../../../assets/Lottiefiles/not-found.json";
import ModalForm from "./ModalForm";

function StepAdd({ active, setActive, state, setState }) {
  // console.log(state.products);
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
      label: state.data_declaration?.unit[i]?.name?.ru,
    });
  }
  const routeTickets = () => {
    if (state.products.length == 0) {
      showNotification({
        color: "red",
        title: "Üstünlikli bolmady!",
        message: "Iň bolmanda bir haryt bolmaly!",
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
          if (response.success) {
            setState({ type: "SET_LOADING", payload: false });
            // console.log(response?.data);
            showNotification({
              color: "green",
              title: "Siz üstünlikli deklarasiýa goşdynyz!",
              icon: <IconCheck />,
            });
            router.push("/profile/tickets");
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
  };
  const openDeleteModal = (id) =>
    openConfirmModal({
      title: "Delete your product item",
      centered: true,
      children: (
        <Text size="sm">Haryt elementiňizi pozmak isleýärsiňizmi?</Text>
      ),
      labels: { confirm: "Delete item", cancel: "Cancel" },
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
                    title: "Haryt elementiňiz pozuldy!",
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
              Update
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
              // onClick={openDeleteModal}
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
          <span className="text-red-500">Iň bolmanda bir haryt bolmaly!</span>
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
                <th>Harydyn ady</th>
                <th>Gelip cykan yurdy</th>
                <th>Brutto</th>
                <th>Netto</th>
                <th>Olcheg birligi</th>
                <th>Mochberi</th>
                <th>Bahasy</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </>
      ) : (
        <div className="flex flex-col items-center my-10">
          <Lottie animationData={notFound} loop={true} className="h-52" />
          <span>No data</span>
        </div>
      )}
      <Group position="center" mt="xl" className="mt-10">
        <>
          <div
            onClick={prevStep}
            className="bg-gray-200 hover:bg-gray-100 rounded-md border px-5 py-2 cursor-pointer font-semibold text-sm"
          >
            Back
          </div>
          {state.update_id ? (
            <Button
              type="submit"
              onClick={routeTickets}
              className="bg-blue-600 hover:bg-blue-500 rounded-md px-5 py-2 cursor-pointer font-semibold text-sm text-white"
            >
              Tassyklamak
            </Button>
          ) : (
            <Button
              type="submit"
              onClick={nextStep}
              loading={state.loading}
              className="bg-blue-600 hover:bg-blue-500 rounded-md px-5 py-2 cursor-pointer font-semibold text-sm text-white"
            >
              Save
            </Button>
          )}
        </>
      </Group>
    </div>
  );
}

export default StepAdd;
