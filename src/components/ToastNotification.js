//React-bootstrap imports
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const ToastNotification = ({showToast,found,clearSelection}) => {
  return (
    showToast 
    ? <ToastContainer className='toast-message' position="top-center">
      <Toast 
        onClose={() => clearSelection()} 
        show={showToast} 
        delay={2000} 
        bg={found ? 'success' : 'danger'}
        animation = {false}
        autohide
      >
        <Toast.Body className='text-center text-white fw-bold'>
          {
            found 
            ? `You found ${found.label}!` 
            : 'Keep Trying!'
          }
        </Toast.Body>
      </Toast>
  </ToastContainer>
  : ''
  )
}

export default ToastNotification