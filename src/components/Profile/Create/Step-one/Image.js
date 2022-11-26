import { Progress, Group, Badge } from "@mantine/core";
import { IconTrash, IconCheck, IconPhoto, IconX } from "@tabler/icons";

const Image = ({ key, file }) => {
  // console.log(file, "  ", file?.file?.name);
  return (
    <div
      key={key ? key : null}
      className="rounded-xl p-3 border shadow-md flex items-center"
    >
      <div className="w-full flex items-center">
        <IconPhoto size={50} className="text-blue-500" />
        <div className="w-full mx-2">
          <span
            className={`text-sm mb-1 ${
              file?.status == 0 ? "line-through" : ""
            } `}
          >
            {file?.file?.name.length > 20 ? (
              <>{file?.file?.name.substring(0, 20)}...</>
            ) : (
              file?.file?.name
            )}
            {/* {(file?.file?.name).substring(0, 20)} */}
          </span>
          {file?.status == 0 || file?.progress == 100 ? null : (
            <Progress
              value={file?.progress}
              // label="75%"
              size="md"
              radius="xl"
              animate
            />
          )}

          <Group className="flex justify-between">
            {/* <span className="text-xs mt-1">1 mb</span> */}
            {file?.status == 0 || file?.progress == 100 ? null : (
              <span className="text-sm mt-1">{file?.progress}%</span>
            )}
          </Group>
        </div>
      </div>
      {file?.status == 0 ? (
        // <IconX size={23} className="ml-3 text-red-600" />
        <div style={{ width: 130 }}>
          <Badge color="red" fullWidth>
            ýüklenmedi
          </Badge>
        </div>
      ) : null}
      {file?.status == 1 ? (
        <>
          <IconCheck size={23} className="ml-3 text-green-600" />
        </>
      ) : null}
      <IconTrash size={23} className="ml-3 text-red-600 cursor-pointer" />
    </div>
  );
};

export default Image;
