import { Box } from '@mui/material'
import { Form, Formik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import {
  CommentWriteBox,
  CommentWriteContentBox,
  CommentWriteNameBox,
  CommentWriteTextAreaBox,
  CommentWriteTextBox,
} from '../styles'
import { CommentFormType } from '../schema/mainPageSchea'
import { createCommentSchema } from '@/actions/invitation/schema'

const initialValues: CommentFormType = {
  name: '',
  comment: '',
}

export default function FormikForm({
  commentRegist,
}: {
  commentRegist: (value: CommentFormType) => void
}) {
  return (
    <Box width={'100%'} padding={'20px'}>
      <Formik
        initialValues={initialValues}
        validationSchema={toFormikValidationSchema(createCommentSchema)}
        onSubmit={(value, { resetForm }) => {
          commentRegist(value)
          resetForm()
        }}
      >
        {({ getFieldProps, values, dirty }) => {
          return (
            <Form>
              <CommentWriteBox>
                <CommentWriteNameBox>
                  <CommentWriteTextBox
                    placeholder="성함"
                    id="name"
                    inputProps={{
                      style: {
                        width: 100,
                        height: 10,
                      },
                    }}
                    {...getFieldProps('name')}
                  />
                </CommentWriteNameBox>
                <CommentWriteContentBox>
                  <CommentWriteTextAreaBox
                    maxLength={98}
                    id="comment"
                    minRows={3}
                    maxRows={3}
                    placeholder="하고 싶은 말을 전하세요."
                    {...getFieldProps('comment')}
                  />
                </CommentWriteContentBox>
              </CommentWriteBox>
              <button
                type="submit"
                disabled={dirty}
                style={{
                  borderRadius: '4px',
                  width: 100,
                  height: 40,
                  float: 'right',
                  background: dirty ? '#f1e0ce' : 'lightgray',
                  color: 'white',
                  marginTop: '30px',
                }}
              >
                보내기
              </button>
            </Form>
          )
        }}
      </Formik>
    </Box>
  )
}
