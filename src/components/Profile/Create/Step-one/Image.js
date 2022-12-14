import { Progress, Group, Badge } from "@mantine/core";
import { IconTrash, IconCheck, IconPhoto, IconX } from "@tabler/icons";
import ImageNext from "next/image";

const Image = ({ key, file }) => {
  // console.log(file, "----");
  // const url = URL.createObjectURL(file.file);
  // console.log(url);
  // URL.createObjectURL(e.target.files[i])}
  return (
    <div
      key={key ? key : null}
      className="rounded-xl p-3 border shadow-md flex flex-col items-center"
    >
      <div className="w-full flex items-center">
        {/* <IconPhoto size={50} className="text-blue-500" /> */}
        {/* <img src={`./${file.file.name}`} /> */}
        <ImageNext
          className="rounded-md"
          src={`${URL.createObjectURL(file.file)}`}
          alt="image"
          width={300}
          height={200}
        />
        <div className="w-full flex justify-end mx-2">
          {/* <span
            className={`text-sm mb-1 ${
              file?.status == 0 ? "line-through" : ""
            } `}
          >
            {file?.file?.name.length > 20 ? (
              <>{file?.file?.name.substring(0, 20)}...</>
            ) : (
              file?.file?.name
            )}
          </span> */}
          {file?.status == 0 ? (
            <div style={{ width: 130 }}>
              <Badge color="red" fullWidth>
                ýüklenmedi
              </Badge>
            </div>
          ) : null}
          {file?.status == 1 ? (
            <>
              <IconCheck size={20} className="ml-3 text-green-600" />
            </>
          ) : null}
          <IconTrash size={20} className="ml-3 text-red-600 cursor-pointer" />
        </div>
      </div>
      <div className="w-full px-1">
        {file?.status == 0 || file?.progress == 100 ? null : (
          <Progress
            value={file?.progress}
            size="md"
            radius="xl"
            className="mt-4"
            animate
          />
        )}

        <Group className="flex justify-between">
          {file?.status == 0 || file?.progress == 100 ? null : (
            <span className="text-sm mt-1">{file?.progress}%</span>
          )}
        </Group>
      </div>
    </div>
  );
};

export default Image;
