// import { Progress, Group, Badge } from "@mantine/core";
import { IconTrash, IconCheck, IconX } from "@tabler/icons";
import ImageNext from "next/image";
import { openConfirmModal } from "@mantine/modals";
import { Text } from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import { getToken } from "../../../../store/selectors/auth";
import { showNotification } from "@mantine/notifications";
import { post } from "../../../../store/middlewares";

const ImageOld = ({ key, fileOld, state, setState }) => {
  const token = useSelector(getToken);
  const dispatch = useDispatch();
  const openDeleteModal = (id) =>
    openConfirmModal({
      title: "Delete image",
      centered: true,
      children: <Text size="sm">Surat pozmak isleýärsiňizmi?</Text>,
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { className: "bg-red-600", color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => {
        const data = {
          image_id: id,
        };
        dispatch(
          post({
            url: `user/image-delete`,
            token,
            data,
            action: (response) => {
              if (response?.data?.success) {
                setState({
                  type: "SET_DELETE_IMAGE_OLD",
                  payload: id,
                });
                showNotification({
                  color: "green",
                  title: "Surat pozuldy!",
                  icon: <IconCheck />,
                });
              } else {
                showNotification({
                  color: "red",
                  title: "Üstünlikli bolmady!",
                  icon: <IconX />,
                  autoClose: 5000,
                });
              }
            },
          })
        );
      },
    });
  return (
    <div
      key={key ? key : null}
      className="rounded-xl p-3 border shadow-md flex flex-col items-center"
    >
      <div className="w-full flex items-center">
        <ImageNext
          className="rounded-md"
          src={`${fileOld.image}`}
          alt="image"
          width={300}
          height={200}
        />
        <div className="w-full flex justify-end mx-2">
          <IconCheck size={20} className="ml-3 text-green-600" />
          <IconTrash
            onClick={() => {
              openDeleteModal(fileOld?.id);
            }}
            size={20}
            className="ml-3 text-red-600 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageOld;
