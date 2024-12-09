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

export default function CommentsCreateForm({
  commentRegist,
}: {
  commentRegist: (value: CommentFormType) => void
}) {
  return (
    <Box width={'100%'} padding={'20px'}>
      <Formik
        initialValues={initialValues}
        validationSchema={toFormikValidationSchema(createCommentSchema)}
        enableReinitialize={true}
        validateOnBlur={true}
        onSubmit={(value, { resetForm }) => {
          commentRegist(value)
          resetForm()
        }}
      >
        {({ getFieldProps, isValid, isSubmitting, dirty }) => {
          return (
            <Form>
              <CommentWriteBox>
                <CommentWriteNameBox>
                  <CommentWriteTextBox
                    placeholder="성함"
                    id="comment-name"
                    inputProps={{
                      style: {
                        width: 100,
                        height: 10,
                        fontFamily: 'binggrae',
                      },
                    }}
                    {...getFieldProps('name')}
                  />
                </CommentWriteNameBox>
                <CommentWriteContentBox>
                  <CommentWriteTextAreaBox
                    maxLength={98}
                    id="comment-content"
                    minRows={3}
                    maxRows={3}
                    placeholder="하고 싶은 말을 전하세요."
                    {...getFieldProps('comment')}
                  />
                </CommentWriteContentBox>
              </CommentWriteBox>
              <button
                type="submit"
                disabled={!isValid || !dirty || isSubmitting}
                style={{
                  borderRadius: '4px',
                  border: '1px solid #c8cae6',
                  width: 100,
                  height: 40,
                  float: 'right',
                  background: !isValid || !dirty ? 'lightgray' : '#f6fbff',
                  color: !isValid || !dirty ? 'white' : '#594739',
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
