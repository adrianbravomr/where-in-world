import { useContext } from 'react';

import { Context } from '../App';

import Image from "react-bootstrap/image";
import ListGroup from "react-bootstrap/listGroup";


const PlacesPreview = ({className}) => {

  //Context object with global states
  const context = useContext(Context);

  //Context global states
  const places = context.places;

  return (
    <ListGroup className={className}>
      {
        Array.isArray(places) ? places.map((place,index) => (
          <ListGroup.Item 
            key={`p-${index}`} 
            className={`d-flex align-items-center  gap-2`}
          >
            <div>
              <Image className="place-thumbnail" rounded src={place.image}/>
            </div>
            <div className=" d-flex">{place.label}</div>
          </ListGroup.Item>
        )) 
        : ''
      }
    </ListGroup>
  )
}

export default PlacesPreview