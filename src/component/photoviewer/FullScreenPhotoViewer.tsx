import React, { useEffect, useRef, useState } from 'react';
import './FullScreenPhotoViewer.css';
import ZoomMeta from './ZoomMeta';

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
let timeoutShowZoomInfo: ReturnType<typeof setTimeout> | null;


//todo: move draggable as separate component
const FullScreenPhotoViewer: React.FC<IFullScreenPhotoViewer> = (props) => {
	const { src, setShowInFullScreen } = props;
	const imageContainerRef: React.MutableRefObject<HTMLDivElement | null> =
		useRef(null);
	const imageRef: React.MutableRefObject<HTMLImageElement | null> =
		useRef(null);
	const [showZoomInfo, setShowZoomInfo] = useState(false);
	const [imageZoomLevel, setImageZoomLevel] = useState(1);
	const [isImagePressed, setIsImagePressed] = useState(false);
	const [imagePosition, setImagePosition] = useState<IMousePosition>();
	const closeFullScreen = () => {
		setShowInFullScreen(false);
	};
	const handleKeyPress = (e: KeyboardEvent) => {
		console.log('e.key', e.key);

		if (e.key === ' ') {
			imageContainerRef.current?.classList.toggle('solid-bg');
		}

		if (e.key === 'Escape') {
			closeFullScreen();
		}

		switch (e.key) {
			case '':
				imageContainerRef.current?.classList.toggle('solid-bg');
				break;
			case 'Escape':
				closeFullScreen();
				break;
			case 'ArrowUp':
				setImageZoomLevel((prevImageZoomLevel) => {
					const newZoomLevel = prevImageZoomLevel * ZOOM_IN;
					if (newZoomLevel < 100) {
						return newZoomLevel;
					}
					return prevImageZoomLevel;
				});
				break;
			case 'ArrowDown':
				setImageZoomLevel((prevImageZoomLevel) => {
					const newZoomLevel = prevImageZoomLevel * ZOOM_OUT;
					if (newZoomLevel > 0.2) {
						return newZoomLevel;
					}
					return prevImageZoomLevel;
				});
				break;
			default:
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

	useEffect(() => {
		if(imageZoomLevel === 1) return;
		if (timeoutShowZoomInfo) {
			clearTimeout(timeoutShowZoomInfo);
		}
		setShowZoomInfo(true);
		timeoutShowZoomInfo = setTimeout(() => {
			setShowZoomInfo(false);
		}, 2500);
	}, [imageZoomLevel]);

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
		if (imagePosition && isImagePressed) {
			const { movementX, movementY } = e;
			const newImagePositionX = movementX + imagePosition.x;
			const newImagePositionY = movementY + imagePosition.y;
			setImagePosition({ x: newImagePositionX, y: newImagePositionY });
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
			{showZoomInfo && <ZoomMeta imageZoomLevel={imageZoomLevel} />}
		</div>
	);
};

export default FullScreenPhotoViewer;
