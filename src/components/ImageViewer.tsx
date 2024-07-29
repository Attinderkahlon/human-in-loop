import React, { useState } from 'react'
import { Paper, IconButton, Box } from '@mui/material'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import ZoomOutIcon from '@mui/icons-material/ZoomOut'
import RotateRightIcon from '@mui/icons-material/RotateRight'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

interface ImageViewerProps {
  imageUrl: string
}

const ImageViewer: React.FC<ImageViewerProps> = ({ imageUrl }) => {
  const [rotation, setRotation] = useState(0)

  const handleRotate = () => {
    setRotation((prevRotation) => (prevRotation + 90) % 360)
  }

  return (
    <Paper
      elevation={3}
      sx={{ padding: '16px', textAlign: 'center', position: 'relative' }}
    >
      {imageUrl && (
        <TransformWrapper
          initialScale={1}
          initialPositionX={0}
          initialPositionY={0}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              <TransformComponent>
                <img
                  src={imageUrl}
                  alt='Record'
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    cursor: 'pointer',
                    transform: `rotate(${rotation}deg)`,
                    transition: 'transform 0.3s ease-in-out',
                  }}
                />
              </TransformComponent>
              <Box
                sx={{
                  marginTop: '10px',
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 2,
                }}
              >
                <IconButton onClick={() => zoomIn()}>
                  <ZoomInIcon />
                </IconButton>
                <IconButton onClick={() => zoomOut()}>
                  <ZoomOutIcon />
                </IconButton>
                <IconButton onClick={() => resetTransform()}>Reset</IconButton>
                <IconButton onClick={handleRotate}>
                  <RotateRightIcon />
                </IconButton>
              </Box>
            </>
          )}
        </TransformWrapper>
      )}
    </Paper>
  )
}

export default ImageViewer
