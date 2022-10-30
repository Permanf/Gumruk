import Layout from "../../components/Layouts/Layout";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  SimpleGrid,
  InputBase,
  Textarea,
} from "@mantine/core";
import { post } from "../../store/middlewares/index";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import InputMask from "react-input-mask";
import { IconLock, IconMail, IconCalendar } from "@tabler/icons";
import { useViewportSize } from "@mantine/hooks";
import { useState, useEffect, useReducer } from "react";
import { SetCookie } from "../../utils/cookie";

function reducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}

const NoticeAdd = () => {
  const [state, setState] = useReducer(reducer, {
    loading: false,
  });
  const { width } = useViewportSize();
  const dispatch = useDispatch();
  const schema = () =>
    Yup.object().shape({
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
      file: Yup.string().required("image bolmaly"),
      // .min(1, "minimum 1 sany bolmaly")
      // .max(4, "maxsimum 4 sany bolmaly"),
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
    // setState({ type: "SET_LOADING", payload: true });
    console.log(data.file[0]);
    // dispatch(
    //   post({
    //     url: `notice`,
    //     data,
    //     action: (response) => {
    //       console.log(response?.data);
    //       setState({ type: "SET_LOADING", payload: false });
    //       if (response.success) {
    //         SetCookie("token", response?.data?.data?.token);
    //       } else {
    //       }
    //     },
    //   })
    // );
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
            <Controller
              control={control}
              name="title"
              render={({ field: { onChange, onBlur, value, ref } }) => {
                return (
                  <TextInput
                    className={`text-sm mb-5`}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    ref={ref}
                    label={"Name"}
                    placeholder={"Name"}
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
                    className={`text-sm mb-5`}
                    autosize
                    minRows={6}
                    label={"Description"}
                    error={errors?.description?.message}
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
                    className={`text-sm mb-5`}
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
            {/* <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value, ref } }) => {
                return (
                  <TextInput
                    className={`text-sm mb-5`}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    ref={ref}
                    label={"Email"}
                    placeholder={"Email"}
                    error={errors?.email?.message}
                  />
                );
              }}
            /> */}
            <span className="mt-3 text-sm">Image</span>
            <div
              className={`w-full rounded-2xl border-4 border-dashed flex p-3 mt-1 mb-4 ${
                errors?.file?.message ? "border-red-400" : "border-gray-300"
              }`}
            >
              <div className="w-1/2 flex justify-center items-center">
                No image
              </div>
              <div className="w-1/2">
                <div class="flex justify-center items-center w-full">
                  <label
                    for="dropzone-file"
                    class="flex flex-col justify-center items-center w-full h-64 bg-blue-50 rounded-2xl  cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-blue-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div class="flex flex-col justify-center items-center pt-5 pb-6">
                      <svg
                        aria-hidden="true"
                        class="mb-3 w-10 h-10 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span class="font-semibold">Click to upload</span> or
                        drag and drop
                      </p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <Controller
                      control={control}
                      name="file"
                      render={({ field: { onChange, onBlur, value, ref } }) => {
                        return (
                          <input
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}
                            ref={ref}
                            id="dropzone-file"
                            type="file"
                            class="hidden"
                            multiple
                          />
                        );
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
            <span className="text-red-500 mt-3 text-sm">
              {errors?.file?.message}
            </span>

            <div className="w-full flex justify-center mt-5">
              <Button
                type="submit"
                // loading={state.loading}
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
