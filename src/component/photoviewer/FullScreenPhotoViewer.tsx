import React, { useEffect, useRef, useState } from 'react';
import './FullScreenPhotoViewer.css';

interface IFullScreenPhotoViewer {
	src: string;
}

const ZOOM_OUT = 0.8;
const ZOOM_IN = 1.2;
const FullScreenPhotoViewer: React.FC<IFullScreenPhotoViewer> = (props) => {
	const { src } = props;
	const imageContainerRef: React.MutableRefObject<HTMLDivElement | null> =
		useRef(null);
	const [imageZoomLevel, setImageZoomLevel] = useState(1);
	const [mouseScrollCount, setMouseScrollCount] = useState(0);
	const handleKeyPress = (e: KeyboardEvent) => {
		if (e.key === ' ') {
			imageContainerRef.current?.classList.toggle('solid-bg');
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', handleKeyPress);
	}, []);

	const handleZoom = (e: React.WheelEvent<HTMLDivElement>) => {
		const { deltaY } = e;
		const isZoomOut = deltaY > 0 && imageZoomLevel > 0.2;
		const isZoomIn = deltaY < 0 && imageZoomLevel < 100;
		if (isZoomOut) {
			setImageZoomLevel(imageZoomLevel * ZOOM_OUT);
		}
		if (isZoomIn) {
			setImageZoomLevel(imageZoomLevel * ZOOM_IN);
		}
	};

	const imageStyle: React.CSSProperties = {
		transform: `scale(${imageZoomLevel})`,
	};
	return (
		<div onWheel={handleZoom} ref={imageContainerRef} className="pv-fullscreen">
			<img style={imageStyle} className="pv-fullscreen-image" src={src} />
		</div>
	);
};

export default FullScreenPhotoViewer;
