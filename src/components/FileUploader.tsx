import React, { useState, useEffect, ChangeEvent } from 'react'
import styled from 'styled-components'
import UploadIcon from '@mui/icons-material/Upload'
import AirplayIcon from '@mui/icons-material/Airplay'
import DeleteIcon from '@mui/icons-material/Delete'

interface FileUploaderProps {
  id?: string
  name?: string
  multiple?: boolean
  preview?: boolean
  deleteFile?: boolean
  placeholder?: string
  loading?: boolean
  acceptType?: string
  files?: File[] | FileList
  required?: boolean
  onPreview: () => void
  onDelete: () => void
  onUpdateFiles: (files: FileList | null) => void
}

interface Message {
  placeholder: boolean
  text: string
}

const FileUploader: React.FC<FileUploaderProps> = ({
  id,
  name,
  multiple,
  preview = true,
  deleteFile = true,
  placeholder = 'Please select file.',
  loading = false,
  acceptType = 'image/*',
  files,
  required = false,
  onPreview,
  onDelete,
  onUpdateFiles,
}) => {
  const [message, setMessage] = useState<Message>({
    placeholder: true,
    text: placeholder,
  })

  useEffect(() => {
    if (loading) {
      setMessage({
        placeholder: true,
        text: 'Uploading..',
      })
    } else if (Array.isArray(files) && files.filter(Boolean).length > 0) {
      setMessage({
        placeholder: false,
        text:
          files.length > 1
            ? `${files.length} files have been selected.`
            : files[0].name,
      })
    } else if (files instanceof FileList && files.length > 0) {
      setMessage({
        placeholder: false,
        text:
          files.length > 1
            ? `${files.length} files have been selected.`
            : files[0].name,
      })
    } else {
      setMessage({
        placeholder: true,
        text: placeholder,
      })
    }
  }, [loading, files, placeholder])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onUpdateFiles(event.target.files)
  }

  return (
    <FormUploader
      className={`form-uploader ${loading ? 'form-uploader--loading' : ''}`}
    >
      <StyledLabel title="upload file">
        <StyledEm className={message.placeholder ? 'placeholder' : ''}>
          {message.text}
        </StyledEm>
        <StyledSpan>
          <UploadIcon color="primary" />
        </StyledSpan>
        {!loading && (
          <StyledInput
            type="file"
            id={id}
            name={name}
            multiple={multiple}
            accept={acceptType}
            required={required}
            onChange={handleChange}
          />
        )}
      </StyledLabel>
      <StyledNav>
        {preview && (
          <StyledButton
            type="button"
            title="preview file"
            className="preview"
            onClick={onPreview}
          >
            <AirplayIcon color="warning" />
          </StyledButton>
        )}
        {deleteFile && (
          <StyledButton
            type="button"
            title="delete file"
            className="remove"
            onClick={onDelete}
          >
            <DeleteIcon color="error" />
          </StyledButton>
        )}
      </StyledNav>
    </FormUploader>
  )
}

const FormUploader = styled.div(() => {
  return {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    height: 'var(--size-form-height)',
    boxShadow: 'inset 0 2px 6px 0 rgba(0, 0, 0, 0.2)',
    borderRadius: 'var(--size-radius)',
    width: '200px',

    '&.form-uploader--loading': {
      background: 'var(--color-shape-low)',
      label: {
        cursor: 'not-allowed',
      },
    },
  }
})

const StyledLabel = styled.label(() => {
  return {
    minWidth: 0,
    display: 'flex',
    position: 'relative',
    flex: 1,
    borderRadius: 'var(--size-radius)',
  }
})

const StyledEm = styled.em(() => {
  return {
    minWidth: 0,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    padding: '0 16px',
    lineHeight: 1.25,
    '&.placeholder': {
      opacity: 0.5,
    },
    color: '#00b0ff',
  }
})

const StyledSpan = styled.span(() => {
  return {
    position: 'absolute',
    right: 0,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--color-main)',
  }
})

const StyledInput = styled.input(() => {
  return {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: 2,
    opacity: 0,
    display: 'none',
  }
})

const StyledNav = styled.nav(() => {
  return {
    display: 'flex',
  }
})

const StyledButton = styled.button(() => {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'var(--size-form-height)',
    height: 'var(--size-form-height)',
    background: 'var(--color-shape-low)',
    borderLeft: '1px solid var(--color-shape)',
    '&.remove': {
      color: 'var(--color-danger)',
    },
  }
})

const Icon = ({ iconName }: { iconName: string }) => {
  // 여기에 아이콘 렌더링 코드를 추가합니다.
  return <i className={`icon-${iconName}`}></i>
}

export default FileUploader
