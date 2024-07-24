// import React, { useState } from 'react'
// import { Paper, Dialog, DialogContent, IconButton } from '@mui/material'
// import CloseIcon from '@mui/icons-material/Close'

// interface ImageViewerProps {
//   imageUrl: string
// }

// const ImageViewer: React.FC<ImageViewerProps> = ({ imageUrl }) => {
//   const [isDialogOpen, setIsDialogOpen] = useState(false)

//   const handleImageClick = () => setIsDialogOpen(true)
//   const handleDialogClose = () => setIsDialogOpen(false)

//   return (
//     <Paper elevation={3} sx={{ padding: '4px', textAlign: 'center' }}>
//       {imageUrl && (
//         <>
//           <img
//             src={imageUrl}
//             alt='Record'
//             style={{ maxWidth: '100%', cursor: 'pointer' }}
//             onClick={handleImageClick}
//           />
//           <Dialog open={isDialogOpen} onClose={handleDialogClose} maxWidth='lg'>
//             <DialogContent sx={{ position: 'relative' }}>
//               <IconButton
//                 sx={{ position: 'absolute', top: 10, right: 10 }}
//                 onClick={handleDialogClose}
//               >
//                 <CloseIcon />
//               </IconButton>
//               <img
//                 src={imageUrl}
//                 alt='Enlarged Record'
//                 style={{ width: '100%' }}
//               />
//             </DialogContent>
//           </Dialog>
//         </>
//       )}
//     </Paper>
//   )
// }

// export default ImageViewer

import React, { useState } from 'react'
import { Paper, Dialog, DialogContent, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import ZoomOutIcon from '@mui/icons-material/ZoomOut'
import RotateRightIcon from '@mui/icons-material/RotateRight'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

interface ImageViewerProps {
  imageUrl: string
}

const ImageViewer: React.FC<ImageViewerProps> = ({ imageUrl }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [rotation, setRotation] = useState(0)

  const handleImageClick = () => setIsDialogOpen(true)
  const handleDialogClose = () => {
    setIsDialogOpen(false)
    setRotation(0) // Reset rotation when closing dialog
  }

  const handleRotate = () => {
    setRotation((prevRotation) => (prevRotation + 90) % 360)
  }

  return (
    <Paper elevation={3} sx={{ padding: '4px', textAlign: 'center' }}>
      {imageUrl && (
        <>
          <img
            src={imageUrl}
            alt='Record'
            style={{ maxWidth: '100%', cursor: 'pointer' }}
            onClick={handleImageClick}
          />
          <Dialog
            open={isDialogOpen}
            onClose={handleDialogClose}
            maxWidth='lg'
            fullWidth
          >
            <DialogContent sx={{ position: 'relative', height: '80vh' }}>
              <IconButton
                sx={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}
                onClick={handleDialogClose}
              >
                <CloseIcon />
              </IconButton>
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
                        alt='Enlarged Record'
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          transform: `rotate(${rotation}deg)`,
                          transition: 'transform 0.3s ease-in-out',
                        }}
                      />
                    </TransformComponent>

                    <div
                      style={{
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        zIndex: 1,
                      }}
                    >
                      <IconButton onClick={() => zoomIn()}>
                        <ZoomInIcon />
                      </IconButton>
                      <IconButton onClick={() => zoomOut()}>
                        <ZoomOutIcon />
                      </IconButton>
                      <IconButton onClick={() => resetTransform()}>
                        Reset
                      </IconButton>
                      <IconButton onClick={handleRotate}>
                        <RotateRightIcon />
                      </IconButton>
                    </div>
                  </>
                )}
              </TransformWrapper>
            </DialogContent>
          </Dialog>
        </>
      )}
    </Paper>
  )
}

export default ImageViewer
