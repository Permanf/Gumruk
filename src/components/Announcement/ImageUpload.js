import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getToken } from "../../store/selectors/auth";
import { getUploadImage } from "../../store/selectors/data";
import { size, toArray } from "lodash";
import {
  announcementImageIds,
  failureUploadImage,
  setUploadImage,
  setUploadImageProgress,
  successUploadImage,
} from "../../store/actions/data";
import Image from "../Profile/Create/Step-one/Image";

const ImageUpload = () => {
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const imageProgress = useSelector(getUploadImage);
  const uploadedImageAmount = size(imageProgress);
  const handleAttachFIle = (e) => {
    dispatch(setUploadImage(e.target.files));
  };

  useEffect(() => {
    const imageToUpload = toArray(imageProgress)?.filter(
      (file) => file?.progress === 0
    );
    if (imageToUpload.length) {
      imageToUpload.forEach(async (file) => {
        const formPayload = new FormData();
        formPayload.append("images", file.file);
        try {
          await axios({
            baseURL: "http://95.85.127.198",
            url: "/api/user/image-store",
            method: "post",
            data: formPayload,
            onUploadProgress: (progress) => {
              const { loaded, total } = progress;
              const percentageProgress = Math.floor((loaded / total) * 100);
              dispatch(setUploadImageProgress(file.id, percentageProgress));
            },
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
            withCredentials: false,
          }).then((res) => {
            if (res.status == 200) {
              console.log(res.data);
              dispatch(announcementImageIds(res.data.images_id));
              dispatch(successUploadImage(file.id));
            }
          });
        } catch (error) {
          console.log(error);
          dispatch(failureUploadImage(file.id));
        }
      });
    }
  }, [uploadedImageAmount]);
  return (
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
      {uploadedImageAmount > 0
        ? size(imageProgress)
          ? toArray(imageProgress)?.map((file) => {
              return <Image key={file.id} file={file} />;
            })
          : null
        : null}
    </div>
  );
};

export default ImageUpload;
