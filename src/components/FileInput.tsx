/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled'
import React, { useState, ChangeEvent } from 'react'

const InputLabel = styled.label`
  background-color: #6200ea;
  color: white;
  padding: 10px 20px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  text-align: center;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #3700b3;
  }
`

const HiddenInput = styled.input`
  display: none;
`

const FileNameWrapper = styled.div`
  margin-top: 10px;
  border: 1px solid gray;
  height: 50px;
  width: 200px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`

const FileName = styled.span`
  font-size: 14px;
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  height: 50;
`

interface FileInputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const FileInput: React.FC<FileInputProps> = ({ onChange }) => {
  const [preview, setPreview] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      // 파일 형식 확인
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드할 수 있습니다.')
        return
      }

      // 파일 크기 확인 (예: 5MB 이하)
      const maxSizeInBytes = 5 * 1024 * 1024
      if (file.size > maxSizeInBytes) {
        alert('파일 크기가 너무 큽니다. 5MB 이하의 파일을 업로드해주세요.')
        return
      }

      // 파일 이름 저장
      setFileName(file.name)

      // 파일 읽기 및 미리보기 업데이트
      const reader = new FileReader()
      reader.onload = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }

    // 부모 컴포넌트로 이벤트 전달
    onChange(event)
  }
  return (
    <>
      <HiddenInput type="file" id="file-input" onChange={handleFileChange} />
      <div
        style={{
          display: 'flex',
          width: 600,
        }}
      >
        <FileNameWrapper>
          {fileName && <FileName>{fileName}</FileName>}
        </FileNameWrapper>
        <InputLabel htmlFor="file-input">선택</InputLabel>
      </div>
    </>
  )
}

export default FileInput
