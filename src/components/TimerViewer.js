import { useContext } from 'react';

import { Context } from '../App';

//expects time state as seconds at props
const TimerViewer = ({className,style}) => {

  //Context object with global states
  const context = useContext(Context);

  //Global context states
  const time = context.runningTime;

  const [hours,minutes,seconds] = getClock(time);

  return (
    <div className={className} style={{...style}} >
      {`
        ${(hours < 10 && '0') + hours}:${(minutes < 10 && '0') + minutes}:${(seconds < 10 && '0') + seconds}`
      }
    </div>
  )
}

const getClock = (time) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor(time / 60) % 60;
  const seconds = time % 60;
  return [hours,minutes,seconds];
}

export default TimerViewer