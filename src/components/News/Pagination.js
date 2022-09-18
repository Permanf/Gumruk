import { Pagination } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";

function Paginations({ activePage, setPage, total }) {
  const { width } = useViewportSize();
  return (
    <Pagination
      page={activePage}
      onChange={setPage}
      total={total}
      size={width > 500 ? "md" : "sm"}
    />
  );
}

export default Paginations;
