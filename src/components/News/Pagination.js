import { Pagination } from "@mantine/core";

function Paginations({ activePage, setPage, total }) {
  return <Pagination page={activePage} onChange={setPage} total={total} />;
}

export default Paginations;
