import { useRef, useState, useEffect } from "react"

class MutedVideo extends HTMLVideoElement {
	constructor() {
		super();
		this.muted = true;
	}

	unmute() {
		this.muted = false;
	}
}

customElements.define("x-muted", MutedVideo, { extends: "video" });

export default function Recorder({ over, audio }) {
	const vid = useRef(null);
	const [paused, setPaused] = useState(true);
	const [init, setInit] = useState(false);
	let userMedia = useRef(null);
	let recorder = useRef(null);
	const [hasStartedUpCamera, setStartup] = useState(false);
	const [finished, setFinished] = useState(false);
	const chunks = [];

	useEffect(function() {
		if (userMedia.current !== null && recorder.current !== null) {
			if (paused && init) recorder.current.pause();
			if ((!paused) && init) recorder.current.resume();
			if ((!paused) && (!init)) {
				recorder.current.start();
				setInit(true);
			}
		}
	}, [paused]);
	useEffect(() => {
		if (recorder.current instanceof MediaRecorder) {
			setInit(false);
			recorder.current.onstop = () => {
				vid.current.srcObject = null;
				console.log(chunks)
				vid.current.src = URL.createObjectURL(new Blob(chunks));
				vid.current.controls = true;
				vid.current.unmute(false);
				setFinished(true);
			};
			recorder.current.ondataavailable = e => chunks.push(e.data);
			window.r = recorder.current;
		}
	}, [recorder.current]);

	return (
		<>
			<div className={`fixed top-0 left-0 w-screen h-screen far-${over ? "none" : "right"} m-0 transition-all duration-1000 opacity-100 z-20 rounded-lg`} onTransitionEnd={async () => {
				if (userMedia.current == null) {
					userMedia.current = await navigator.mediaDevices.getUserMedia({ video: true, audio: audio });
					vid.current.srcObject = userMedia.current;
					if (hasStartedUpCamera === false) setStartup(true);
					recorder.current = new MediaRecorder(userMedia.current);
				}
			}}>
				<h1 className="text-7xl font-medium text-center mt-8">You're ready to start recording</h1>
				<div className={`relative rounded-lg aspect-video w-[68vmin] m-auto mt-5 0px block ${!hasStartedUpCamera ? "bg-black" : ""}`}>
					<video is="x-muted" ref={vid} autoPlay={hasStartedUpCamera} class="rounded-lg mt-12"></video>
					{
						finished? null: 
						<>
							<button className="absolute bottom-[10px] left-[10px] p-2 bg-themeColor rounded-full" onClick={async () => {
								setPaused(!paused);
								if (userMedia == null) {
									userMedia.current = await navigator.mediaDevices.getUserMedia({ video: true, audio: audio });
									vid.current.srcObject = userMedia;
									if (hasStartedUpCamera === false) setStartup(true);
								}
							}}>
								<svg viewBox="0 0 24 24" width="20" height="20" children={paused ? <path d="M8 5v14l11-7z" /> : <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />}></svg>
							</button>
							<button className="absolute bottom-[10px] right-[10px] p-2 bg-red-300 rounded-full" onClick={() => {
								if (recorder.current instanceof MediaRecorder) recorder.current.stop();
							}}>
								<svg viewBox="0 0 24 24" width="20" height="20" children={<path d="M6 6h12v12H6z" />}></svg>
							</button>
						</>
					}
				</div>
			</div>
		</>
	)
}