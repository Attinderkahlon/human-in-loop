import React, { useState } from 'react'
import { Paper, Dialog, DialogContent, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

interface ImageViewerProps {
  imageUrl: string
}

const ImageViewer: React.FC<ImageViewerProps> = ({ imageUrl }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleImageClick = () => setIsDialogOpen(true)
  const handleDialogClose = () => setIsDialogOpen(false)

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
          <Dialog open={isDialogOpen} onClose={handleDialogClose} maxWidth='lg'>
            <DialogContent sx={{ position: 'relative' }}>
              <IconButton
                sx={{ position: 'absolute', top: 10, right: 10 }}
                onClick={handleDialogClose}
              >
                <CloseIcon />
              </IconButton>
              <img
                src={imageUrl}
                alt='Enlarged Record'
                style={{ width: '100%' }}
              />
            </DialogContent>
          </Dialog>
        </>
      )}
    </Paper>
  )
}

export default ImageViewer
