//React imports
import { useState, useContext } from "react"

//Global context imports
import { Context } from "../App";

//React-bootstrap imports
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function FinishPopup({show,handleNewScore}){

  //Local states definition
  const [alias,setAlias] = useState('');

  //Context object with global states
  const context = useContext(Context);

  //Global context states
  const runningTime = context.runningTime;

  return (
    show
    ? <Modal
      show = {show}
      size = "sm"
      aria-labelledby = "contained-modal-title-vcenter"
      centered
      backdrop = "static"
      keyboard = {false}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Congratulations!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center" >
        {`You have found all places in:`}<br/>
        <span className="fw-bold">{`${runningTime} Seconds`}</span>
        <br/>
        <br/>
        <form>
          <label htmlFor="alias"></label>
          <input id="alias" name="alias" onChange={(e) => {setAlias(e.target.value)}} placeholder="Type your alias"></input>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button disabled={alias !== '' ? false : true} onClick={() => handleNewScore(alias)} variant={'success'} className="fw-bold mx-auto">Show Scoreboard</Button>
      </Modal.Footer>
    </Modal>
    : ''
  )
}

export default FinishPopup