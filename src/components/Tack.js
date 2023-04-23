
const Tack = ({place}) => {

  const tackPosition = {
    top: `${place.y - 55}px`,
    left: `${place.x - 25}px`
  }
  

  return (
    <div className="discovered-tack" style={tackPosition}>
        📍
    </div>
  )
}

export default Tack