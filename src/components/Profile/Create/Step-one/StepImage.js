import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Button, Group } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";

// import { connect } from "react-redux";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";
// import { useForm, Controller } from "react-hook-form";
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
  getToken,
  getUpload,
} from "../../../../store/selectors/auth";
import { size, toArray } from "lodash";
import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons";

const StepImage = ({ active, setActive }) => {
  const dispatch = useDispatch();
  const [scroll, scrollTo] = useWindowScroll();
  const ids = useSelector(getImageIds);
  const nextStep = () => {
    if (ids.length > 0) {
      setActive((current) => (current < 3 ? current + 1 : current));
      scrollTo({ y: 0 });
    } else {
      showNotification({
        color: "red",
        title: "Surat hokman bolmaly!",
        icon: <IconX />,
        // message: "",
      });
    }
  };
  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
    scrollTo({ y: 0 });
  };

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
            baseURL: "http://95.85.124.76:9000",
            url: "/api/user/image-store",
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
            // console.log(res);
            if (res.status == 200) {
              // console.log(res.data);
              dispatch(imageIds(res.data.images_id));
              dispatch(successUploadFile(file.id));
            }
          });
        } catch (error) {
          console.log(error);
          dispatch(failureUploadFile(file.id));
        }
      });
    }
    // uploadFile(fileToUpload);
    // setUploadFile(fileToUpload);
  }, [uploadedFileAmount]);
  return (
    <div
    // onSubmit={handleSubmit(onSubmit)}
    >
      <div
        className={`w-full rounded-2xl border-4 border-dashed grid gird-cols-1 sm:grid-cols-2 gap-3 p-5 mt-1 mb-4`}
      >
        <div className="flex justify-center items-center">
          <label
            htmlFor="dropzone-file"
            className="p-1 flex flex-col justify-center items-center w-full h-30 bg-blue-50 rounded-xl shadow-md cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-blue-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop (SVG, PNG, JPG)
                </p>
                {/* <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG
                  </p> */}
              </div>
            </div>
            {/* <Controller
              control={control}
              name="file"
              render={({ field: { onChange, onBlur, value, ref } }) => {
                return ( */}
            <input
              onChange={handleAttachFIle}
              // onBlur={onBlur}
              // value={value}
              // ref={ref}
              accept="image/*"
              id="dropzone-file"
              type="file"
              className="hidden"
              multiple
            />
            {/* );
              }}
            /> */}
          </label>
        </div>
        {uploadedFileAmount > 0
          ? size(fileProgress)
            ? toArray(fileProgress)?.map((file) => {
                return <Image key={file.id} file={file} />;
              })
            : null
          : null}
      </div>
      {/* <span className="text-red-500 mt-3 text-sm">{errors?.file?.message}</span> */}
      <Group position="center" mt="xl">
        <>
          <div
            onClick={prevStep}
            className="bg-gray-200 hover:bg-gray-100 rounded-md border px-5 py-2 cursor-pointer font-semibold text-sm"
          >
            Back
          </div>
          <Button
            onClick={nextStep}
            type="submit"
            // loading={state.loading}
            className="bg-blue-600 hover:bg-blue-500 rounded-md px-5 py-2 cursor-pointer font-semibold text-sm text-white"
          >
            Next step
          </Button>
        </>
      </Group>
    </div>
  );
};

export default StepImage;
{
  /* <Group position="center" mt="xl">
        <>
          <div
            // onClick={prevStep}
            className="bg-gray-200 hover:bg-gray-100 rounded-md border px-5 py-2 cursor-pointer font-semibold text-sm"
          >
            Back
          </div>
          {active == 2 ? (
            <Button
              type="submit"
              // loading={state.loading}
              className="bg-blue-600 hover:bg-blue-500 rounded-md px-5 py-2 cursor-pointer font-semibold text-sm text-white"
            >
              Save
            </Button>
          ) : (
            <div
              // onClick={nextStep}
              className="bg-blue-600 hover:bg-blue-500 rounded-md px-5 py-2 cursor-pointer font-semibold text-sm text-white"
            >
              Next step
            </div>
          )}
        </>
      </Group> */
}
