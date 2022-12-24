import { useState, useEffect } from "react";

export default function Home({onGo, going, onAudioChange}) {
	const[audio, setAudio] = useState(false);
	const[hover, setHover] = useState(false);
	const[hidden, setHidden] = useState(false);

	useEffect(() => onAudioChange(audio), [audio]);
	return (
		<div
			className={`p-8 select-none far-${going? "left": "none"} z-10 transition-translate duration-1000 ${hidden? "hidden": ""}`}
			onTransitionEnd={() => {going? setHidden(true): void 0}}
		>
			<h1 className="text-7xl font-medium">ReactRecord</h1>
			<p className="mt-2 text-xl w-full">A react-based recorder</p>
			<div className="flex items-center">
				<div
					onMouseEnter={()=>{
	        	setHover(true);
		      }}
		      onMouseLeave={()=>{
		        setHover(false);
		      }}
					className="m-4 mr-8 bg-gray-400 p-1 hover:p-2 fit inline-block w-40 rounded-lg aspect-[16/11] transition-all relative cursor-pointer"
					onClick={() => setAudio(!audio)}
				>
					<div className="bg-white rounded-lg w-full h-full p-1">
						<div className="bg-themeColor rounded-lg absolute right-4 top-4">
							<svg width="30" height="30" className="bg-themeColor rounded-lg absolute top-0 right-0">
								<path d="M6 15 L11 21 L24 8" strokeWidth="2" stroke="black" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
							</svg>
							<svg width="30" height="30" className={`bg-${hover? "gray-400": "white"} rounded-lg absolute top-0 right-0 scale-${audio? "0": "125"} transition-all border-solid border-2 border-gray-400`}></svg>
						</div>
						<img className="w-10 h-10 absolute top-6 left-5" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAAAaVBMVEX///8AAADz8/ONjY2VlZXW1tYZGRkUFBSRkZHQ0NBZWVm+vr7r6+vBwcE5OTmJiYnHx8dtbW0eHh5KSkp9fX00NDSysrLk5OQnJyfc3NxFRUV3d3dTU1MvLy9AQECnp6efn58LCwtkZGSmrg12AAAC8klEQVRoge2Z2barIAyGnetUp1q12qq77/+QpwzaSGUQvTlr+d9B4NsUEkzYhqGoOLLDxjSb0K5i1TmKuoYm0PN6IDpITEb34Ch2yqKR0mPY7cRLutTu7lPrdgDaolsSRhbtiOj+J9Zu+G1lj4PXMWsvMaZku7v17m0KMMT5NdjYsM9n7twF4rUne9iRgID/7p5owqfprttcZGv12TH2QZ71iaz690yFpmc8a4aslTY8R9P5ZmTNteE30a4YRrgrkF7iQEHe+NJlW95nts+3+x+zp3vBYLjNtzsf8+WEn/ATfsJP+Ak/4f87vOrLafwmuFX20tTuClK0TfBQlFZSpSA93AQ3xWOxfAhvxOkcWkgB4YLsbF7NnNgm4jQ2h2UHp3ZaCKfkcB/v/LEJSIJjlWQdV0EP2vCFtUMMdyJTqZBquIJA+FsdWCwOqFFL4MaiNkSNP97IP3g8b3ERQvWE+5wKlo4XPr9dNOIiBM6ZNh1v69xaCFeK84G4Ks7CDiNPLSv3h2UuFo7HcQpWKFQINXOrQLOan5OqcX8xt1FLpTyyF05FXhZYJ4tI77zUSiU+kfA+f0OnIpwQ/Gb3SfqiuacQBgRUuAy2gZDMdgxiw6ozp6cdzJC3Ctt4MIdI94DV934lPiWNICJclYMLK779om9gE/AudWps6mYD6LkyD4sJ/CyMPHddFznE5ZtZ2UzkplxYrswBSPVe28U4G8ZxyBinIJGqdppUzdKP+SJx0MgHAtWsR3BEo0DRUyaRXyv75JJXR5VfuBSN+1awKJe+62q8Lj4uZGrHCes6J3Zv9UaWaXoiNruV6W4+ubxusmhPrl04LmBYge9NFlkeJFAwv5ab5jNPx2oY0xxcBv3mo1yourC3ylee/qPijO/X0e1+NNIj9Vhy4W+MG5HqKA1b8t3sQzs6kDwp0IwYJblaoX7CT/gJP+Fi4fRX63PM4flfOfgfiZ0Dunb9JZf/jSPaQ3dkcHl1yFclg+/6jvpitqSA+wfQOx1GkUV2+QAAAABJRU5ErkJggg==" />
						<p className="absolute bottom-1/20 left-4">Record Audio</p>
					</div>
				</div>
				<button className="py-5 px-20 bg-themeColor rounded-xl" onClick={() => onGo(audio)}>Go</button>
			</div>
		</div>
	)
}