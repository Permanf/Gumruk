import { useState, useEffect, useReducer } from "react";
import Layout from "../../components/Layouts/Layout";
import {
  TextInput,
  Paper,
  Title,
  Container,
  Button,
  SimpleGrid,
  Textarea,
  Select,
} from "@mantine/core";
import { fetchData, post } from "../../store/middlewares/index";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { useViewportSize } from "@mantine/hooks";
import { getlang, getToken } from "../../store/selectors/auth";
import ImageUpload from "../../components/Announcement/ImageUpload";
import { showNotification } from "@mantine/notifications";
import { IconX, IconCheck } from "@tabler/icons";
import { getAnnouncementImageIds } from "../../store/selectors/data";
import { useRouter } from "next/router";
import {
  announcementImageIds,
  setImageProgress,
} from "../../store/actions/data";

function reducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_SELECT_DATA":
      return {
        ...state,
        select_data: action.payload,
      };
    case "SET_CAPACITY":
      return {
        ...state,
        capacity: action.payload,
      };
    default:
      return state;
  }
}

const NoticeAdd = () => {
  const [state, setState] = useReducer(reducer, {
    loading: false,
    select_data: {},
    capacity: null,
  });
  const { width } = useViewportSize();
  const dispatch = useDispatch();
  const router = useRouter();
  const lang = useSelector(getlang);
  const token = useSelector(getToken);
  const imageIds = useSelector(getAnnouncementImageIds);
  const schema = () =>
    Yup.object().shape({
      category_id: Yup.string().required("Category saylamaly"),
      capacity: Yup.string().nullable(true),
      location_id: Yup.string().required("Location saylamaly"),
      title: Yup.string()
        .required("Title yazmaly")
        .min(3, "minimum 3 simbol bolmaly")
        .max(35, "maxsimum 35 simbol bolmaly"),
      description: Yup.string()
        .required("Description yazmaly")
        .min(3, "minimum 3 simbol bolmaly")
        .max(255, "maxsimum 255 simbol bolmaly"),
      phone: Yup.string()
        .required("Telefon nomer bolmaly")
        .min(8, "minimum 8 simbol bolmaly")
        .max(8, "mixsimum 8 simbol bolmaly")
        .matches(
          /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
          "Dine san bolmaly!"
        ),
      price: Yup.number().required("Bahasyny yazmaly"),
    });
  const {
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    watch,
    getValues,
    control,
  } = useForm({
    resolver: yupResolver(schema()),
  });
  useEffect(() => {
    dispatch(
      fetchData({
        url: `user/announcement/create-select`,
        lang: lang == "English" ? "en" : lang == "Turkmen" ? "tm" : "ru",
        action: (response) => {
          // console.log(response, "--select");
          if (response?.data?.success) {
            setState({
              type: "SET_SELECT_DATA",
              payload: response?.data?.data,
            });
          } else {
            console.log(response);
          }
        },
      })
    );
  }, []);

  const categories = [];
  for (let i = 0; i < state.select_data?.categories?.length; i++) {
    categories.push({
      value: state.select_data?.categories[i]?.id,
      label: state.select_data?.categories[i]?.name?.ru,
    });
  }
  const locations = [];
  for (let i = 0; i < state.select_data?.locations?.length; i++) {
    locations.push({
      value: state.select_data?.locations[i]?.id,
      label: state.select_data?.locations[i]?.title.ru,
    });
  }
  useEffect(() => {
    console.log(getValues("category_id"));
    console.log(state.select_data.categories);
    if (getValues("category_id")) {
      setState({
        type: "SET_CAPACITY",
        payload:
          state.select_data.categories[getValues("category_id") - 1]
            ?.capacity_value,
      });
    }
  }, [watch("category_id")]);
  const onSubmit = (data) => {
    if (imageIds.length) {
      data = {
        ...data,
        images_id: imageIds ? imageIds : [],
      };
      console.log(data);
      setState({ type: "SET_LOADING", payload: true });
      dispatch(
        post({
          url: `user/announcement/store`,
          data,
          token,
          action: (response) => {
            setState({ type: "SET_LOADING", payload: false });
            console.log(response);
            if (response?.success) {
              // console.log(response.data);
              showNotification({
                color: "green",
                title: "Siz üstünlikli bildiriş goşdyňyz!",
                icon: <IconCheck />,
              });

              router.push("/");
              dispatch(setImageProgress({}));
              dispatch(announcementImageIds(null));
            } else {
              console.log(response, "---error");
              showNotification({
                color: "red",
                title: "Üstünlikli bolmady!",
                icon: <IconX />,
              });
            }
          },
        })
      );
    } else {
      showNotification({
        color: "red",
        title: "Surat hokman bolmaly!",
        icon: <IconX />,
      });
    }
  };
  return (
    <Layout title="Bildiriş goşmak">
      <form onSubmit={handleSubmit(onSubmit)} className="bg_gray">
        <Container size={820} py={60} className="transition-all duration-300">
          <Title align="center">Добавить объявление</Title>
          {/* <Text color="dimmed" size="sm" align="center" mt={5}>
            Для входа в кабинет, пожалуйста, зарегистрируйтесь
          </Text> */}
          <Paper
            withBorder
            shadow="md"
            p={width > 600 ? 30 : 15}
            mt={30}
            radius="md"
          >
            <SimpleGrid
              cols={2}
              spacing="lg"
              breakpoints={[{ maxWidth: 755, cols: 1, spacing: "sm" }]}
            >
              <Controller
                control={control}
                name="category_id"
                render={({ field: { onChange, onBlur, value, ref } }) => {
                  return (
                    <Select
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      ref={ref}
                      className="text-sm"
                      label="Category"
                      placeholder="Pick one"
                      searchable
                      nothingFound="No options"
                      data={categories}
                      error={errors?.category_id?.message}
                    />
                  );
                }}
              />
              {state.capacity != null ? (
                <Controller
                  control={control}
                  name="capacity"
                  render={({ field: { onChange, onBlur, value, ref } }) => {
                    return (
                      <TextInput
                        className={`text-sm`}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        ref={ref}
                        label="Capacity"
                        placeholder={`${state.capacity} sany`}
                        type="text"
                        error={errors?.capacity?.message}
                      />
                    );
                  }}
                />
              ) : null}

              <Controller
                control={control}
                name="location_id"
                render={({ field: { onChange, onBlur, value, ref } }) => {
                  return (
                    <Select
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      ref={ref}
                      label="Location"
                      className="text-sm"
                      placeholder="Location"
                      searchable
                      nothingFound="No options"
                      // maxDropdownHeight={280}
                      data={locations}
                      error={errors?.location_id?.message}
                    />
                  );
                }}
              />
              <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, onBlur, value, ref } }) => {
                  return (
                    <TextInput
                      className={`text-sm`}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      ref={ref}
                      label="Телефон"
                      placeholder="Телефон"
                      type="tel"
                      icon={
                        <p
                          className={`${
                            errors?.phone ? "text-red-500" : "text-black"
                          } font-normal mx-2`}
                        >
                          +993
                        </p>
                      }
                      error={errors?.phone?.message}
                    />
                  );
                }}
              />
              <Controller
                control={control}
                name="price"
                render={({ field: { onChange, onBlur, value, ref } }) => {
                  return (
                    <TextInput
                      className={`text-sm`}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      ref={ref}
                      label="Цена"
                      placeholder="Цена"
                      type="text"
                      error={errors?.price?.message}
                    />
                  );
                }}
              />
            </SimpleGrid>
            <Controller
              control={control}
              name="title"
              render={({ field: { onChange, onBlur, value, ref } }) => {
                return (
                  <TextInput
                    className={`text-sm mt-5`}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    ref={ref}
                    label="Title"
                    placeholder="Title"
                    type="text"
                    error={errors?.title?.message}
                  />
                );
              }}
            />
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, onBlur, value, ref } }) => {
                return (
                  <Textarea
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    ref={ref}
                    placeholder="Description..."
                    className={`text-sm my-5`}
                    autosize
                    minRows={6}
                    label={"Description"}
                    error={errors?.description?.message}
                  />
                );
              }}
            />
            <span className="my-3 text-sm">Image</span>
            <ImageUpload />

            <div className="w-full flex justify-center mt-5">
              <Button
                type="submit"
                loading={state.loading}
                className="bg-blue-600 mr-4 w-full sm:w-56"
              >
                Добавить
              </Button>
            </div>
          </Paper>
        </Container>
      </form>
    </Layout>
  );
};

export default NoticeAdd;
