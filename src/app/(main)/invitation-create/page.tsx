import { Box } from '@mui/material'
import { Form, Formik } from 'formik'

export default function Page() {
  return (
    <Box
      width={'100%'}
      sx={{
        background: 'white',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box>
        <Box>
          <Box></Box>
        </Box>
      </Box>
      {/* <Formik
        initialValues={{}}
        onSubmit={(value, { resetForm }) => {
          resetForm();
        }}
      >
        {({ getFieldProps }) => (
          <Form>
            <button
              type="submit"
              // disabled={dirty}
              style={{
                borderRadius: "4px",
                width: 100,
                height: 40,
                float: "right",
                background: "#f1e0ce",
                color: "white",
                marginTop: "30px",
              }}
            >
              보내기
            </button>
          </Form>
        )}
      </Formik> */}
    </Box>
  )
}
