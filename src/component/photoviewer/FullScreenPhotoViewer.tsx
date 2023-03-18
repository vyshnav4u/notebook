import React, { useEffect, useRef, useState } from 'react';
import './FullScreenPhotoViewer.css';

interface IFullScreenPhotoViewer {
	src: string;
	setShowInFullScreen: (arg1: boolean) => void;
}

interface IMousePosition {
	x: number;
	y: number;
}

const ZOOM_OUT = 0.8;
const ZOOM_IN = 1.2;

const FullScreenPhotoViewer: React.FC<IFullScreenPhotoViewer> = (props) => {
	const { src, setShowInFullScreen } = props;
	const imageContainerRef: React.MutableRefObject<HTMLDivElement | null> =
		useRef(null);
	const imageRef: React.MutableRefObject<HTMLImageElement | null> =
		useRef(null);
	const [imageZoomLevel, setImageZoomLevel] = useState(1);
	const [isImagePressed, setIsImagePressed] = useState(false);
	const [imagePosition, setImagePosition] = useState<IMousePosition>();
	const closeFullScreen = () => {
		setShowInFullScreen(false);
	};
	const handleKeyPress = (e: KeyboardEvent) => {
		if (e.key === ' ') {
			imageContainerRef.current?.classList.toggle('solid-bg');
		}

		if (e.key === 'Escape') {
			closeFullScreen();
		}
	};

	useEffect(() => {
		if (imageRef.current) {
			const { x, y } = imageRef.current.getBoundingClientRect();
			setImagePosition({ x, y });
		}
	}, []);

	useEffect(() => {
		window.addEventListener('keydown', handleKeyPress);
		document.addEventListener('mouseleave', () => {
			setIsImagePressed(false);
		});
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

	const handleImageDrag = (e: React.MouseEvent<HTMLDivElement>) => {
		setIsImagePressed(true);
	};

	const handleImageDragEnd = (e: React.MouseEvent<HTMLDivElement>) => {
		setIsImagePressed(false);
	};

	const updateMousePosition = (
		e: React.MouseEvent<HTMLImageElement, MouseEvent>
	) => {
		if (imageRef.current && isImagePressed) {
			const { movementX, movementY } = e;
			const positionInfo = imageRef.current.getBoundingClientRect();
			const newImagePositionX = movementX + positionInfo.x;
			const newImagePositionY = movementY + positionInfo.y;
			const halfElementWidth = positionInfo.width / 2;
			console.log('newImagePositionX', newImagePositionX, newImagePositionY);
			if (newImagePositionX + halfElementWidth > 0) {
				setImagePosition({ x: newImagePositionX, y: newImagePositionY });
			}
		}
	};

	const imageStyle: React.CSSProperties = {
		transform: `scale(${imageZoomLevel})`,
	};
	if (imagePosition) {
		imageStyle.top = `${imagePosition.y}px`;
		imageStyle.left = `${imagePosition.x}px`;
	}

	return (
		<div
			onMouseMove={updateMousePosition}
			onMouseUp={handleImageDragEnd}
			onWheel={handleZoom}
			ref={imageContainerRef}
			className="pv-fullscreen"
		>
			<button onClick={closeFullScreen} className="pv-fullscreen-close">
				<span className="pv-fullscreen-close-icon"> x </span>
			</button>
			<img
				draggable="false"
				ref={imageRef}
				onMouseDown={handleImageDrag}
				onMouseUp={handleImageDragEnd}
				style={imageStyle}
				className="pv-fullscreen-image"
				src={src}
			/>
		</div>
	);
};

export default FullScreenPhotoViewer;
