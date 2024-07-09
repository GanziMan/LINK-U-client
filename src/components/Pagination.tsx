import { Stack, Pagination } from "@mui/material";

export default function PaginationComponent({
  count,
  page,
  onChange,
}: {
  count: number;
  page: number;
  onChange: any;
}) {
  return (
    <Stack sx={{ width: "100%", display: "flex", alignItems: "center" }}>
      <Pagination
        count={count}
        page={page}
        onChange={onChange}
        size={"small"}
        variant="outlined"
        color="secondary"
      />
    </Stack>
  );
}
