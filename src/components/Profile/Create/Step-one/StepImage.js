import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Button, Group } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import Image from "./Image";
import {
  setUploadFile,
  setUploadProgress,
  successUploadFile,
  failureUploadFile,
  imageIds,
} from "../../../../store/actions/data";
import {
  getImageIds,
  getlang,
  getToken,
  getUpload,
} from "../../../../store/selectors/auth";
import { size, toArray } from "lodash";
import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons";
import { fetchData } from "../../../../store/middlewares";
import Lottie from "lottie-react";
import loader from "../../../../assets/Lottiefiles/loader.json";
import ImageOld from "./ImageOld";
import { declaration } from "../../translation";

const StepImage = ({ active, setActive, state, setState }) => {
  const dispatch = useDispatch();
  const [scroll, scrollTo] = useWindowScroll();
  const lang = useSelector(getlang);
  const ids = useSelector(getImageIds);
  const nextStep = () => {
    if (ids.length > 0 || state.update_data?.id > 0) {
      setActive((current) => (current < 3 ? current + 1 : current));
      scrollTo({ y: 0 });
    } else {
      showNotification({
        color: "red",
        title: declaration[lang]?.error_image,
        icon: <IconX />,
        // message: "",
      });
    }
  };
  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
    scrollTo({ y: 0 });
  };
  // console.log(state.update_data.declaration?.id);
  useEffect(() => {
    if (state.update_data.declaration?.id) {
      setState({ type: "SET_LOADING_IMAGE", payload: true });

      dispatch(
        fetchData({
          token,
          url: `user/declaration/${state.update_data.declaration?.id}/images`,
          action: (response) => {
            console.log(response.data);
            setState({ type: "SET_LOADING_IMAGE", payload: false });
            if (response.data.success) {
              setState({
                type: "SET_IMAGES",
                payload: response?.data?.data,
              });
            } else {
              console.log(response.data);
            }
          },
        })
      );
    }
  }, [state.update_data.declaration?.id]);

  const handleAttachFIle = (e) => {
    // console.log(e.target.files);
    // could do some validation for the attached file here
    dispatch(setUploadFile(e.target.files));
    // props.setUploadFile(e.target.files);
    // e.target.value = ""; // to clear the current file
  };
  const token = useSelector(getToken);
  const fileProgress = useSelector(getUpload);
  const uploadedFileAmount = size(fileProgress);

  useEffect(() => {
    const fileToUpload = toArray(fileProgress)?.filter(
      (file) => file?.progress === 0
    );
    if (fileToUpload.length) {
      fileToUpload.forEach(async (file) => {
        const formPayload = new FormData();
        formPayload.append("images", file.file);
        try {
          await axios({
            baseURL: "https://back.terminal.gov.tm",
            url: state.update_id
              ? `/api/user/declaration/${state.update_id}/add/images`
              : "/api/user/image-store",
            method: "post",
            data: formPayload,
            onUploadProgress: (progress) => {
              const { loaded, total } = progress;
              const percentageProgress = Math.floor((loaded / total) * 100);
              dispatch(setUploadProgress(file.id, percentageProgress));
            },
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
            withCredentials: false,
          }).then((res) => {
            if (res.status == 200) {
              console.log(res.data);
              dispatch(imageIds(res.data.data.images_id));
              dispatch(
                successUploadFile({
                  id: file.id,
                  image_id: res.data.data.images_id,
                })
              );
            }
          });
        } catch (error) {
          console.log(error);
          dispatch(failureUploadFile(file.id));
        }
      });
    }
  }, [uploadedFileAmount]);
  return (
    <div>
      <div
        className={`w-full rounded-2xl border-4 border-dashed grid gird-cols-1 sm:grid-cols-2 gap-3 p-5 mt-1 mb-4`}
      >
        <div className="flex justify-center items-center">
          <label
            htmlFor="dropzone-file"
            className="p-1 flex flex-col justify-center items-center w-full h-30 bg-blue-50 rounded-xl shadow-md cursor-pointer hover:bg-blue-100"
          >
            <div className="flex flex-col justify-center items-center py-2">
              <svg
                aria-hidden="true"
                className="my-2 w-10 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <div>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span>(SVG,
                  PNG, JPG)
                </p>
                {/* <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG
                  </p> */}
              </div>
            </div>
            <input
              onChange={handleAttachFIle}
              accept="image/*"
              id="dropzone-file"
              type="file"
              className="hidden"
              multiple
            />
          </label>
        </div>
        {state.loading_image ? (
          <div className="flex flex-col items-center justify-center">
            <Lottie animationData={loader} loop={true} className="h-14" />
          </div>
        ) : state.images ? (
          state.images?.map((fileOld) => {
            return (
              <ImageOld
                key={fileOld.id}
                fileOld={fileOld}
                state={state}
                setState={setState}
              />
            );
          })
        ) : null}
        {}
        {uploadedFileAmount > 0
          ? size(fileProgress)
            ? toArray(fileProgress)?.map((file) => {
                return <Image key={file.id} file={file} />;
              })
            : null
          : null}
      </div>
      <Group position="center" mt="xl">
        <>
          <div
            onClick={prevStep}
            className="bg-gray-200 hover:bg-gray-100 rounded-md border px-5 py-2 cursor-pointer font-semibold text-sm"
          >
            {declaration[lang]?.back}
          </div>
          <Button
            onClick={nextStep}
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 rounded-md px-5 py-2 cursor-pointer font-semibold text-sm text-white"
          >
            {declaration[lang]?.next}
          </Button>
        </>
      </Group>
    </div>
  );
};

export default StepImage;
