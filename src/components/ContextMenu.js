//React imports
import { useContext } from 'react';

//Global context imports
import { Context } from '../App';

//React-bootstrap imports
import ListGroup from 'react-bootstrap/ListGroup';
import Image from "react-bootstrap/image";

function ContextMenu({show,setShowSelector,position,handleSelection,selectionCoords}) {

  //Context object with global states
  const context = useContext(Context);

  //Context global states
  const places = context.places;

  const menuStyle = {
    top: position.y ? (position.y - 30)+ "px" : '0px',
    left: position.x ? (position.x - 40) + "px" : '0px',
  }

  return (
    show 
    ? <div className={`context-menu ${!show && 'd-none'}`}
    style={menuStyle}>
      <ListGroup className='shadow'>
        <ListGroup.Item variant="info" className='text-center lh-sm p-1 bg-light fs-small'>{`X:${selectionCoords.x}%, Y:${selectionCoords.y}%`}</ListGroup.Item>
        {places.map((place,index) => {
          return (
              <ListGroup.Item 
                action onClick = {() => {
                  setShowSelector(false);
                  handleSelection(place);
                }}
                key={`p-${index}`} 
                className={`d-flex gap-2 align-items-center`}
              >
                <div>
                  <Image className='place-thumbnail' rounded src={place.image}/>
                </div>
                <div className="d-flex">{place.label}</div>
            </ListGroup.Item>
            )
        })}
      </ListGroup>
    </div>
    : ''
  );
}

export default ContextMenu;