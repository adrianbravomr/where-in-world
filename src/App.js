//React imports
import { useEffect, useState, useRef, createContext } from 'react';

//Style imports
import './App.css';

//Firebase imports
import { firebaseConfig } from './firebase-config';
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  doc,
  serverTimestamp,
  getDocs,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  getDownloadURL
} from 'firebase/storage';

//React-bootstrap imports
import Container from 'react-bootstrap/Container';

//Higher-order component imports
import WithLoading from './components/higher-order/WithLoading';

//Component imports
import AppNavbar from './components/AppNavbar';
import PuzzleImage from './components/PuzzleImage';
import StartPopup from './components/StartPopup';
import FinishPopup from './components/FinishPopup';
import ScoreboardPopup from './components/ScoreBoardPopup';
import ToastNotification from './components/ToastNotification';
import ContextMenu from './components/ContextMenu';

//Utils imports
import shuffleArray from './utils/shuffleArray';

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
const db = getFirestore(firebaseApp);
const scoreboardRef = collection(db, "scoreboard");
const placesRef = collection(db, "places");

//Higher order components definitions and attachment
const PuzzleImageWithLoading = WithLoading(PuzzleImage);

//Global context creation
export const Context = createContext();

//App configuration
const NUMBER_OF_PLACES = 3;

//App Component
const App = () => {

  //App states definitions
  const [image,setImage] = useState('');
  const [imageLoading,setImageLoading] = useState(true);
  const [playing,setPlaying] = useState(false);
  const [finished,setFinished] = useState(false);
  const [runningTime,setRunningTime] = useState(0);
  const [scoreboard,setScoreboard] = useState([]);
  const [places,setPlaces] = useState([]);
  const [discovered,setDiscovered] = useState([]);
  const [found,setFound] = useState(false);
  const [showSelector, setShowSelector] = useState(false);
  const [mousePosition,setMousePosition] = useState({ x: null, y: null });
  const [selectionCoords,setSelectionCoords] = useState({ x: null, y: null });
  const [showToast, setShowToast] = useState(false); 
  const [showScore,setShowScore] = useState(false);

  //App refs definitions
  const timer = useRef();
  const scoreboardListener = useRef();
  const selectionPx = useRef({ x: null, y: null });

  useEffect(() => {
    loadPlaces(NUMBER_OF_PLACES);
    loadScoreboard();
    loadBackground();
  },[])

  //Set places list, save to state.
  const loadPlaces = async (count) => {

    //Get all places from firestore
    const querySnapshot = await getDocs(query(placesRef));
    const receivedData = querySnapshot.docs.map(doc => ({...doc.data()}));

    //Shuffle and get N places, (firestore doesn't have a random query)
    //Creates promise objects, replaces img with url promise
    const shuffledData = shuffleArray(receivedData)
    .slice(0,count)
    .map(async (data) => {
      //Waits for image url to be received
      data.image = await loadImage(`places/${data.image}`);
      return data;
    })
    
    //Wait for all image urls and until promises are resolved
    const resolvedData = await Promise.all(shuffledData);

    setPlaces(resolvedData);
  }

  //Returns Promise of image url
  const loadImage = (image) => {
    return getDownloadURL(ref(storage,`images/${image}.jpg`))
  }

  // Loads scoreboard and listens for updates.
  const loadScoreboard = async () => {

    const q = query(scoreboardRef,orderBy("score","asc"),limit(10));
    //const querySnapshot = await getDocs(q);

    scoreboardListener.current = onSnapshot(q, (scoreboardCollection) => {
      const receivedData = []
      scoreboardCollection.forEach(doc => {
        const data = {...doc.data(),'id':doc.id};
        receivedData.push(data);
        setScoreboard([...receivedData]);
      })
    });
  }

  //Load Main Background image
  const loadBackground = () => {
    loadImage('whereinworld_1')
    .then(url => setImage(url));
  }

  //Callback to set all required variables to start playing, called on a button press
  const handleStart = () => {
    setPlaying(true);
    setFinished(false);
    setShowScore(false);
    timer.current = (setInterval(() => {
      setRunningTime(prev => prev + 1);
    },1000))
  }

  //Callback to set all required variables to start playing, called on a button press
  const handleRestart = () => {
    loadPlaces(NUMBER_OF_PLACES);
    setShowScore(false);
    setFinished(false);
    setRunningTime(0);
  }

  //Add new score to firebase and shows scoreboard on app
  const handleNewScore = (alias) => {
    addToScoreboard(alias);
    setShowScore(true);
  }

  //Callback to finish timer count and restart variables
  const handleFinish = () => {
    clearInterval(timer.current);
    setPlaying(false);
    setFinished(true);
    setDiscovered([]);
  }


  //Callback to add user score to scoreboard document in firebase
  const addToScoreboard =  async (alias) => {
    if(alias && runningTime > 1){
      const newScore = {
        alias: alias,
        score: runningTime,
        timestamp: serverTimestamp(),
      }
      await setDoc(doc(scoreboardRef),newScore);
    }
    else{
      console.error('ERROR: Can\'t add new score')
    }
  }

  //Callback for place selection in the selector popup
  const handleSelection = (selection) => {

    //compare selection coords with selected option coords range
    const xmin = selectionCoords.x >= selection.pos.x.min;
    const xmax = selectionCoords.x <= selection.pos.x.max;
    const ymin = selectionCoords.y >= selection.pos.y.min;
    const ymax = selectionCoords.y <= selection.pos.y.max;

    const foundSelected = (
      selection.label
      && selectionCoords.x
      && selectionCoords.y
      && xmin
      && xmax
      && ymin
      && ymax
    ) ? {...selection} : false

    if(foundSelected){
      const placesIndex = places.findIndex(place => place.label === selection.label);
      const newPlaces = [...places];
      const removed = newPlaces.splice(placesIndex,1);
      setDiscovered([...discovered,{label:removed.label,x:selectionPx.current.x,y:selectionPx.current.y}]);
      setPlaces([...newPlaces])

      if (!newPlaces.length) handleFinish();
    }

    setFound(foundSelected);
    setShowToast(true);

    setSelectionCoords({ x: null, y: null });
    selectionPx.current = { x: null, y: null };
  }

  //Callback executed won timeout of toast message
  const clearSelection = () => {
    setShowToast(false);
    setFound(false);
  }

  return (
      <Container fluid className="App p-0 d-flex flex-column">
        <Context.Provider 
          value = {{
            places,
            runningTime,
            scoreboard,
            discovered,
            playing,
            finished,
          }}
        >
          <AppNavbar/>
          <StartPopup
            show = {!imageLoading && !playing && !finished}
            handleStart = {handleStart}
          />
          <FinishPopup
            show = {!imageLoading && !playing && finished}
            handleNewScore = {handleNewScore}
          />
          <ScoreboardPopup
            show = {showScore}
            handleRestart = {handleRestart}
          />
          <ToastNotification
            showToast = {showToast}
            found = {found}
            clearSelection = {clearSelection}
          />
          <ContextMenu  
            show = {showSelector} 
            setShowSelector = {setShowSelector}
            position = {mousePosition}
            handleSelection = {handleSelection}
            selectionCoords = {selectionCoords}
          />
          <PuzzleImageWithLoading
            handleLoad = {() => setImageLoading(false)}
            image = {image}
            isLoading = {imageLoading}
            discovered = {discovered}
            showSelector = {showSelector}
            setShowSelector = {setShowSelector}
            
            setMousePosition = {setMousePosition}
            setSelectionCoords = {setSelectionCoords}
            selectionPx = {selectionPx}
          />
        </Context.Provider>
      </Container>
  );
}

export default App;
