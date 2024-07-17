import { z } from 'zod'
import { createCommentSchema } from './schema'
import formidable from 'formidable'

export default function uploadImage(request: FormData) {
  const form = new formidable.IncomingForm()

  // form.parse( )
  // s3
}
