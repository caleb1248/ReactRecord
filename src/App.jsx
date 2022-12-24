import './App.css';
import Home from './home/home';
import Recorder from './recorder/recorder';
import { useState } from "react";

export default function App() {
	const [over, setOver] = useState(false);
	const [audio, setAudio] = useState(false);
	return (
		<>
			<Home going={over} onGo={() => setOver(true)} onAudioChange={newAudio => setAudio(newAudio)}></Home>
			<div className={`fixed top-0 left-0 w-screen h-screen far-${over? "left": "right"} m-0 transition-translate duration-1000 opacity-100 bg-gray-400 z-30`}></div>
			<Recorder over={over} audio={audio}/>
		</>
	)
}
