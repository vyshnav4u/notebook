import React, { useEffect, useRef } from 'react';
import './FullScreenPhotoViewer.css';

interface IFullScreenPhotoViewer {
	src: string;
}

const FullScreenPhotoViewer: React.FC<IFullScreenPhotoViewer> = (props) => {
    const {src} = props;
    const imageContainerRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
	const handleKeyPress = (e: KeyboardEvent) => {
		if (e.key === ' ') {
			console.log('space Button Pressed');
            imageContainerRef.current?.classList.toggle('solid-bg');
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', handleKeyPress);
	}, []);
	return (
		<div ref={imageContainerRef} className="pv-fullscreen">
			<img className="pv-fullscreen-image" src={src} />
		</div>
	);
};

export default FullScreenPhotoViewer;
