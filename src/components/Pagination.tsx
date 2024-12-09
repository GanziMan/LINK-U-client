import { Stack, Pagination } from '@mui/material'

export default function PaginationComponent({
  count,
  page,
  onChange,
}: {
  count: number
  page: number
  onChange: any
}) {
  return (
    <Stack
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',

        bottom: 5,
        textAlign: 'center',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      <Pagination
        count={count}
        page={page}
        onChange={onChange}
        size={'small'}
        variant="outlined"
        sx={{
          '& .Mui-selected': {
            background: '#f6fbff',
          },

          '& .MuiPaginationItem-previousNext': {
            background: 'white',
          },
        }}
      />
    </Stack>
  )
}
