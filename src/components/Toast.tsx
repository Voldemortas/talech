import * as React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

interface IToast {
  message: string
}

const Toast = ({ message }: IToast) => {
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }
  const [open, setOpen] = React.useState(true)

  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
      <MuiAlert
        elevation={6}
        variant='filled'
        onClose={handleClose}
        severity='success'
      >
        {message}
      </MuiAlert>
    </Snackbar>
  )
}
export default Toast
