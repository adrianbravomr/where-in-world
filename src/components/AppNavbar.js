//React imports
import {  useRef, useState, useContext } from 'react';

//Global Context imports
import { Context } from '../App';

//React-bootstrap imports
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

//Components imports
import PlacesPreview from './PlacesPreview';
import TimerViewer from './TimerViewer';

function AppNavbar() {
  
  //Local states definition
  const [showPlacesPreview,setShowPlacesPreview] = useState(false);

  //Local refs definitions
  const buttonRect = useRef();
  const placesButton = useRef();

  //Context object with global states
  const context = useContext(Context);

  //Global context states
  const places = context.places;

  return (
    <Navbar variant="dark" bg="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#" className='fw-bold w-25'>Where In: World</Navbar.Brand>
        <Navbar.Text className='w-25 text-center'>
          <TimerViewer className={'fw-bold'}/>
        </Navbar.Text>
        <div className='w-25 d-flex justify-content-end'>
          <Button ref={placesButton} className="nav-places-count px-2" onClick={() => {
            buttonRect.current = placesButton.current.getBoundingClientRect();
            buttonRect.current = buttonRect.current.top;
            setShowPlacesPreview(!showPlacesPreview);
          }}>
            {places.length} Left
          </Button>
        </div>
      </Container>
      <div onPointerLeave={() => {setShowPlacesPreview(false)}} style={{position:'fixed',zIndex:'20',top:`${buttonRect.current}px`,right:'12px'}}>
        {
          showPlacesPreview 
          ? <PlacesPreview 
              style={{position:'fixed',zIndex:'20',top:`${buttonRect.current}px`,right:'12px'}}
            />
          : ''
        }
      </div>
    </Navbar>
  );
}

export default AppNavbar;