//React-bootstrap imports
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

//Components imports
import PlacesPreview from "./PlacesPreview";


function StartPopup({show,handleStart}){

  return (
    show 
    ? <Modal
      show = {show}
      size = "md"
      aria-labelledby = "contained-modal-title-vcenter"
      centered
      backdrop = "static"
      keyboard = {false}
      >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Welcome!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Find 3 randomly selected monuments representatives from each city as fast as possible.
        <br/>
        <br/>
        <h5>Monuments to find:</h5>
        <PlacesPreview/>
        <br/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick = {handleStart} className="fw-bold mx-auto">START PLAYING</Button>
      </Modal.Footer>
    </Modal>
    : ''
  )
}

export default StartPopup