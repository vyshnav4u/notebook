import React, { useState } from 'react';
import FullScreenPhotoViewer from './FullScreenPhotoViewer';

interface IPhotoViewer {
	src: string;
	height?: number;
	width?: number;
}

const PhotoViewer: React.FC<IPhotoViewer> = (props) => {
	const { src, height, width } = props;
	const [showInFullScreen, setShowInFullScreen] = useState(false);
	const viewImageInFullScreen = () => {
		setShowInFullScreen(!showInFullScreen);
	};

	if (showInFullScreen) {
		return <FullScreenPhotoViewer setShowInFullScreen={setShowInFullScreen} src={src} />;
	}
	return (
		<div role="button" onClick={viewImageInFullScreen}>
			<img className='photo-viewer-image' src={src} height={height} width={width} />
		</div>
	);
};

export default PhotoViewer;
