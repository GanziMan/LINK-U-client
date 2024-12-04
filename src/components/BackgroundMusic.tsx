import { Box, styled } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'

const BackgroundMusic: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.play().then(() => {
        setIsPlaying(true)
      })
    }
  }, [])

  const handlePlayMusic = () => {
    const audio = audioRef.current
    if (audio) {
      audio
        .play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch((error) => {
          console.error('Audio playback failed:', error)
        })
    }
  }

  return (
    <PlayButton>
      {!isPlaying ? (
        <button onClick={handlePlayMusic}>배경음악을 눌러주세요.</button>
      ) : (
        <>Love</>
      )}
      <audio ref={audioRef} loop>
        <source src="/music/wedding-bgm.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </PlayButton>
  )
}

const PlayButton = styled(Box)(() => {
  return {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'rgb(70, 65, 61)',
    fontSize: '14px',
    lineHeight: '22px',
    width: 230,
    background: '#F6FBFF',
    height: 46,
    borderRadius: '100px',
    fontWeight: 600,
  }
})

export default BackgroundMusic
