//React imports
import { useState } from "react"


//Components imports
import Tack from "./Tack";

const PuzzleImage = ({
    handleLoad,
    image,
    discovered,
    setSelectionCoords,
    selectionPx,
    showSelector,
    setShowSelector,
    setMousePosition,
  }) => {

  //Local states
  const [loaded,setLoaded] = useState(false);
  

  //Callback when pointer enters into place selector popup (click on any site of the map)
  const handlePointerEnter = (e) => {
    if(showSelector) {
      setShowSelector(false);
    }
  }

  //Callback to get pointer coordinates, to be attached to onClick event listener of background container
  const getMousePos = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    return ({x,y})
  }

  //Callback to be executed on a click event inside background image
  const handleClick = (e) => {

    const w = e.target.width;
    const h = e.target.height;

    const pos = getMousePos(e);
    setMousePosition(pos);
    const posX = pos.x - e.target.getBoundingClientRect().x;
    const posY = pos.y - e.target.getBoundingClientRect().y;
    selectionPx.current = {x: posX, y: posY};
    
    const x = parseFloat(((posX / w) * 100).toFixed(1));
    const y = parseFloat(((posY / h) * 100).toFixed(1));
    setSelectionCoords({x,y});
    
    if(!showSelector) setShowSelector(true);
  }

  const showImage = () => {
    if(image){
      setLoaded(true);
      handleLoad();
    }
  }

  return (
    <div 
      className = 'app-content d-flex flex-column'
      onClick = {e => handleClick(e)}
      onPointerEnter = {e => handlePointerEnter(e)}
    >
      <div>
        <img
          className = {`puzzle-image ${loaded ? 'fade-in' : ''}`}
          src = {image}
          alt = {'Background'}
          onLoad={() => showImage()}
        />
      </div>
        {discovered.map((discoveredPlace,index) => {
          return <Tack key={`tack-${index}`} place={discoveredPlace} />
        })}
    </div>
  )
}

export default PuzzleImage