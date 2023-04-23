//React imports
import { useContext } from 'react';

//Global context import
import { Context } from '../App';

//React-bootstrap imports
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

function ScoreboardPopup({show,handleRestart}){

  //Context object with global states
  const context = useContext(Context);

  //Global Context states
  const scoreboard = context.scoreboard;

  return (
      show
      ? <Modal
        show = {show}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard={false}
      >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Scoreboard (Top 10)
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <Table responsive striped bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Alias</th>
                <th>Time (s)</th>
              </tr>
            </thead>
            <tbody>
            {
              scoreboard.map((entry,index) =>
                (
                  <tr key={`score-${index+1}`}>
                    <td>{index+1}</td>
                    <td>{entry.alias}</td>
                    <td>{entry.score}</td>
                  </tr>
                )
              )
            }
            </tbody>
          </Table>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleRestart} className="fw-bold mx-auto">PLAY AGAIN</Button>
      </Modal.Footer>
    </Modal>
    : ''
  )
}

export default ScoreboardPopup